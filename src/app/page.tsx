"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Tractor, Warehouse, ShoppingCart, ShieldCheck, Leaf } from 'lucide-react';

const roles = [
  { value: 'consumer', label: 'Consumer', icon: User },
  { value: 'farmer', label: 'Farmer', icon: Tractor },
  { value: 'processor', label: 'Processor', icon: Warehouse },
  { value: 'retailer', label: 'Retailer', icon: ShoppingCart },
  { value: 'admin', label: 'Admin', icon: ShieldCheck },
];

export default function LoginPage() {
  const { role, setRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.push(`/dashboard?role=${role}`);
    }
  }, [role, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      router.push(`/dashboard?role=${role}`);
    }
  };
  
  // Set a default role if none is selected
  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole as any);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <Leaf className="h-8 w-8" />
                <span className="font-headline text-2xl font-semibold">FloraChain</span>
            </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
            <CardDescription>Select your role to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role-select">Role</Label>
                <Select onValueChange={handleRoleChange} defaultValue={role || roles[0].value}>
                  <SelectTrigger id="role-select" className="h-11">
                    <SelectValue placeholder="Select a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(r => (
                      <SelectItem key={r.value} value={r.value}>
                        <div className="flex items-center gap-2">
                          <r.icon className="h-4 w-4 text-muted-foreground" />
                          <span>{r.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={!role}>
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
         <p className="px-8 text-center text-sm text-muted-foreground mt-6">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
      </div>
    </div>
  );
}
