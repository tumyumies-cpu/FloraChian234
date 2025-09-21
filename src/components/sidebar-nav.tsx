
'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, PlusCircle, ScanLine, History, Combine, Handshake, Package, Truck, Store } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/create-batch', label: 'Create Batch', icon: PlusCircle, roles: ['farmer'] },
  { href: '/past-batches', label: 'Past Batches', icon: History, roles: ['farmer', 'processor', 'supplier', 'admin'] },
  { href: '/past-products', label: 'Past Products', icon: Package, roles: ['brand', 'retailer', 'distributor', 'admin'] },
  { href: '/verify', label: 'Verify/Update', icon: ScanLine, roles: ['consumer', 'processor', 'retailer', 'supplier', 'distributor'] },
  { href: '/assemble-product', label: 'Assemble Product', icon: Combine, roles: ['brand'] },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { role } = useAuth();

  const getHref = (path: string) => {
    return role ? `${path}?role=${role}` : path;
  }

  const filteredMenuItems = menuItems.filter(item => {
    if (!role) return false;
    if (item.href === '/dashboard') return true; // Everyone sees dashboard
    if (role === 'admin') return item.roles?.includes(role); // Admin sees dashboard and history pages
    return item.roles?.includes(role);
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
              <Link href={getHref(item.href)}>
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
