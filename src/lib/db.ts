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
    const newProductId = `PROD-${lastProductId}`;
    
    const componentBatchTimelines = await Promise.all(
        batchIds.map(async (id) => {
            const batch = await getBatchById(id);
            return batch?.timeline || [];
        })
    );

    let mergedTimeline: TimelineEvent[] = [];
    componentBatchTimelines.forEach(timeline => {
        mergedTimeline = mergedTimeline.concat(timeline.filter(e => e.status === 'complete'));
    });
    
    mergedTimeline = mergedTimeline.filter((event, index, self) =>
        index === self.findIndex((e) => e.title === event.title && e.date === event.date && e.description === event.description)
    );

    mergedTimeline.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

    const assemblyEvent: TimelineEvent = {
        id: 99, // Arbitrary high ID
        title: 'Formulation & Manufacturing',
        status: 'complete',
        date: new Date().toLocaleDateString('en-CA'),
        description: `Combined from ${batchIds.length} ingredient batches to create ${productName}.`,
        icon: 'combine',
        allowedRole: 'brand',
        cta: 'View Final Product'
    };
    mergedTimeline.push(assemblyEvent);
    
    const finalTimeline = mergedTimeline.concat([
        { id: 100, title: 'Packaging & Branding', status: 'pending', icon: 'package', allowedRole: 'brand', cta: 'Confirm Packaging' },
        { id: 101, title: 'Distribution', status: 'locked', icon: 'truck', allowedRole: 'retailer', cta: 'Add Shipping Manifest' },
        { id: 102, title: 'Retail', status: 'locked', icon: 'store', allowedRole: 'retailer', cta: 'Confirm Retail Arrival' },
        { id: 103, title: 'Consumer Scan', status: 'locked', icon: 'scan', allowedRole: 'consumer', cta: 'View Product Story' }
    ]);


    const newProduct: AssembledProduct = {
        productId: newProductId,
        productName: productName,
        assembledDate: new Date().toISOString().split('T')[0],
        componentBatches: batchIds,
        timeline: finalTimeline
    };

    products.unshift(newProduct);
    return newProduct;
}


export async function getAssembledProductById(productId: string): Promise<AssembledProduct | null> {
    const product = products.find(p => p.productId.toUpperCase() === productId.toUpperCase());
    if (product) {
        // Return a deep copy
        return JSON.parse(JSON.stringify(product));
    }
    return null;
}

export async function getAssembledProducts(): Promise<AssembledProduct[]> {
    return JSON.parse(JSON.stringify(products));
}

// Function to update a timeline event for a specific assembled product.
export async function updateProductTimelineEvent(productId: string, eventId: number, data: Partial<TimelineEvent>): Promise<AssembledProduct | null> {
    const product = await getAssembledProductById(productId);
    if (!product) {
        return null;
    }

    const eventIndex = product.timeline.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
        return null;
    }
    
    // Update the event
    product.timeline[eventIndex] = { ...product.timeline[eventIndex], ...data, status: 'complete' };

    // Unlock the next event
    if (eventIndex + 1 < product.timeline.length) {
        product.timeline[eventIndex + 1].status = 'pending';
    }

    // Find the original product in the `products` array and update it
    const originalProductIndex = products.findIndex(p => p.productId.toUpperCase() === productId.toUpperCase());
    if (originalProductIndex !== -1) {
        products[originalProductIndex] = product;
    }
    
    return product;
}
