"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, Tractor, Warehouse, ShoppingCart } from 'lucide-react';

const roles = [
  { value: 'consumer', label: 'Consumer', icon: User },
  { value: 'farmer', label: 'Farmer', icon: Tractor },
  { value: 'processor', label: 'Processor', icon: Warehouse },
  { value: 'retailer', label: 'Retailer', icon: ShoppingCart },
];

export function UserRoleSwitcher({ currentRole }: { currentRole: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoleChange = (newRole: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('role', newRole);
    router.push(`${pathname}?${params.toString()}`);
  };

  const CurrentRoleIcon = roles.find(r => r.value === currentRole)?.icon || User;

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="role-switcher" className="text-sm font-medium">Viewing as:</Label>
      <Select onValueChange={handleRoleChange} defaultValue={currentRole}>
        <SelectTrigger className="w-[180px] h-10" id="role-switcher">
          <div className="flex items-center gap-2">
            <CurrentRoleIcon className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select a role" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {roles.map(role => (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex items-center gap-2">
                <role.icon className="h-4 w-4 text-muted-foreground" />
                <span>{role.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
