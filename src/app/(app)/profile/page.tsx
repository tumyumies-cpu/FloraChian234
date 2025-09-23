
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShieldCheck, Edit } from 'lucide-react';
import type { UserRole } from '@/lib/data';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function getRoleLabel(role: string | null) {
  if (!role) return "User";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') || 'consumer') as UserRole;
  const roleLabel = getRoleLabel(role);

  const [avatarKey, setAvatarKey] = useState(Date.now());

  const handleEditAvatar = () => {
    // Re-renders the avatar with a new random image by changing the key
    setAvatarKey(Date.now());
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">Your account information and role.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage key={avatarKey} src={`https://i.pravatar.cc/150?u=${role}&t=${avatarKey}`} alt={`${roleLabel} Avatar`} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background group-hover:bg-accent"
                onClick={handleEditAvatar}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Avatar</span>
              </Button>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-headline">{roleLabel}</CardTitle>
              <CardDescription className="text-lg">{role}@florachain.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold text-muted-foreground">ROLE</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="font-medium">{roleLabel}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold text-muted-foreground">STATUS</span>
              <p className="font-medium">Active</p>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-semibold text-muted-foreground">MEMBER SINCE</span>
              <p className="font-medium">January 1, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
