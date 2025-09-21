import type { LucideIcon } from 'lucide-react';
import { Sprout, Factory, FlaskConical, Package, Truck, Store, Scan, Combine, Handshake, Warehouse } from 'lucide-react';

export type EventStatus = 'complete' | 'pending' | 'locked';
export type UserRole = 'farmer' | 'processor' | 'supplier' | 'brand' | 'retailer' | 'consumer' | 'admin';

export type IconName = 'sprout' | 'factory' | 'flask' | 'package' | 'truck' | 'store' | 'scan' | 'combine' | 'handshake' | 'warehouse';

export const iconMap: Record<IconName, LucideIcon> = {
  sprout: Sprout,
  factory: Factory,
  flask: FlaskConical,
  package: Package,
  truck: Truck,
  store: Store,
  scan: Scan,
  combine: Combine,
  handshake: Handshake,
  warehouse: Warehouse,
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
  productName: 'Organic Ashwagandha Root',
  farmName: 'Himalayan Herbal Farms',
  location: 'Uttarakhand, India',
  harvestDate: '2023-10-26',
  processingDetails: 'The roots were harvested during the autumn season, carefully washed, and sun-dried for optimal potency.',
  imageUrl: 'https://picsum.photos/seed/ashwagandha/1200/800',
  imageHint: 'dried roots',
  timeline: [
    {
      id: 1,
      title: 'Harvested',
      status: 'complete',
      date: '2023-10-26',
      description: 'Hand-harvested from certified organic fields.',
      icon: 'sprout',
      allowedRole: 'farmer',
      cta: 'Update Harvest Info'
    },
    {
      id: 2,
      title: 'Local Processing',
      status: 'pending',
      icon: 'factory',
      allowedRole: 'processor',
      cta: 'Add Processing Details'
    },
    {
      id: 3,
      title: 'Supplier Acquisition',
      status: 'locked',
      icon: 'handshake',
      allowedRole: 'supplier',
      cta: 'Confirm Acquisition'
    },
    {
      id: 4,
      title: 'Ready for Formulation',
      status: 'locked',
      icon: 'combine',
      allowedRole: 'brand',
      cta: 'Select for Product'
    }
  ],
};
