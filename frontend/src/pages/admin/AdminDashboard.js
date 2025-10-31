import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Loading from '../../components/Loading';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';
import { Users, Film, CreditCard, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboard();
      setDashboard(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const stats = dashboard?.stats || {};

  return (
    <div className="flex bg-black min-h-screen">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Total Users</h3>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalUsers || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Total Videos</h3>
              <Film className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalVideos || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Active Subscriptions</h3>
              <CreditCard className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.activeSubscriptions || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Total Revenue</h3>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-white">${stats.totalRevenue?.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Recent Users</h2>
            <div className="space-y-3">
              {dashboard?.recentUsers?.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    user.subscription?.status === 'active'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {user.subscription?.status || 'Free'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Videos */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Top Videos</h2>
            <div className="space-y-3">
              {dashboard?.topVideos?.map((video) => (
                <div key={video._id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-semibold truncate">{video.title}</p>
                    <p className="text-gray-400 text-sm">{video.views} views</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-gray-900 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboard?.recentPayments?.map((payment) => (
                  <tr key={payment._id} className="border-b border-gray-800">
                    <td className="py-3 text-white">{payment.user?.name}</td>
                    <td className="py-3 text-gray-400">{payment.plan?.name}</td>
                    <td className="py-3 text-white">${payment.amount}</td>
                    <td className="py-3 text-gray-400">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
