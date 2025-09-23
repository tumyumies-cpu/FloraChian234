"use client";
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { getBatchById, getAssembledProductById } from '@/lib/db';
import { StoryGenerator } from '@/components/story-generator';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { InteractiveTimeline } from '@/components/interactive-timeline';
import type { BatchData, AssembledProduct, UserRole } from '@/lib/data';
import { ComponentBatchSummary } from '@/components/component-batch-summary';
import { useSearchParams, useParams, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProvenancePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const batchId = params.batchId as string;
  const role = (searchParams.get('role') || 'consumer') as UserRole | string;
  const fromProduct = searchParams.get('fromProduct');

  const [data, setData] = useState<BatchData | AssembledProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const isProduct = batchId.startsWith('PROD-');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let fetchedData: BatchData | AssembledProduct | null = null;
      if (isProduct) {
        fetchedData = await getAssembledProductById(batchId);
      } else {
        fetchedData = await getBatchById(batchId);
      }
      
      if (!fetchedData) {
        notFound();
      } else {
        setData(fetchedData);
      }
      setLoading(false);
    }
    if (batchId) {
      fetchData();
    }
  }, [batchId, isProduct]);

  if (loading || !data) {
    return (
      <div className="container mx-auto max-w-5xl py-8 sm:py-12 space-y-8">
        <Skeleton className="h-8 w-24" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
                <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-32" />
                </div>
            </div>
            <Skeleton className="aspect-video w-full" />
        </div>
         <Separator />
         <Skeleton className="h-48 w-full" />
         <Separator />
         <div className="space-y-6">
            <Skeleton className="h-10 w-1/3 mx-auto" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
         </div>
      </div>
    );
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
  
  const isConsumerView = role === 'consumer';


  if (isConsumerView) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto max-w-4xl py-8 sm:py-12">
            <div className="space-y-12">
                <section className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        <ShieldCheck className="h-5 w-5" />
                        <span>Verified Authentic</span>
                    </div>
                    <h1 className="mt-4 text-4xl md:text-5xl font-headline font-extrabold tracking-tight">{data.productName}</h1>
                    <p className="mt-2 text-lg text-muted-foreground">ID: <span className="font-mono text-foreground text-base">{isProduct ? (data as AssembledProduct).productId : (data as BatchData).batchId}</span></p>
                </section>

                <Card className="overflow-hidden shadow-lg">
                    <CardContent className="p-0">
                         <Image
                            src={imageUrl}
                            alt={`Image of ${data.productName}`}
                            width={1200}
                            height={800}
                            className="object-cover w-full h-full"
                            data-ai-hint={imageHint}
                            priority
                        />
                    </CardContent>
                </Card>

                <Separator />
                
                <section>
                    <StoryGenerator {...storyGeneratorProps} />
                </section>
                
                <section className="space-y-6">
                    <h2 className="text-3xl font-headline font-bold text-center">The Journey of Your Product</h2>
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
    )
  }

  // Default view for other roles
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-5xl py-8 sm:py-12">
        <div className="space-y-8">
            <div className="mb-8">
                <Button asChild variant="ghost">
                    <Link href={backLink}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>
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
