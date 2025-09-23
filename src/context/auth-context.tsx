
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserRole } from '@/lib/data';

interface AuthInfo {
  email: string | null;
  role: UserRole | null;
}

interface AuthContextType {
  authInfo: AuthInfo | null;
  setAuthInfo: (authInfo: AuthInfo | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authInfo, setAuthInfoState] = useState<AuthInfo | null>(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  useEffect(() => {
    try {
      const storedAuthInfo = localStorage.getItem('authInfo');
      if (storedAuthInfo) {
        setAuthInfoState(JSON.parse(storedAuthInfo));
      }
    } catch (error) {
      console.warn("Could not access localStorage. Auth persistence will be disabled.");
    } finally {
      setLoading(false); // <-- Set loading to false after checking localStorage
    }
  }, []);

  const setAuthInfo = (newAuthInfo: AuthInfo | null) => {
    setAuthInfoState(newAuthInfo);
    try {
      if (newAuthInfo) {
        localStorage.setItem('authInfo', JSON.stringify(newAuthInfo));
      } else {
        localStorage.removeItem('authInfo');
      }
    } catch (error) {
       console.warn("Could not access localStorage. Auth persistence will be disabled.");
    }
  };

  // Do not render children until loading is complete
  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
