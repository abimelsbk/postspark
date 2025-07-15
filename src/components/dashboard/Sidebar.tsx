import React from 'react';
import { FileText, Plus, CreditCard, User, BarChart3, Settings, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: FileText, label: 'My Notes', path: '/dashboard' },
  { icon: Plus, label: 'Create New', path: '/editor' },
  { icon: Calendar, label: 'Scheduling', path: '/scheduling' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: CreditCard, label: 'Pricing', path: '/pricing' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-accent-200 min-h-screen hidden lg:block">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-accent-600 hover:bg-accent-50 hover:text-accent-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
