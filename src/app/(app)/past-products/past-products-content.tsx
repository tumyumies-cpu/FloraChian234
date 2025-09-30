
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useDbContext } from "@/context/db-context";

export function PastProductsContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'retailer';
  const { db } = useDbContext();
  const products = db?.products || [];

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
                    <h3 className="font-semibold">{product.productName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-muted-foreground">ID: <span className="font-mono">{product.productId}</span></p>
                      <Badge variant="outline">By {product.brandName}</Badge>
                    </div>
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
