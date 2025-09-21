import { UserRoleSwitcher } from '@/components/user-role-switcher';
import { FarmerDashboard } from '@/components/dashboards/farmer-dashboard';
import { ProcessorDashboard } from '@/components/dashboards/processor-dashboard';
import { RetailerDashboard } from '@/components/dashboards/retailer-dashboard';
import { ConsumerDashboard } from '@/components/dashboards/consumer-dashboard';

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
      case 'consumer':
      default:
        return <ConsumerDashboard />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight">Welcome to FloraChain</h1>
          <p className="text-muted-foreground">Your dashboard for transparent product provenance.</p>
        </div>
        <UserRoleSwitcher currentRole={role} />
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        {renderDashboard()}
      </div>
    </div>
  );
}
