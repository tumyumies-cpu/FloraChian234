
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { UserRole, BatchData, AssembledProduct } from '@/lib/data';
import { FarmerDashboard } from '@/components/dashboards/farmer-dashboard';
import { RetailerDashboard } from '@/components/dashboards/retailer-dashboard';
import { ConsumerDashboard } from '@/components/dashboards/consumer-dashboard';
import { BrandDashboard } from '@/components/dashboards/brand-dashboard';
import { SupplierDashboard } from '@/components/dashboards/supplier-dashboard';
import { DistributorDashboard } from '@/components/dashboards/distributor-dashboard';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { ProcessorDashboard } from '@/components/dashboards/processor-dashboard';
import { useDbContext } from '@/context/db-context';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-1/3" />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') || 'consumer') as UserRole;
  const { db, loading } = useDbContext();
  
  if (loading || !db) {
    return <DashboardSkeleton />;
  }

  const { batches, products, users } = db;
  
  // Data processing specific to roles
  const processorData = {
    incoming: batches.filter(b => b.timeline.some(e => e.id === 2 && e.status === 'pending')),
    processed: batches.filter(b => b.timeline.some(e => e.id === 3 && e.status === 'complete')),
  };
  
  const getWelcomeMessage = () => {
    switch (role) {
      case 'farmer': return 'Farmer Dashboard';
      case 'processor': return 'Processor Dashboard';
      case 'supplier': return 'Supplier/Trader Dashboard';
      case 'brand': return 'Manufacturer Dashboard';
      case 'distributor': return 'Distributor Dashboard';
      case 'retailer': return 'Retailer Dashboard';
      case 'admin': return 'Administrator Dashboard';
      default: return 'Welcome to FloraChain';
    }
  }

  const renderDashboard = () => {
    switch (role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'processor':
        return <ProcessorDashboard incoming={processorData.incoming} processed={processorData.processed} />;
      case 'supplier':
        return <SupplierDashboard />;
      case 'brand':
        return <BrandDashboard />;
      case 'distributor':
        return <DistributorDashboard />;
      case 'retailer':
        return <RetailerDashboard />;
      case 'admin':
        return <AdminDashboard initialBatches={batches} initialProducts={products} initialUsers={users} />;
      case 'consumer':
      default:
        return <ConsumerDashboard />;
    }
  };

  return (
    <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">{getWelcomeMessage()}</h1>
            <p className="text-muted-foreground">Your hub for transparent product provenance.</p>
            </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            {renderDashboard()}
        </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
