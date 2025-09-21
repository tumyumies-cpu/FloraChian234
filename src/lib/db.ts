/**
 * @fileoverview This file simulates a simple in-memory database for the application.
 * In a real-world scenario, this would be replaced with a proper database like Firestore or PostgreSQL.
 */

import type { BatchData, TimelineEvent, AssembledProduct } from './data';
import { initialMockBatchData } from './data';
import { CreateBatchValues } from './schemas';

// Initialize the database with one mock batch.
const batches: BatchData[] = [initialMockBatchData];
const products: AssembledProduct[] = [];
let lastBatchId = 481516;
let lastProductId = 1000;


// === BATCH FUNCTIONS ===

// Function to get all batches. In a real app, this would query the database.
export async function getBatches(): Promise<BatchData[]> {
  // Return a deep copy to prevent mutation of the original data
  return JSON.parse(JSON.stringify(batches));
}

// Function to get a single batch by its ID.
export async function getBatchById(batchId: string): Promise<BatchData | null> {
  const batch = batches.find(b => b.batchId.toUpperCase() === batchId.toUpperCase());
  if (batch) {
    // Return a deep copy
    return JSON.parse(JSON.stringify(batch));
  }
  return null;
}

// Function to add a new batch.
export async function addBatch(data: CreateBatchValues & { photo: string; diagnosis: { isHealthy: boolean, diagnosis: string } | null }): Promise<BatchData> {
  lastBatchId++;
  const newBatchId = `HB-${lastBatchId}`;
  
  const newBatch: BatchData = {
    batchId: newBatchId,
    productName: data.productName,
    farmName: data.farmName,
    location: data.location,
    harvestDate: data.harvestDate.toISOString().split('T')[0], // format as YYYY-MM-DD
    processingDetails: data.processingDetails,
    imageUrl: data.photo,
    imageHint: 'freshly harvested product',
    timeline: [
        {
          id: 1,
          title: 'Harvested',
          status: 'complete',
          date: new Date().toLocaleDateString('en-CA'),
          description: `Hand-picked from ${data.farmName}. Initial notes: ${data.processingDetails}. AI diagnosis: ${data.diagnosis?.diagnosis || 'N/A'}`,
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
          title: 'Packaging',
          status: 'locked',
          icon: 'package',
          allowedRole: 'processor',
          cta: 'Confirm Packaging'
        },
        {
          id: 5,
          title: 'Shipping',
          status: 'locked',
          icon: 'truck',
          allowedRole: 'retailer',
          cta: 'Add Shipping Manifest'
        },
        {
          id: 6,
          title: 'In Store',
          status: 'locked',
          icon: 'store',
          allowedRole: 'retailer',
          cta: 'Confirm Retail Arrival'
        },
         {
          id: 7,
          title: 'Consumer Scan',
          status: 'locked',
          icon: 'scan',
          allowedRole: 'consumer',
          cta: 'View Product Story'
        },
      ]
  };

  batches.unshift(newBatch); // Add to the beginning of the array
  return newBatch;
}

// Function to update a timeline event for a specific batch.
export async function updateTimelineEvent(batchId: string, eventId: number, data: Partial<TimelineEvent>): Promise<BatchData | null> {
    const batch = await getBatchById(batchId);
    if (!batch) {
        return null;
    }

    const eventIndex = batch.timeline.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
        return null;
    }
    
    // Update the event
    batch.timeline[eventIndex] = { ...batch.timeline[eventIndex], ...data, status: 'complete' };

    // Unlock the next event
    if (eventIndex + 1 < batch.timeline.length) {
        batch.timeline[eventIndex + 1].status = 'pending';
    }

    // Find the original batch in the `batches` array and update it
    const originalBatchIndex = batches.findIndex(b => b.batchId.toUpperCase() === batchId.toUpperCase());
    if (originalBatchIndex !== -1) {
        batches[originalBatchIndex] = batch;
    }
    
    return batch;
}


// === PRODUCT FUNCTIONS ===

export async function addAssembledProduct(productName: string, batchIds: string[]): Promise<AssembledProduct> {
    lastProductId++;
    const newProduct: AssembledProduct = {
        productId: `PROD-${lastProductId}`,
        productName: productName,
        assembledDate: new Date().toISOString().split('T')[0],
        componentBatches: batchIds,
    };
    products.unshift(newProduct);
    return newProduct;
}

export async function getAssembledProducts(): Promise<AssembledProduct[]> {
    return JSON.parse(JSON.stringify(products));
}
