"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getBatchById } from "@/lib/db";
import { ArrowRight, LoaderCircle, ScanLine } from "lucide-react";

export function VerifyForm() {
  const [batchId, setBatchId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

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

    // In a real app, this would be an API call. Here we call our DB helper.
    const batchExists = await getBatchById(batchId);
    
    if (batchExists) {
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
