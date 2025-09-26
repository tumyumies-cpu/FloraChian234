
'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, PlusCircle, ScanLine, History, Combine, Package } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useLanguage, content } from '@/context/language-context';

const getMenuItems = (c: any) => [
  { href: '/dashboard', label: c.dashboard, icon: LayoutDashboard, roles: ['farmer', 'processor', 'supplier', 'brand', 'distributor', 'retailer', 'consumer', 'admin'] },
  { href: '/create-batch', label: c.createBatch, icon: PlusCircle, roles: ['farmer'] },
  { href: '/past-batches', label: c.pastBatches, icon: History, roles: ['farmer', 'processor', 'supplier', 'admin'] },
  { href: '/assemble-product', label: c.assembleProduct, icon: Combine, roles: ['brand', 'admin'] },
  { href: '/past-products', label: c.pastProducts, icon: Package, roles: ['brand', 'distributor', 'retailer', 'admin'] },
  { href: '/verify', label: c.verify, icon: ScanLine, roles: ['consumer', 'processor', 'supplier', 'distributor', 'retailer'] },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { authInfo, loading } = useAuth();
  const { language } = useLanguage();
  const role = authInfo?.role;

  const menuItems = getMenuItems(content[language].sidebar);

  const getHref = (path: string) => {
    return role ? `${path}?role=${role}` : path;
  }

  // Don't render until auth state is loaded
  if (loading) {
    return null;
  }

  const filteredMenuItems = menuItems.filter(item => {
    if (!role) return false;
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
      <SidebarContent className="flex-grow">
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
