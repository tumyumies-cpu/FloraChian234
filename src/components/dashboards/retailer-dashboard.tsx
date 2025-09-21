import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Store, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RetailerDashboard() {
  return (
    <div className="p-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Store className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">Manage Inventory</CardTitle>
            <CardDescription>Scan a product to update its retail status.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <p className="mb-4 text-sm text-muted-foreground">
          As a retailer, your role is to update a product's journey when it arrives at your store and is ready for sale. Start by looking up a product.
        </p>
        <Button asChild>
          <Link href="/verify?role=retailer">
            Look Up a Product <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </div>
  );
}
