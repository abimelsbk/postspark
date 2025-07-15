import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  BarChart3, 
  MessageSquare, 
  Settings,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastActive: Date;
  usage: {
    notes: number;
    aiGenerations: number;
  };
}

interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  usageLimit: number;
  usageCount: number;
  expiresAt: Date;
  active: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    plan: 'pro',
    status: 'active',
    createdAt: new Date(2024, 0, 15),
    lastActive: new Date(2024, 1, 20),
    usage: { notes: 45, aiGenerations: 120 }
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    plan: 'free',
    status: 'active',
    createdAt: new Date(2024, 0, 20),
    lastActive: new Date(2024, 1, 19),
    usage: { notes: 2, aiGenerations: 1 }
  },
];

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'LAUNCH50',
    discount: 50,
    type: 'percentage',
    usageLimit: 100,
    usageCount: 23,
    expiresAt: new Date(2024, 2, 31),
    active: true
  },
  {
    id: '2',
    code: 'SAVE10',
    discount: 10,
    type: 'fixed',
    usageLimit: 500,
    usageCount: 87,
    expiresAt: new Date(2024, 5, 30),
    active: true
  },
];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'billing' | 'coupons' | 'support' | 'settings'>('overview');
  const [users] = useState<User[]>(mockUsers);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCouponForm, setShowNewCouponForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0,
    type: 'percentage' as 'percentage' | 'fixed',
    usageLimit: 100,
    expiresAt: '',
  });

  // Redirect to landing page if user is not authenticated or not admin
  if (!user || !user.permissions?.adminAccess) {
    return <Navigate to="/" replace />;
  }
  const handleCreateCoupon = () => {
    const coupon: Coupon = {
      id: Date.now().toString(),
      code: newCoupon.code.toUpperCase(),
      discount: newCoupon.discount,
      type: newCoupon.type,
      usageLimit: newCoupon.usageLimit,
      usageCount: 0,
      expiresAt: new Date(newCoupon.expiresAt),
      active: true
    };
    setCoupons([...coupons, coupon]);
    setNewCoupon({ code: '', discount: 0, type: 'percentage', usageLimit: 100, expiresAt: '' });
    setShowNewCouponForm(false);
  };

  const stats = {
    totalUsers: users.length,
    proUsers: users.filter(u => u.plan === 'pro').length,
    freeUsers: users.filter(u => u.plan === 'free').length,
    revenue: users.filter(u => u.plan === 'pro').length * 29,
    activeUsers: users.filter(u => u.status === 'active').length,
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent-600">Pro Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.proUsers}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${stats.revenue}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-accent-600">New user registration</span>
              <span className="text-sm text-accent-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-accent-600">Pro plan upgrade</span>
              <span className="text-sm text-accent-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-accent-600">Support ticket resolved</span>
              <span className="text-sm text-accent-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Content</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-accent-600">AI-generated posts</span>
              <span className="text-sm font-medium text-primary-500">1,234 generated</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-accent-600">Unicode formatting</span>
              <span className="text-sm font-medium text-primary-500">856 uses</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-accent-600">Most used style</span>
              <span className="text-sm font-medium text-primary-500">Fancy Script</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Users
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-accent-300 rounded-lg hover:bg-accent-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-200">
                <th className="text-left py-3 px-4 font-medium text-accent-600">User</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Usage</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-accent-100 hover:bg-accent-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-accent-600">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.plan === 'pro' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                    }`}>
                      {user.plan.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p>{user.usage.notes} notes</p>
                      <p>{user.usage.aiGenerations} AI gens</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-accent-600">
                    {user.lastActive.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-accent-400 hover:text-primary-500 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-accent-400 hover:text-primary-500 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-accent-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCoupons = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Coupon Management</h2>
        <button
          onClick={() => setShowNewCouponForm(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </button>
      </div>

      {showNewCouponForm && (
        <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Coupon</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code</label>
              <input
                type="text"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="SAVE20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
              <input
                type="number"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newCoupon.type}
                onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as 'percentage' | 'fixed' })}
                className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
              <input
                type="number"
                value={newCoupon.usageLimit}
                onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Expires At</label>
              <input
                type="date"
                value={newCoupon.expiresAt}
                onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                onClick={handleCreateCoupon}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Coupon
              </button>
              <button
                onClick={() => setShowNewCouponForm(false)}
                className="bg-accent-200 hover:bg-accent-300 text-accent-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-200">
                <th className="text-left py-3 px-4 font-medium text-accent-600">Code</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Discount</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Usage</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Expires</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-accent-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-accent-100 hover:bg-accent-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{coupon.code}</td>
                  <td className="py-3 px-4">
                    {coupon.discount}{coupon.type === 'percentage' ? '%' : '$'} off
                  </td>
                  <td className="py-3 px-4">
                    {coupon.usageCount}/{coupon.usageLimit}
                  </td>
                  <td className="py-3 px-4 text-sm text-accent-600">
                    {coupon.expiresAt.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-accent-400 hover:text-primary-500 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-accent-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'coupons', label: 'Coupons', icon: DollarSign },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-accent-600 hover:text-primary-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-accent-600">Manage users, billing, and platform settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-accent-600 hover:bg-accent-50 hover:text-accent-900'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <main className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'coupons' && renderCoupons()}
            {activeTab === 'billing' && (
              <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-8 text-center">
                <CreditCard className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Billing Management</h3>
                <p className="text-accent-600">Stripe integration and billing features would be implemented here.</p>
              </div>
            )}
            {activeTab === 'support' && (
              <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-8 text-center">
                <MessageSquare className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Support System</h3>
                <p className="text-accent-600">Customer support ticket system would be implemented here.</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-8 text-center">
                <Settings className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Platform Settings</h3>
                <p className="text-accent-600">Global platform configuration settings would be implemented here.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
