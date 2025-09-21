import { FarmerDashboard } from '@/components/dashboards/farmer-dashboard';
import { ProcessorDashboard } from '@/components/dashboards/processor-dashboard';
import { RetailerDashboard } from '@/components/dashboards/retailer-dashboard';
import { ConsumerDashboard } from '@/components/dashboards/consumer-dashboard';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { BrandDashboard } from '@/components/dashboards/brand-dashboard';

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role = searchParams.role || 'consumer';

  const renderDashboard = () => {
    switch (role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'processor':
        return <ProcessorDashboard />;
      case 'retailer':
        return <RetailerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'brand':
        return <BrandDashboard />;
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
      case 'retailer':
        return 'Retailer Dashboard';
      case 'admin':
        return 'Administrator Dashboard';
      case 'brand':
        return 'Brand Dashboard';
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
