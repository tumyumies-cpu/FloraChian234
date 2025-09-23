
import { MainHeader } from '@/components/main-header';
import { SidebarNav } from '@/components/sidebar-nav';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {

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
