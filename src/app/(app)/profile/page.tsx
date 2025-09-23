
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShieldCheck, Edit, AtSign, Calendar, CheckCircle } from 'lucide-react';
import type { UserRole } from '@/lib/data';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
        <p className="text-muted-foreground">Your account information and role within the supply chain.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Column - User Card */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
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
              <h2 className="mt-4 text-2xl font-headline font-semibold">{roleLabel}</h2>
              <p className="text-muted-foreground">{role}@florachain.com</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details Card */}
        <div className="md:col-span-2">
           <Card>
            <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Your role, status, and activity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                    <ShieldCheck className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground">ROLE</p>
                        <p className="font-medium">{roleLabel}</p>
                    </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                    <AtSign className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground">EMAIL</p>
                        <p className="font-medium">{role}@florachain.com</p>
                    </div>
                </div>
                 <Separator />
                <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground">STATUS</p>
                        <p className="font-medium">Active</p>
                    </div>
                </div>
                <Separator />
                <div className="flex items-start gap-4">
                    <Calendar className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground">MEMBER SINCE</p>
                        <p className="font-medium">January 1, 2024</p>
                    </div>
                </div>
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
