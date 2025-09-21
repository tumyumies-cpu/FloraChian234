
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifyBatchId } from "@/app/actions";
import { ArrowRight, LoaderCircle, ScanLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserRole } from "@/lib/data";

interface VerifyFormProps {
  role: UserRole | string;
}

export function VerifyForm({ role }: VerifyFormProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isProductRole = role === 'consumer' || role === 'retailer';
  const idType = isProductRole ? "Product" : "Batch";
  const placeholder = isProductRole ? "e.g., PROD-1001" : "e.g., HB-481516";
  const description = `You can typically find the ${idType} ID printed near the QR code on the product packaging.`;


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      toast({
        title: "Error",
        description: `Please enter a ${idType} ID.`,
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    const result = await verifyBatchId(id);
    
    if (result.success) {
      router.push(`/provenance/${id.toUpperCase()}?role=${role}`);
    } else {
      toast({
        title: `${idType} Not Found`,
        description: `The ${idType} ID "${id}" could not be found. Please check the ID and try again.`,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (!hasMounted) {
    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Skeleton className="h-12 flex-grow" />
                    <Skeleton className="h-12 w-12" />
                </div>
                <Skeleton className="h-11 w-full" />
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline">Enter {idType} ID</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={placeholder}
              className="text-lg h-12"
              aria-label={`${idType} ID`}
            />
            <Button size="icon" variant="outline" className="h-12 w-12 shrink-0" type="button" aria-label="Scan QR Code">
              <ScanLine className="h-6 w-6" />
            </Button>
          </div>
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                View Provenance <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
