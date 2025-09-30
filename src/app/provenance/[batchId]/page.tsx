
import { Suspense } from 'react';
import { ProvenancePageSkeleton, ProvenancePageContent } from './provenance-page-content';

export default function ProvenancePage() {
    return (
      <Suspense fallback={<ProvenancePageSkeleton />} >
        <ProvenancePageContent />
      </Suspense>
    );
}
