
"use client";
import { MainHeader } from '@/components/main-header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


function AppLayoutSkeleton() {
    return (
      <div className="flex min-h-screen">
        <div className="border-r border-border/80 hidden md:flex flex-col p-2 gap-2 w-12">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-px w-full" />
            <div className="flex-grow p-2 space-y-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
            </div>
        </div>
        <div className="flex flex-col w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-end border-b bg-background px-4">
            <Skeleton className="h-9 w-9 rounded-full" />
          </header>
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
             <div className="space-y-8">
                <Skeleton className="h-10 w-1/3" />
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
          </main>
        </div>
      </div>
    )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { authInfo, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (loading) {
      return; // Wait for auth state to be determined
    }
    
    // Define public paths that don't require authentication
    const publicPaths = ['/verify', '/provenance', '/document'];
    const isPublicPath = publicPaths.some(p => pathname.startsWith(p));
    
    // Consumers can access public paths without being logged in
    if (isPublicPath && searchParams.get('role') === 'consumer') {
        return;
    }

    // If not authenticated and not on an allowed public path, redirect to login
    if (!authInfo) {
      router.push('/login');
    }

  }, [authInfo, loading, router, pathname, searchParams]);

  // While loading, or if not authenticated and not on a public path, show a skeleton
  if (loading || !authInfo) {
    const isPublicPath = ['/verify', '/provenance', '/document'].some(p => pathname.startsWith(p));
    if (isPublicPath && searchParams.get('role') === 'consumer') {
       // Allow public consumer pages to render their own content
       return <main className="flex-1 print:p-0">{children}</main>;
    }
    return <AppLayoutSkeleton />;
  }
  
  // Special case for consumer provenance page: render without app shell if they are not logged in
  if (pathname.startsWith('/provenance') && authInfo.role === 'consumer' && searchParams.get('role') === 'consumer') {
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
