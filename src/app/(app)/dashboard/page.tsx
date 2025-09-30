
import { Suspense } from 'react';
import { DashboardSkeleton, DashboardContent } from './dashboard-content';


export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />} >
      <DashboardContent />
    </Suspense>
  );
}
