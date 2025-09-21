import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { getBatchById, getAssembledProductById } from '@/lib/db';
import { StoryGenerator } from '@/components/story-generator';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf } from 'lucide-react';
import { InteractiveTimeline } from '@/components/interactive-timeline';
import type { BatchData, AssembledProduct } from '@/lib/data';
import { ComponentBatchSummary } from '@/components/component-batch-summary';

export default async function ProvenancePage({ 
  params,
  searchParams,
}: { 
  params: { batchId: string };
  searchParams: { role?: string; fromProduct?: string };
}) {
  const { batchId } = params;
  const role = searchParams.role || 'consumer';
  const fromProduct = searchParams.fromProduct;

  let data: BatchData | AssembledProduct | null = null;
  const isProduct = batchId.startsWith('PROD-');

  if (isProduct) {
    data = await getAssembledProductById(batchId);
  } else {
    data = await getBatchById(batchId);
  }

  if (!data) {
    notFound();
  }

  const storyGeneratorProps = {
    batchId: isProduct ? (data as AssembledProduct).productId : (data as BatchData).batchId,
    farmName: isProduct ? `Assembled Product` : (data as BatchData).farmName,
    location: isProduct ? `From ${ (data as AssembledProduct).componentBatches.length} sources` : (data as BatchData).location,
    harvestDate: isProduct ? (data as AssembledProduct).assembledDate : (data as BatchData).harvestDate,
    processingDetails: isProduct ? 'Multiple ingredients combined to create the final product.' : (data as BatchData).processingDetails,
  };
  
  const imageUrl = isProduct ? 'https://picsum.photos/seed/product/1200/800' : (data as BatchData).imageUrl;
  const imageHint = isProduct ? 'final product bottle' : (data as BatchData).imageHint;

  const backLink = fromProduct 
    ? `/provenance/${fromProduct}?role=${role}` 
    : { pathname: '/dashboard', query: { role } };


  return (
    <div className="min-h-screen bg-background">
       <header className="flex items-center justify-between p-4 border-b">
         <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Leaf className="h-6 w-6" />
            <span className="font-headline text-lg font-semibold">FloraChain</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href={backLink}><ArrowLeft className="mr-2 h-4 w-4" />Back</Link>
          </Button>
       </header>

      <main className="container mx-auto max-w-5xl py-8 sm:py-12">
        <div className="space-y-12">
          {/* Header Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4">
              <p className="font-semibold text-primary">PROVENANCE REPORT</p>
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight">{data.productName}</h1>
              <p className="text-lg text-muted-foreground">ID: <span className="font-mono text-foreground">{isProduct ? (data as AssembledProduct).productId : (data as BatchData).batchId}</span></p>
              {!isProduct && (
                 <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    <div className="text-sm"><span className="font-semibold">Farm:</span> {(data as BatchData).farmName}</div>
                    <div className="text-sm"><span className="font-semibold">Location:</span> {(data as BatchData).location}</div>
                    <div className="text-sm"><span className="font-semibold">Harvested:</span> {(data as BatchData).harvestDate}</div>
                </div>
              )}
               {isProduct && (
                 <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    <div className="text-sm"><span className="font-semibold">Assembled on:</span> {(data as AssembledProduct).assembledDate}</div>
                    <div className="text-sm"><span className="font-semibold">Ingredients:</span> {(data as AssembledProduct).componentBatches.length} batches</div>
                </div>
              )}
            </div>
            <Card className="overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Image of ${data.productName}`}
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full"
                  data-ai-hint={imageHint}
                />
            </Card>
          </section>

          <Separator />
          
          {/* AI Story Section */}
          <section>
            <StoryGenerator {...storyGeneratorProps} />
          </section>
          
          {/* Ingredient Summary Section (for products only) */}
          {isProduct && role !== 'distributor' && role !== 'retailer' && (
             <section>
                <ComponentBatchSummary 
                    batchIds={(data as AssembledProduct).componentBatches} 
                    productId={batchId}
                    role={role}
                />
             </section>
          )}


          {/* Timeline Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-center">Product Journey</h2>
            <InteractiveTimeline 
              initialEvents={data.timeline} 
              role={role} 
              batchId={isProduct ? (data as AssembledProduct).productId : (data as BatchData).batchId}
              isProduct={isProduct}
            />
          </section>

        </div>
      </main>
    </div>
  );
}
