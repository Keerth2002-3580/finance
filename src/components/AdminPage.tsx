import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, MessageSquare, UserCheck, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

interface Investment {
  id: string;
  userId: string;
  amount: number;
  status: string;
  created_at: string;
  start_date?: string;
  current_year?: number;
  months_completed?: number;
  total_returns_paid?: number;
  next_payment_date?: string;
  total_paid?: number; // Legacy field support
  userInfo?: {
    name: string;
    email: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  total_investment: number;
  active_investments: string[];
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  status: string;
}

interface AdminPageProps {
  onPageChange: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onPageChange }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'investments' | 'users' | 'contacts'>('dashboard');
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.user_metadata?.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );
      
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      if (!accessToken) {
        setError('No access token available');
        return;
      }

      // Fetch investments
      const investmentsResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-da0752f5/admin/investments`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (investmentsResponse.ok) {
        const investmentsData = await investmentsResponse.json();
        setInvestments(investmentsData);
      }

      // Fetch users
      const usersResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-da0752f5/admin/users`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }

      // Fetch contacts
      const contactsResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-da0752f5/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json();
        setContacts(contactsData);
      }

    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyPayout = async (investmentId: string) => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );
      
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-da0752f5/admin/investments/${investmentId}/payout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        setError(''); // Clear any existing errors
        fetchAdminData(); // Refresh data
        // Show success message
        alert(`Payout processed successfully: ${formatCurrency(result.payout.amount)} for month ${result.payout.month}, year ${result.payout.year}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to process payout');
      }
    } catch (error) {
      console.error('Error processing payout:', error);
      setError('Failed to process payout');
    }
  };

  const updateInvestmentStatus = async (investmentId: string, status: string) => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );
      
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-da0752f5/admin/investments/${investmentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchAdminData(); // Refresh data
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update investment');
      }
    } catch (error) {
      console.error('Error updating investment:', error);
      setError('Failed to update investment');
    }
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

  if (!user || user.user_metadata?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Admin access required.</p>
          <button
            onClick={() => onPageChange('home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const totalInvestments = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalUsers = users.length;
  const totalPaid = investments.reduce((sum, inv) => sum + (inv.total_returns_paid || inv.total_paid || 0), 0);
  const pendingContacts = contacts.filter(c => c.status === 'new').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage investments, users, and system operations</p>
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
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Investments</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvestments)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Paid Out</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{pendingContacts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'dashboard'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('investments')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'investments'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Investments ({investments.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'users'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'contacts'
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Contacts ({contacts.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading...</p>
              </div>
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• {investments.filter(i => new Date(i.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length} new investments this week</p>
                          <p>• {users.filter(u => new Date(u.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length} new users registered this week</p>
                          <p>• {contacts.filter(c => new Date(c.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length} new contact inquiries this week</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => setActiveTab('investments')}
                            className="w-full text-left text-sm text-green-600 hover:text-green-700"
                          >
                            • Review pending investments
                          </button>
                          <button
                            onClick={() => setActiveTab('contacts')}
                            className="w-full text-left text-sm text-green-600 hover:text-green-700"
                          >
                            • Check new contact messages
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'investments' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Management</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Investor
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Start Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Year / Month
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Total Paid
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {investments.map((investment) => (
                            <tr key={investment.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {investment.userInfo?.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {investment.userInfo?.email}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {formatCurrency(investment.amount)}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {formatDate(investment.start_date || investment.created_at)}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                <div className="text-xs">
                                  <div>Year {investment.current_year || 1}</div>
                                  <div className="text-gray-500">Month {(investment.months_completed || 0) + 1}</div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {formatCurrency(investment.total_returns_paid || investment.total_paid || 0)}
                              </td>
                              <td className="px-4 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  investment.status === 'active' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {investment.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <button
                                  onClick={() => processMonthlyPayout(investment.id)}
                                  className="text-green-600 hover:text-green-900 mr-2 text-xs bg-green-50 px-2 py-1 rounded"
                                  disabled={investment.status !== 'active'}
                                >
                                  Process Payout
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              User
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Total Investment
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Active Investments
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Joined
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {user.email}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {formatCurrency(user.total_investment)}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {user.active_investments?.length || 0}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-900">
                                {formatDate(user.created_at)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'contacts' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Messages</h3>
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{contact.name}</h4>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <Mail className="w-4 h-4 mr-1" />
                                {contact.email}
                                {contact.phone && (
                                  <>
                                    <Phone className="w-4 h-4 ml-3 mr-1" />
                                    {contact.phone}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">{formatDate(contact.created_at)}</div>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                                contact.status === 'new' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {contact.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">{contact.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};