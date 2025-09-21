"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserRole } from '@/lib/data';

interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(null);

  useEffect(() => {
    // On initial load, try to get the role from localStorage
    try {
      const storedRole = localStorage.getItem('userRole') as UserRole | null;
      if (storedRole) {
        setRoleState(storedRole);
      }
    } catch (error) {
      console.warn("Could not access localStorage. Role persistence will be disabled.");
    }
  }, []);

  const setRole = (newRole: UserRole | null) => {
    setRoleState(newRole);
    try {
      if (newRole) {
        localStorage.setItem('userRole', newRole);
      } else {
        localStorage.removeItem('userRole');
      }
    } catch (error) {
       console.warn("Could not access localStorage. Role persistence will be disabled.");
    }
  };

  return (
    <AuthContext.Provider value={{ role, setRole }}>
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
