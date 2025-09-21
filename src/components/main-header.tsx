"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function MainHeader() {
  const { role, setRole } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setRole(null);
    router.push('/');
  }

  const getRoleLabel = (role: string | null) => {
    if (!role) return "User";
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:justify-end">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt="User Avatar" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{getRoleLabel(role)}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {role}@florachain.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
