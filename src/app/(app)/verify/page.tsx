
"use client";
import { VerifyForm } from "./verify-form";
import { Suspense, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { QrScanner } from "@/components/qr-scanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'consumer';
  const [scannedId, setScannedId] = useState<string | null>(null);

  const isProductRole = ['consumer', 'retailer', 'distributor'].includes(role as string);
  const idType = isProductRole ? "Product" : "Batch";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Verify Product Provenance</h1>
        <p className="text-muted-foreground">
          Scan a QR code or enter an ID below to look up a product's history.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
           <CardHeader>
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ScanLine className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle className="font-headline">Scan QR Code</CardTitle>
                    <CardDescription>Point the QR code at your camera.</CardDescription>
                </div>
            </div>
           </CardHeader>
           <CardContent>
             <QrScanner onScan={(id) => setScannedId(id)} />
           </CardContent>
        </Card>
        <VerifyForm role={role} scannedId={scannedId} />
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
