
"use client";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StoryGenerator } from '@/components/story-generator';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck, Award, User, CheckCircle, Leaf, FileText, Globe } from 'lucide-react';
import { InteractiveTimeline } from '@/components/interactive-timeline';
import type { BatchData, AssembledProduct, UserRole } from '@/lib/data';
import { ComponentBatchSummary } from '@/components/component-batch-summary';
import { useSearchParams, useParams, notFound } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useDbContext, DbProvider } from '@/context/db-context';

function ProvenancePageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { db, loading: dbLoading } = useDbContext();

  const batchId = params.batchId as string;
  const role = (searchParams.get('role') || 'consumer') as UserRole | string;
  const fromProduct = searchParams.get('fromProduct');

  const [data, setData] = useState<BatchData | AssembledProduct | null>(null);

  useEffect(() => {
    if (dbLoading || !db) return;

    let foundData: BatchData | AssembledProduct | null = null;
    if (batchId.startsWith('PROD-')) {
        foundData = db.products.find(p => p.productId.toUpperCase() === batchId.toUpperCase()) || null;
    } else {
        foundData = db.batches.find(b => b.batchId.toUpperCase() === batchId.toUpperCase()) || null;
    }
    
    if (!foundData) {
      notFound();
    } else {
      setData(foundData);
    }
  }, [batchId, db, dbLoading]);

  if (dbLoading || !data) {
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

  const isProduct = batchId.startsWith('PROD-');
  const storyGeneratorProps = {
    batchId: isProduct ? (data as AssembledProduct).productId : (data as BatchData).batchId,
    farmName: isProduct ? `Assembled Product` : (data as BatchData).farmName,
    location: isProduct ? `From ${ (data as AssembledProduct).componentBatches.length} sources` : (data as BatchData).location,
    harvestDate: isProduct ? (data as AssembledProduct).assembledDate : (data as BatchData).harvestDate,
    processingDetails: isProduct ? 'Multiple ingredients combined to create the final product.' : (data as BatchData).processingDetails,
  };
  
  const imageUrl = data.imageUrl && data.imageUrl.startsWith('https://') 
    ? data.imageUrl 
    : 'https://picsum.photos/seed/1/1200/800';
  const imageHint = isProduct ? (data as AssembledProduct).imageHint : (data as BatchData).imageHint;

  const backLink = fromProduct 
    ? `/provenance/${fromProduct}?role=${role}` 
    : { pathname: '/dashboard', query: { role } };
  
  const isConsumerView = role === 'consumer';

  if (isConsumerView && isProduct && 'brandName' in data) {
    const product = data as AssembledProduct;
    const firstBatch = db?.batches.find(b => b.batchId === product.componentBatches[0]);
    
    let lat = 0, lon = 0;
    if (firstBatch?.location) {
        const match = firstBatch.location.match(/Lat: ([-]?\d+\.\d+), Lon: ([-]?\d+\.\d+)/);
        if (match) {
            lat = parseFloat(match[1]);
            lon = parseFloat(match[2]);
        }
    }

    return (
       <div className="min-h-screen bg-background">
         <section className="relative h-[60vh] min-h-[400px] w-full text-white">
            <Image
                src={imageUrl}
                alt={`Image of ${data.productName}`}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
                priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-primary-foreground">
                        <ShieldCheck className="h-5 w-5" />
                        <span>Verified Authentic</span>
                    </div>
                    <h1 className="mt-4 text-4xl md:text-6xl font-headline font-extrabold tracking-tight drop-shadow-md">{data.productName}</h1>
                    <p className="mt-2 text-lg text-white/80 drop-shadow-sm">by {product.brandName} | ID: <span className="font-mono text-white text-base">{product.productId}</span></p>
                </div>
            </div>
         </section>

         <main className="container mx-auto py-8 sm:py-12 max-w-4xl">
            <div className="space-y-12">
                <section>
                    <StoryGenerator {...storyGeneratorProps} />
                </section>
                
                {firstBatch && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader className="flex-row items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="font-headline">Meet the Farmer</CardTitle>
                        <CardDescription>The source of this product's key ingredient.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="font-semibold text-lg">{firstBatch.farmName}</p>
                      <p className="text-sm text-muted-foreground pt-2">
                        {`Nestled in the heart of ${firstBatch.location.split(',')[1]}, ${firstBatch.farmName} is a community-run farm dedicated to preserving traditional and sustainable Ayurvedic farming practices.`}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex-row items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="font-headline">Farm Location</CardTitle>
                        <CardDescription>{firstBatch.location}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                       {lat && lon ? (
                         <div className="aspect-video rounded-md overflow-hidden border">
                            <iframe 
                                width="100%" 
                                height="100%"
                                loading="lazy" 
                                allowFullScreen
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}&layer=mapnik&marker=${lat},${lon}`}>
                            </iframe>
                         </div>
                       ) : <p className="text-sm text-muted-foreground">Location data not available for map.</p>}
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader className="flex-row items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <Award className="h-6 w-6" />
                      </div>
                       <div>
                        <CardTitle className="font-headline">Sustainability & Quality</CardTitle>
                        <CardDescription>Verified ethical and quality standards.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                        <p className="text-sm">Harvested from a Geo-Fenced Approved Zone.</p>
                      </div>
                       <div className="flex items-center gap-3">
                        <Leaf className="h-5 w-5 text-green-600 shrink-0" />
                        <p className="text-sm">USDA Organic & Fair-Trade Certified.</p>
                      </div>
                       <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary shrink-0" />
                        <Link href={`/document/${firstBatch.batchId}?stage=1`} target="_blank" className="text-sm text-primary underline hover:no-underline">
                          View Harvest Certificate
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}

                <Separator />

                <section className="space-y-8">
                    <h2 className="text-3xl font-headline font-bold text-center">The Journey of Your Product</h2>
                    <InteractiveTimeline 
                      initialEvents={data.timeline} 
                      role={role} 
                      batchId={isProduct ? (data as AssembledProduct).productId : (data as BatchData).batchId}
                      isProduct={isProduct}
                      componentBatches={(data as AssembledProduct).componentBatches}
                    />
                </section>
            </div>
         </main>
       </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-8 sm:py-12 max-w-5xl">
        <div className="space-y-8">
            <div className="mb-4">
              <Button asChild variant="ghost">
                  <Link href={backLink}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                  </Link>
              </Button>
            </div>
            
            {/* Header Section */}
            <section className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
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
                <Card className="overflow-hidden shadow-lg">
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
                <h2 className="text-3xl font-headline font-bold text-center pt-8">Product Journey Log</h2>
                <InteractiveTimeline 
                  initialEvents={data.timeline} 
                  role={role} 
                  batchId={isProduct ? (data as AssembledProduct).productId : (data as BatchData).batchId}
                  isProduct={isProduct}
                  componentBatches={(data as AssembledProduct).componentBatches}
                />
            </section>
        </div>
      </main>
    </div>
  );
}

export default function ProvenancePage() {
    return (
        <DbProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <ProvenancePageContent />
            </Suspense>
        </DbProvider>
    );
}
