import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShieldCheck } from 'lucide-react';
import type { UserRole } from '@/lib/data';

function getRoleLabel(role: string | null) {
  if (!role) return "User";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function ProfilePage({ searchParams }: { searchParams: { role?: string } }) {
  const role = (searchParams.role || 'consumer') as UserRole;
  const roleLabel = getRoleLabel(role);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">Your account information and role.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${role}`} alt={`${roleLabel} Avatar`} />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
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
