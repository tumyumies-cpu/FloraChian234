import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Combine, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function BrandDashboard() {
  return (
    <div className="p-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Combine className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">Assemble New Product</CardTitle>
            <CardDescription>Combine multiple ingredient batches into a final product.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <p className="mb-4 text-sm text-muted-foreground">
          Create a new product SKU by selecting from the available ingredient batches. This will generate a new product record and a unique identifier for the final assembly.
        </p>
        <Button asChild>
          <Link href="/assemble-product?role=brand">
            Assemble Product <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </div>
  );
}
