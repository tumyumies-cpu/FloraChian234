
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAssembledProducts } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function PastProductsPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role = searchParams.role || 'retailer';
  const products = await getAssembledProducts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Assembled Products</h1>
        <p className="text-muted-foreground">A list of all final products registered on the platform.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product History</CardTitle>
          <CardDescription>Click on a product to view its full provenance details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.productId} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{product.productName} - <span className="font-mono text-muted-foreground">{product.productId}</span></h3>
                    <p className="text-sm text-muted-foreground">Assembled on {new Date(product.assembledDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/provenance/${product.productId}?role=${role}`}>View Details</Link>
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground p-8">
                No products have been assembled yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
