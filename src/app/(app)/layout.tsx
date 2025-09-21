"use client";

import { MainHeader } from '@/components/main-header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth-context';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const searchParams = useSearchParams();
  const roleFromParams = searchParams.get('role');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Use the role from the auth context, but fall back to URL param if not yet hydrated.
  const currentRole = role || roleFromParams;
  
  const isMobileOptimizedRole = currentRole === 'farmer' || currentRole === 'consumer';

  if (!hasMounted) {
    return (
       <div className="flex min-h-screen">
        <Skeleton className="hidden md:block md:w-64 border-r" />
        <div className="flex flex-col w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-end border-b bg-background/80 px-4 backdrop-blur-sm">
             <Skeleton className="h-9 w-9 rounded-full" />
          </header>
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
             <Skeleton className="h-32 w-full" />
          </main>
        </div>
      </div>
    );
  }

  // For Farmer and Consumer, provide a mobile-first view without a persistent sidebar.
  if (isMobileOptimizedRole) {
    return (
      <SidebarProvider>
          <div className="flex flex-col w-full min-h-screen">
            <MainHeader />
            <main className="p-4 sm:p-6 lg:p-8 flex-1">
              {children}
            </main>
          </div>
      </SidebarProvider>
    );
  }

  // For all other roles, provide a desktop-first view with a sidebar.
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-r border-border/80"
        >
          <SidebarNav />
        </Sidebar>
        <div className="flex flex-col w-full">
          <MainHeader />
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
