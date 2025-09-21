"use client";

import { MainHeader } from '@/components/main-header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth-context';
import { useSearchParams } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const searchParams = useSearchParams();
  const roleFromParams = searchParams.get('role');

  // Use the role from the auth context, but fall back to URL param if not yet hydrated.
  const currentRole = role || roleFromParams;
  
  const isMobileOptimizedRole = currentRole === 'farmer' || currentRole === 'consumer';

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
