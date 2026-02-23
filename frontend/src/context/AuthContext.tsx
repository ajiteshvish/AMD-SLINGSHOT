import React, { createContext, useContext, useEffect, useState } from 'react';

// Demo user type
interface DemoUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: DemoUser | null;
  role: 'user' | 'admin' | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [role, setRole] = useState<'user' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('demo_user');
    const storedRole = localStorage.getItem('demo_role');
    
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole as 'user' | 'admin');
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Demo mode: accept any credentials
    // Auto-detect role from email
    const detectedRole: 'user' | 'admin' = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    
    const user = { id: email, email };
    setUser(user);
    setRole(detectedRole);
    
    localStorage.setItem('demo_user', JSON.stringify(user));
    localStorage.setItem('demo_role', detectedRole);
  };

  const signup = async (email: string) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, just create a user session without actually storing
    const user = { id: email, email };
    setUser(user);
    // Don't set role yet - user needs to select it
    
    localStorage.setItem('demo_user', JSON.stringify(user));
  };

  const signOut = async () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('demo_user');
    localStorage.removeItem('demo_role');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, signup, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

