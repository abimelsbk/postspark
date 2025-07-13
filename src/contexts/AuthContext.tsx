import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'super';
  usage: {
    notes: number;
    aiGenerations: number;
  };
  permissions?: {
    unlimitedAI: boolean;
    unlimitedNotes: boolean;
    adminAccess: boolean;
    allFeatures: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('postspark_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for super user credentials
    const isSuperUser = email === 'super@postspark.com' && password === 'superuser123';
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      plan: isSuperUser ? 'super' : 'free',
      usage: { notes: isSuperUser ? 999 : 2, aiGenerations: isSuperUser ? 999 : 1 },
      permissions: isSuperUser ? {
        unlimitedAI: true,
        unlimitedNotes: true,
        adminAccess: true,
        allFeatures: true
      } : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('postspark_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name,
      plan: email === 'super@postspark.com' ? 'super' : 'free',
      usage: { notes: 0, aiGenerations: 0 },
      permissions: email === 'super@postspark.com' ? {
        unlimitedAI: true,
        unlimitedNotes: true,
        adminAccess: true,
        allFeatures: true
      } : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('postspark_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('postspark_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};