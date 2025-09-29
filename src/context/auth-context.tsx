
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs once on mount to check for persisted auth info
    // It helps maintain the session across page refreshes.
    let isMounted = true;
    try {
      const storedAuthInfo = localStorage.getItem('authInfo');
      if (isMounted && storedAuthInfo) {
        setAuthInfoState(JSON.parse(storedAuthInfo));
      }
    } catch (error) {
      console.warn("Could not access localStorage. Auth persistence will be disabled.");
    } finally {
      if (isMounted) {
        setLoading(false); 
      }
    }
    return () => { isMounted = false; };
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

  // We now render children immediately, and the loading state is used by consumers
  // to decide whether to show a loader or content. This prevents unmounting issues.
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
