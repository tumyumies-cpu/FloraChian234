import type { LucideIcon } from 'lucide-react';
import { Sprout, Factory, FlaskConical, Package, Truck, Store, Scan, Combine } from 'lucide-react';

export type EventStatus = 'complete' | 'pending' | 'locked';
export type UserRole = 'farmer' | 'processor' | 'retailer' | 'consumer' | 'admin' | 'brand';

export type IconName = 'sprout' | 'factory' | 'flask' | 'package' | 'truck' | 'store' | 'scan' | 'combine';

export const iconMap: Record<IconName, LucideIcon> = {
  sprout: Sprout,
  factory: Factory,
  flask: FlaskConical,
  package: Package,
  truck: Truck,
  store: Store,
  scan: Scan,
  combine: Combine,
};

export interface TimelineEvent {
  id: number;
  title: string;
  status: EventStatus;
  date?: string;
  description?: string;
  icon: IconName;
  allowedRole: UserRole;
  cta: string;
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

export interface AssembledProduct {
  productId: string;
  productName: string;
  assembledDate: string;
  componentBatches: string[]; // Array of batchIds
  timeline: TimelineEvent[];
}

export const initialMockBatchData: BatchData = {
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
      status: 'complete',
      date: '2023-10-26',
      description: 'Hand-picked from Plot 3B at Verdant Valley Farms.',
      icon: 'sprout',
      allowedRole: 'farmer',
      cta: 'Update Harvest Info'
    },
    {
      id: 2,
      title: 'Processing',
      status: 'pending',
      icon: 'factory',
      allowedRole: 'processor',
      cta: 'Add Processing Details'
    },
    {
      id: 3,
      title: 'Lab Testing',
      status: 'locked',
      icon: 'flask',
      allowedRole: 'processor',
      cta: 'Upload Lab Results'
    },
     {
      id: 4,
      title: 'Ready for Assembly',
      status: 'locked',
      icon: 'combine',
      allowedRole: 'brand',
      cta: 'Select for Product'
    }
  ],
};
