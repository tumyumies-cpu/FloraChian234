
"use client";
import { MainHeader } from '@/components/main-header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { authInfo, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // If auth is loading, don't do anything yet.
    if (loading) {
      return;
    }
    
    const isPublicPath = 
      (pathname === '/verify' && searchParams.get('role') === 'consumer');
      
    if (!authInfo && !isPublicPath) {
      router.push('/login');
    }

  }, [authInfo, loading, router, pathname, searchParams]);

  if (loading || !authInfo) {
    const isPublicVerify = pathname === '/verify' && searchParams.get('role') === 'consumer';
    if (isPublicVerify) {
       return <main className="p-4 sm:p-6 lg:p-8 flex-1 print:p-0">{children}</main>;
    }
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-r border-border/80 hidden md:flex"
        >
          <SidebarNav />
        </Sidebar>
        <div className="flex flex-col w-full">
          <MainHeader />
          <main className="p-4 sm:p-6 lg:p-8 flex-1 print:p-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
