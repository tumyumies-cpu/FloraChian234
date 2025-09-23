
"use client";
import { FarmerDashboard } from '@/components/dashboards/farmer-dashboard';
import { RetailerDashboard } from '@/components/dashboards/retailer-dashboard';
import { ConsumerDashboard } from '@/components/dashboards/consumer-dashboard';
import { BrandDashboard } from '@/components/dashboards/brand-dashboard';
import { SupplierDashboard } from '@/components/dashboards/supplier-dashboard';
import { DistributorDashboard } from '@/components/dashboards/distributor-dashboard';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { UserRole } from '@/lib/data';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { ProcessorDashboard } from '@/components/dashboards/processor-dashboard';

function DashboardContent() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') || 'consumer') as UserRole;

  const renderDashboard = () => {
    switch (role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'processor':
        return (
          <Suspense fallback={<div>Loading dashboard data...</div>}>
            <ProcessorDashboard />
          </Suspense>
        );
      case 'supplier':
        return <SupplierDashboard />;
      case 'brand':
        return <BrandDashboard />;
      case 'distributor':
        return <DistributorDashboard />;
      case 'retailer':
        return <RetailerDashboard />;
      case 'admin':
        return (
          <Suspense fallback={<div>Loading dashboard data...</div>}>
            <AdminDashboard />
          </Suspense>
        );
      case 'consumer':
      default:
        return <ConsumerDashboard />;
    }
  };

  const getWelcomeMessage = () => {
    switch (role) {
      case 'farmer':
        return 'Farmer Dashboard';
      case 'processor':
        return 'Processor Dashboard';
      case 'supplier':
        return 'Supplier/Trader Dashboard';
      case 'brand':
        return 'Manufacturer Dashboard';
      case 'distributor':
        return 'Distributor Dashboard';
      case 'retailer':
        return 'Retailer Dashboard';
      case 'admin':
        return 'Administrator Dashboard';
      default:
        return 'Welcome to FloraChain';
    }
  }

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
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
