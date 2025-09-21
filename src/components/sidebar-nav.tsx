'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, PlusCircle, ScanLine } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/create-batch', label: 'Create Batch', icon: PlusCircle },
  { href: '/verify', label: 'Verify Batch', icon: ScanLine },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { role } = useAuth();

  const getHref = (path: string) => {
    return role ? `${path}?role=${role}` : path;
  }

  // Filter menu items based on role
  const filteredMenuItems = menuItems.filter(item => {
    if (role === 'consumer') {
      return item.href !== '/create-batch';
    }
    if (role === 'farmer') {
      return item.href !== '/verify';
    }
    if(role === 'admin') {
        return item.href === '/dashboard';
    }
    // For processor and retailer, they can see verify and dashboard
    if (role === 'processor' || role === 'retailer') {
        return item.href === '/dashboard' || item.href === '/verify';
    }

    return true;
  });

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="font-headline text-lg font-semibold">FloraChain</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={getHref(item.href)} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <div>
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
