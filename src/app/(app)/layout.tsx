

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
    
    // Public paths that do not require authentication
    const publicPaths = [
        '/verify',
        '/provenance'
    ];
      
    // Allow access to verify/provenance pages if the role is consumer
    const isPublicConsumerPath = 
      (publicPaths.some(p => pathname.startsWith(p))) && searchParams.get('role') === 'consumer';
      
    if (!authInfo && !isPublicConsumerPath) {
      router.push('/login');
    }

  }, [authInfo, loading, router, pathname, searchParams]);

  if (loading || (!authInfo && !(pathname.startsWith('/provenance') && searchParams.get('role') === 'consumer'))) {
    // If it's a consumer trying to view provenance, show the page without the layout.
    const isPublicProvenance = pathname.startsWith('/provenance') && searchParams.get('role') === 'consumer';
    if(isPublicProvenance) {
        return <main className="flex-1 print:p-0">{children}</main>;
    }
    // For other cases, show nothing while loading or if not authenticated.
    return null;
  }
  
  // Special case for consumer provenance page: render without app shell
  if (pathname.startsWith('/provenance') && searchParams.get('role') === 'consumer') {
    return <main className="flex-1 print:p-0">{children}</main>;
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
