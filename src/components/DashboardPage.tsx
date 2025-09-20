import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, PlusCircle, Wallet, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PaymentGateway } from './PaymentGateway';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Investment {
  id: string;
  amount: number;
  start_date: string;
  status: string;
  current_year: number;
  total_returns_paid: number;
  next_payment_date: string;
}

interface DashboardPageProps {
  onPageChange: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [newInvestmentAmount, setNewInvestmentAmount] = useState(100000);

  useEffect(() => {
    if (user) {
      fetchInvestments();
    }
  }, [user]);

  const fetchInvestments = async () => {
    try {
      const { data: { session } } = await (await import('@supabase/supabase-js')).createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      ).auth.getSession();

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-da0752f5/investments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        const processedInvestments = result.map((inv: any) => ({
          ...inv,
          // Ensure proper field mapping for display
          id: inv.id,
          amount: inv.amount,
          start_date: inv.start_date,
          status: inv.status,
          current_year: inv.current_year || 1,
          total_returns_paid: inv.total_returns_paid || 0,
          next_payment_date: inv.next_payment_date,
          months_completed: inv.months_completed || 0
        }));
        setInvestments(processedInvestments);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch investments');
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
      setError('Failed to fetch investments');
    } finally {
      setLoading(false);
    }
  };

  const createInvestment = async () => {
    try {
      const { data: { session } } = await (await import('@supabase/supabase-js')).createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      ).auth.getSession();

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-da0752f5/investments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: newInvestmentAmount,
          plan_type: 'standard'
        })
      });

      if (response.ok) {
        setShowInvestmentForm(false);
        fetchInvestments(); // Refresh investments
        setNewInvestmentAmount(100000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create investment');
      }
    } catch (error) {
      console.error('Error creating investment:', error);
      setError('Failed to create investment');
    }
  };

  const calculateMonthlyReturn = (amount: number, year: number) => {
    const rates = { 1: 0.03, 2: 0.035, 3: 0.04 };
    return amount * (rates[year as keyof typeof rates] || 0.03);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investments.reduce((sum, inv) => sum + inv.total_returns_paid, 0);
  const monthlyReturns = investments.reduce((sum, inv) => {
    return sum + calculateMonthlyReturn(inv.amount, inv.current_year);
  }, 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
          <button
            onClick={() => onPageChange('login')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.user_metadata?.name || user.email}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your investments and track your returns
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvestment)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Monthly Returns</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlyReturns)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Returns</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalReturns)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Investments</p>
                <p className="text-2xl font-bold text-gray-900">{investments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Form */}
        {showInvestmentForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">New Investment</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (₹)
                </label>
                <input
                  type="number"
                  value={newInvestmentAmount}
                  onChange={(e) => setNewInvestmentAmount(Number(e.target.value))}
                  min="50000"
                  step="10000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Minimum: ₹50,000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Expected Returns</h3>
                <div className="space-y-1 text-sm">
                  <div>Year 1: {formatCurrency(newInvestmentAmount * 0.03)}/month</div>
                  <div>Year 2: {formatCurrency(newInvestmentAmount * 0.035)}/month</div>
                  <div>Year 3: {formatCurrency(newInvestmentAmount * 0.04)}/month</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={createInvestment}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Create Investment
              </button>
              <button
                onClick={() => setShowInvestmentForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Investments List */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Your Investments</h2>
              <button
                onClick={() => setShowInvestmentForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                New Investment
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading investments...</p>
            </div>
          ) : investments.length === 0 ? (
            <div className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Investments Yet</h3>
              <p className="text-gray-600 mb-4">
                Start your investment journey with NF Plantation today.
              </p>
              <button
                onClick={() => setShowInvestmentForm(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Make Your First Investment
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Return
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Paid
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {investments.map((investment) => (
                    <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(investment.amount)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Started: {formatDate(investment.start_date)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Year {investment.current_year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          {formatCurrency(calculateMonthlyReturn(investment.amount, investment.current_year))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(investment.total_returns_paid)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(investment.next_payment_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          investment.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {investment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};