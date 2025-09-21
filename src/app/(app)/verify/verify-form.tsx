
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

export function VerifyForm() {
  const [batchId, setBatchId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId) {
      toast({
        title: "Error",
        description: "Please enter a batch ID.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    const result = await verifyBatchId(batchId);
    
    if (result.success) {
      const role = searchParams.get('role') || 'consumer';
      router.push(`/provenance/${batchId.toUpperCase()}?role=${role}`);
    } else {
      toast({
        title: "Batch Not Found",
        description: `The batch ID "${batchId}" could not be found. Please check the ID and try again.`,
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
        <CardTitle className="font-headline">Enter Batch ID</CardTitle>
        <CardDescription>
          You can typically find the batch ID printed near the QR code on the product packaging.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              placeholder="e.g., HB-481516"
              className="text-lg h-12"
              aria-label="Batch ID"
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
