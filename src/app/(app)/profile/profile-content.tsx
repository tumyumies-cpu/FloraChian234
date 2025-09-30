
'use client';

import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShieldCheck, AtSign, Calendar, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';

function getRoleLabel(role: string | null) {
  if (!role) return "User";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function ProfileContent() {
  const { authInfo } = useAuth();
  const searchParams = useSearchParams();
  const role = authInfo?.role ?? searchParams.get('role');
  const roleLabel = getRoleLabel(role || null);

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
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="mt-4 text-2xl font-headline font-semibold">{roleLabel}</h2>
              <p className="text-muted-foreground">{authInfo?.email}</p>
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
                        <p className="font-medium">{authInfo?.email}</p>
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

export function ProfilePageSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-5 w-1/2 mt-2" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 mt-4" />
              <Skeleton className="h-5 w-32 mt-2" />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-5 w-2/3 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-6 w-6" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
