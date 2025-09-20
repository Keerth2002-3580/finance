import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Create Supabase admin client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Health check endpoint
app.get("/make-server-da0752f5/health", (c) => {
  return c.json({ status: "ok" });
});

// Create admin user endpoint (for setup purposes)
app.post("/make-server-da0752f5/create-admin", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role: 'admin'
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Admin creation error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store admin profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role: 'admin',
      created_at: new Date().toISOString(),
      total_investment: 0,
      active_investments: []
    });

    return c.json({ 
      success: true, 
      message: "Admin user created successfully",
      user: {
        id: data.user.id,
        email,
        name,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin creation error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// User signup endpoint
app.post("/make-server-da0752f5/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        role: 'user'
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role: 'user',
      created_at: new Date().toISOString(),
      total_investment: 0,
      active_investments: []
    });

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email,
        name
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user profile
app.get("/make-server-da0752f5/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || user.id !== userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userProfile = await kv.get(`user:${userId}`);
    if (!userProfile) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(userProfile);
  } catch (error) {
    console.error('Get user profile error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Create investment
app.post("/make-server-da0752f5/investments", async (c) => {
  try {
    const { amount, planType } = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    if (!amount || amount < 50000) {
      return c.json({ error: "Minimum investment is ₹50,000" }, 400);
    }

    const now = new Date();
    const investmentId = `inv_${Date.now()}_${user.id}`;
    
    // Calculate next payment date (1st of next month)
    const nextPaymentDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    
    const investment = {
      id: investmentId,
      userId: user.id,
      amount,
      planType: planType || 'standard',
      status: 'active',
      created_at: now.toISOString(),
      start_date: now.toISOString(),
      end_date: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString(), // 3 years
      current_year: 1,
      months_completed: 0,
      total_returns_paid: 0,
      next_payment_date: nextPaymentDate.toISOString(),
      monthly_returns: []
    };

    // Store investment
    await kv.set(`investment:${investmentId}`, investment);
    
    // Update user profile
    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile) {
      userProfile.total_investment += amount;
      userProfile.active_investments.push(investmentId);
      await kv.set(`user:${user.id}`, userProfile);
    }

    // Store in investments index
    const investmentIndex = await kv.get('investments:index') || [];
    investmentIndex.push(investmentId);
    await kv.set('investments:index', investmentIndex);

    return c.json({ 
      success: true, 
      investment: investment
    });
  } catch (error) {
    console.error('Create investment error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user investments
app.get("/make-server-da0752f5/investments/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || user.id !== userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userProfile = await kv.get(`user:${userId}`);
    if (!userProfile || !userProfile.active_investments) {
      return c.json([]);
    }

    const investments = [];
    for (const investmentId of userProfile.active_investments) {
      const investment = await kv.get(`investment:${investmentId}`);
      if (investment) {
        investments.push(investment);
      }
    }

    return c.json(investments);
  } catch (error) {
    console.error('Get investments error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Admin: Get all investments
app.get("/make-server-da0752f5/admin/investments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const investmentIndex = await kv.get('investments:index') || [];
    const investments = [];
    
    for (const investmentId of investmentIndex) {
      const investment = await kv.get(`investment:${investmentId}`);
      if (investment) {
        // Get user info for each investment
        const userProfile = await kv.get(`user:${investment.userId}`);
        investment.userInfo = userProfile ? {
          name: userProfile.name,
          email: userProfile.email
        } : null;
        investments.push(investment);
      }
    }

    return c.json(investments);
  } catch (error) {
    console.error('Admin get investments error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Admin: Get all users
app.get("/make-server-da0752f5/admin/users", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const userProfiles = await kv.getByPrefix('user:');
    return c.json(userProfiles);
  } catch (error) {
    console.error('Admin get users error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Admin: Process monthly payout
app.post("/make-server-da0752f5/admin/investments/:investmentId/payout", async (c) => {
  try {
    const investmentId = c.req.param('investmentId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const investment = await kv.get(`investment:${investmentId}`);
    if (!investment) {
      return c.json({ error: "Investment not found" }, 404);
    }

    if (investment.status !== 'active') {
      return c.json({ error: "Investment is not active" }, 400);
    }

    // Calculate current monthly return based on year
    const rates = { 1: 0.03, 2: 0.035, 3: 0.04 };
    const currentRate = rates[investment.current_year as keyof typeof rates] || 0.03;
    const monthlyReturn = investment.amount * currentRate;

    // Update investment
    investment.months_completed += 1;
    investment.total_returns_paid += monthlyReturn;
    
    // Update current year based on months completed
    if (investment.months_completed <= 12) {
      investment.current_year = 1;
    } else if (investment.months_completed <= 24) {
      investment.current_year = 2;
    } else {
      investment.current_year = 3;
    }

    // Calculate next payment date (1st of next month)
    const currentDate = new Date();
    const nextPaymentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    investment.next_payment_date = nextPaymentDate.toISOString();

    // Add to monthly returns history
    investment.monthly_returns.push({
      amount: monthlyReturn,
      date: new Date().toISOString(),
      month: investment.months_completed,
      year: investment.current_year,
      rate: currentRate
    });

    // Mark as completed if 36 months are done
    if (investment.months_completed >= 36) {
      investment.status = 'completed';
      investment.next_payment_date = null;
    }

    await kv.set(`investment:${investmentId}`, investment);

    return c.json({ 
      success: true, 
      investment,
      payout: {
        amount: monthlyReturn,
        month: investment.months_completed,
        year: investment.current_year
      }
    });
  } catch (error) {
    console.error('Admin payout error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Admin: Update investment status
app.put("/make-server-da0752f5/admin/investments/:investmentId", async (c) => {
  try {
    const investmentId = c.req.param('investmentId');
    const { status } = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const investment = await kv.get(`investment:${investmentId}`);
    if (!investment) {
      return c.json({ error: "Investment not found" }, 404);
    }

    if (status) {
      investment.status = status;
      await kv.set(`investment:${investmentId}`, investment);
    }

    return c.json({ success: true, investment });
  } catch (error) {
    console.error('Admin update investment error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Contact form submission
app.post("/make-server-da0752f5/contact", async (c) => {
  try {
    const { name, email, phone, message } = await c.req.json();
    
    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const contactId = `contact_${Date.now()}`;
    const contactSubmission = {
      id: contactId,
      name,
      email,
      phone: phone || '',
      message,
      created_at: new Date().toISOString(),
      status: 'new'
    };

    await kv.set(`contact:${contactId}`, contactSubmission);
    
    // Add to contact index
    const contactIndex = await kv.get('contacts:index') || [];
    contactIndex.push(contactId);
    await kv.set('contacts:index', contactIndex);

    return c.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error('Contact form error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Admin: Get contact submissions
app.get("/make-server-da0752f5/admin/contacts", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: "Admin access required" }, 403);
    }

    const contactIndex = await kv.get('contacts:index') || [];
    const contacts = [];
    
    for (const contactId of contactIndex) {
      const contact = await kv.get(`contact:${contactId}`);
      if (contact) {
        contacts.push(contact);
      }
    }

    return c.json(contacts.reverse()); // Latest first
  } catch (error) {
    console.error('Admin get contacts error:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);