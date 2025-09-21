import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RetailerDashboard() {
  return (
    <>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ScanLine className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">Manage Inventory</CardTitle>
            <CardDescription>Scan a batch to update shipping or retail status.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          As a retailer, you can update a product's journey by confirming its shipment and arrival at your store. Start by looking up a batch.
        </p>
        <Button asChild>
          <Link href="/verify?role=retailer">
            Look Up a Batch <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </>
  );
}
