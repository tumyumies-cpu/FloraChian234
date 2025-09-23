
import { Suspense } from 'react';
import type { UserRole, BatchData } from '@/lib/data';
import { FarmerDashboard } from '@/components/dashboards/farmer-dashboard';
import { RetailerDashboard } from '@/components/dashboards/retailer-dashboard';
import { ConsumerDashboard } from '@/components/dashboards/consumer-dashboard';
import { BrandDashboard } from '@/components/dashboards/brand-dashboard';
import { SupplierDashboard } from '@/components/dashboards/supplier-dashboard';
import { DistributorDashboard } from '@/components/dashboards/distributor-dashboard';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { ProcessorDashboard } from '@/components/dashboards/processor-dashboard';
import { getProcessorBatches } from '@/app/actions';

interface ProcessorData {
    incoming: BatchData[];
    processed: BatchData[];
}

// This is now a Server Component that fetches data
export default async function DashboardPage({ searchParams }: { searchParams: { role?: string } }) {
  const role = (searchParams.role || 'consumer') as UserRole;

  let processorData: ProcessorData | null = null;
  if (role === 'processor') {
    processorData = await getProcessorBatches();
  }
  
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

  const renderDashboard = () => {
    switch (role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'processor':
        // We pass the server-fetched data as props to the client component
        return (
            <ProcessorDashboard 
                incoming={processorData?.incoming || []}
                processed={processorData?.processed || []}
            />
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

  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
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
    </Suspense>
  );
}

