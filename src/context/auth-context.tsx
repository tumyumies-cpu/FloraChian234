
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authInfo, setAuthInfoState] = useState<AuthInfo | null>(null);

  useEffect(() => {
    try {
      const storedAuthInfo = localStorage.getItem('authInfo');
      if (storedAuthInfo) {
        setAuthInfoState(JSON.parse(storedAuthInfo));
      }
    } catch (error) {
      console.warn("Could not access localStorage. Auth persistence will be disabled.");
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

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
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
