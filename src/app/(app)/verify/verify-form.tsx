
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, LoaderCircle, PenSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserRole } from "@/lib/data";
import { useDbContext } from "@/context/db-context";

interface VerifyFormProps {
  role: UserRole | string;
  scannedId: string | null;
}

export function VerifyForm({ role, scannedId }: VerifyFormProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [hasMounted, setHasMounted] = useState(false);
  const { verifyId } = useDbContext();

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  useEffect(() => {
    if (scannedId) {
      setId(scannedId);
      // Automatically submit the form when a QR code is scanned
      handleVerify(scannedId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannedId]);

  const isProductRole = ['consumer', 'retailer', 'distributor'].includes(role as string);
  const idType = isProductRole ? "Product" : "Batch";
  const placeholder = isProductRole ? "e.g., PROD-1001" : "e.g., HB-481516";
  const description = `You can typically find the ${idType} ID printed near the QR code on the product packaging.`;


  const handleVerify = async (idToVerify: string) => {
    if (!idToVerify) {
      toast({
        title: "Error",
        description: `Please enter a ${idType} ID.`,
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    const exists = verifyId(idToVerify, role);
    
    if (exists) {
      router.push(`/provenance/${idToVerify.toUpperCase()}?role=${role}`);
    } else {
      toast({
        title: `${idType} Not Found`,
        description: `The ${idType} ID "${idToVerify}" could not be found or is not yet available for tracking in your region. Please check the ID and try again.`,
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleVerify(id);
  }

  if (!hasMounted) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-12 flex-grow" />
                <Skeleton className="h-11 w-full" />
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <PenSquare className="h-6 w-6" />
            </div>
            <div>
                <CardTitle className="font-headline">Or Enter ID Manually</CardTitle>
                <CardDescription>
                {description}
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={placeholder}
              className="text-lg h-12"
              aria-label={`${idType} ID`}
            />
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
