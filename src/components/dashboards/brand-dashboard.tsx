import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Combine, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

export function BrandDashboard() {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Combine className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">Formulate New Product</CardTitle>
              <CardDescription>Combine ingredient batches into a final product.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Create a new product SKU by selecting from the available ingredient batches. This will generate a new product record and a unique identifier.
          </p>
          <Button asChild>
            <Link href="/assemble-product?role=brand">
              Assemble Product <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
      <div className="space-y-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-headline">View Assembled Products</CardTitle>
              <CardDescription>Review products you have already formulated.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Access the complete history of all products you've created, view their current status, and see their full provenance journey.
          </p>
          <Button asChild variant="secondary">
            <Link href="/past-products?role=brand">
              View Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
