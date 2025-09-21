import type { LucideIcon } from 'lucide-react';
import { Sprout, Factory, FlaskConical, Package, Truck, Store, Scan, Combine, Handshake, Warehouse } from 'lucide-react';

export type EventStatus = 'complete' | 'pending' | 'locked';
export type UserRole = 'farmer' | 'processor' | 'supplier' | 'brand' | 'distributor' | 'retailer' | 'consumer' | 'admin';

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
  consumerDescription?: string;
  formData?: any;
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
