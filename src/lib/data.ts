import { Sprout, Factory, FlaskConical, Package, Truck, Leaf } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: LucideIcon;
}

export interface BatchData {
  batchId: string;
  productName: string;
  farmName: string;
  location: string;
  harvestDate: string;
  processingDetails: string;
  imageUrl: string;
  imageHint: string;
  timeline: TimelineEvent[];
}

export const mockBatchData: BatchData = {
  batchId: 'HB-481516',
  productName: 'Organic Basil',
  farmName: 'Verdant Valley Farms',
  location: 'Sonoma County, California',
  harvestDate: '2023-10-26',
  processingDetails: 'The basil was hand-picked at dawn, immediately cooled, and transported to our processing facility. It was then triple-washed in spring water and gently air-dried to preserve its aromatic oils. The final product was vacuum-sealed for freshness.',
  imageUrl: 'https://picsum.photos/seed/basil/1200/800',
  imageHint: 'fresh basil',
  timeline: [
    {
      id: 1,
      title: 'Harvested',
      date: '2023-10-26',
      description: 'Hand-picked from Plot 3B at Verdant Valley Farms.',
      icon: Sprout,
    },
    {
      id: 2,
      title: 'Processing',
      date: '2023-10-27',
      description: 'Washed, dried, and sorted at our local facility.',
      icon: Factory,
    },
    {
      id: 3,
      title: 'Lab Tested',
      date: '2023-10-28',
      description: 'Passed all quality and purity tests at Flora Labs. Report ID: FL-9876.',
      icon: FlaskConical,
    },
    {
      id: 4,
      title: 'Packaged',
      date: '2023-10-29',
      description: 'Sealed for freshness and prepared for distribution.',
      icon: Package,
    },
    {
      id: 5,
      title: 'Shipped',
      date: '2023-10-30',
      description: 'En route to our partner retailers.',
      icon: Truck,
    },
  ],
};

export function getBatchData(batchId: string): BatchData | null {
  if (batchId === mockBatchData.batchId) {
    return mockBatchData;
  }
  return null;
}
