
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { UserRole } from '@/lib/data';

interface AuthInfo {
  email: string;
  role: UserRole | string;
}

interface AuthContextType {
  authInfo: AuthInfo | null;
  setAuthInfo: (authInfo: AuthInfo | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Keep the state in memory for the duration of the session
let inMemoryAuth: AuthInfo | null = null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authInfo, setAuthInfoState] = useState<AuthInfo | null>(inMemoryAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On initial load, we set the state from our in-memory variable.
    // This is synchronous and avoids any client/server mismatch.
    setAuthInfoState(inMemoryAuth);
    setLoading(false);
  }, []);

  const setAuthInfo = useCallback((newAuthInfo: AuthInfo | null) => {
    inMemoryAuth = newAuthInfo; // Update the in-memory state
    setAuthInfoState(newAuthInfo); // Update the React state
  }, []);

  const value = { authInfo, setAuthInfo, loading };

  return (
    <AuthContext.Provider value={value}>
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
