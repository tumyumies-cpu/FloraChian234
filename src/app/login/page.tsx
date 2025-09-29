
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Leaf, LoaderCircle, ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from '@/hooks/use-toast';
import { loginSchema, type LoginValues } from '@/lib/schemas';
import { Skeleton } from '@/components/ui/skeleton';
import { useDbContext } from '@/context/db-context';

function LoginContent() {
  const { setAuthInfo } = useAuth();
  const { db, loading: dbLoading } = useDbContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(async () => {
      const users = db?.users || [];
      const existingUser = users.find(u => u.email.toLowerCase() === values.email.toLowerCase());
      
      if (!existingUser) {
        toast({
            variant: "destructive",
            title: "Access Denied",
            description: "The credentials you entered are not valid for a platform member.",
        });
        setLoading(false);
        return;
      }
      
      setAuthInfo({ email: values.email, role: existingUser.role });
      toast({
        title: "Login Successful",
        description: `Welcome! Redirecting to your dashboard.`,
      });
      router.push(`/dashboard?role=${existingUser.role}`);
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password"); // Use a static password for demo
  };

  if (dbLoading) {
    return <LoginFormSkeleton />
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Platform Member Sign-In</CardTitle>
          <CardDescription>Enter your credentials to access the supply chain portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., member@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <LoaderCircle className="animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {db?.users && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-headline">Demo Credentials</CardTitle>
            </div>
            <CardDescription>Click any user to auto-fill login details.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-2">
                {db.users.map(user => (
                  <button
                    key={user.id}
                    onClick={() => handleDemoLogin(user.email)}
                    className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Role: <span className="capitalize font-semibold">{user.role}</span> | Password: password
                    </p>
                  </button>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="px-8 text-center text-sm text-muted-foreground mt-6">
          This login is for authorized members only. If you are a consumer, please use the "Track Your Product" button on the home page.
      </p>
    </>
  );
}

function LoginFormSkeleton() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Platform Member Sign-In</CardTitle>
                    <CardDescription>Enter your credentials to access the supply chain portal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-11 w-full" />
                </CardContent>
            </Card>
            <Skeleton className="h-10 w-3/4 mx-auto mt-6" />
        </>
    );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <Button asChild variant="ghost" className="absolute top-4 left-4">
          <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
          </Link>
      </Button>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <Leaf className="h-8 w-8" />
                <span className="font-headline text-2xl font-semibold">FloraChain</span>
            </Link>
        </div>
        <Suspense fallback={<LoginFormSkeleton />}>
            <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
