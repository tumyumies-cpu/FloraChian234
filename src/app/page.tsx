
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Leaf, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email().refine(email => email.endsWith('@florachain.com'), {
    message: "Email must be a valid @florachain.com address."
  }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { setAuthInfo } = useAuth();
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

  const onSubmit = (values: LoginValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const role = values.email.split('@')[0];
      setAuthInfo({ email: values.email, role });
      toast({
        title: "Login Successful",
        description: `Welcome, ${role}! Redirecting to your dashboard.`,
      });
      router.push(`/dashboard?role=${role}`);
      setLoading(false);
    }, 1000);
  };

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
            <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
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
                        <Input placeholder="e.g., admin@florachain.com" {...field} />
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
         <p className="px-8 text-center text-sm text-muted-foreground mt-6">
            Log in with a role-based email, like `farmer@florachain.com` or `admin@florachain.com`.
         </p>
      </div>
    </div>
  );
}
