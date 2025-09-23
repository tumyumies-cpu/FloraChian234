
import { Suspense } from 'react';
import type { UserRole, BatchData, AssembledProduct } from '@/lib/data';
import { FarmerDashboard } from '@/components/dashboards/farmer-dashboard';
import { RetailerDashboard } from '@/components/dashboards/retailer-dashboard';
import { ConsumerDashboard } from '@/components/dashboards/consumer-dashboard';
import { BrandDashboard } from '@/components/dashboards/brand-dashboard';
import { SupplierDashboard } from '@/components/dashboards/supplier-dashboard';
import { DistributorDashboard } from '@/components/dashboards/distributor-dashboard';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { ProcessorDashboard } from '@/components/dashboards/processor-dashboard';
import { getProcessorBatches, getAllBatches, getAllAssembledProducts, getUsers } from '@/app/actions';

interface Data {
    processorData: {
        incoming: BatchData[];
        processed: BatchData[];
    };
    allBatches: BatchData[];
    allProducts: AssembledProduct[];
    allUsers: any[];
}

// This is now a Server Component that fetches data
export default async function DashboardPage({ searchParams }: { searchParams: { role?: string } }) {
  const role = (searchParams.role || 'consumer') as UserRole;

  // Fetch all necessary data upfront
  let data: Partial<Data> = {};
  if (role === 'processor' || role === 'admin') {
    data.processorData = await getProcessorBatches();
  }
  if (role === 'admin') {
      data.allBatches = await getAllBatches();
      data.allProducts = await getAllAssembledProducts();
      data.allUsers = await getUsers();
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
        return (
            <ProcessorDashboard 
                incoming={data.processorData?.incoming || []}
                processed={data.processorData?.processed || []}
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
            <AdminDashboard 
                initialBatches={data.allBatches || []}
                initialProducts={data.allProducts || []}
                initialUsers={data.allUsers || []}
            />
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
