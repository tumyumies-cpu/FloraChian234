
import { Suspense } from 'react';
import { ReportSkeleton, PrintableReport } from './printable-report';

export default function DocumentPage() {
  return (
      <Suspense fallback={<ReportSkeleton />} >
        <PrintableReport />
      </Suspense>
  );
}
