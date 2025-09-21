
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, ArrowRight, History } from 'lucide-react';
import Link from 'next/link';

export function DistributorDashboard() {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">Update Product Status</CardTitle>
              <CardDescription>Scan a product to update its shipping and handling data.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <p className="mb-4 text-sm text-muted-foreground">
            As a distributor, you can update a product's journey by confirming its shipment, warehouse location, and transportation details. Start by looking up a product.
          </p>
          <Button asChild>
            <Link href="/verify?role=distributor">
              Look Up a Product <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>

      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <History className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">View Product History</CardTitle>
              <CardDescription>Review and manage all available products.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Access the complete history of all final products to update their status with your distribution and logistics information.
          </p>
          <Button asChild variant="secondary">
            <Link href="/past-products?role=distributor">
              View History <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
