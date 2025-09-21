
/**
 * @fileoverview This file simulates a simple JSON file-based database for the application.
 */
import fs from 'fs/promises';
import path from 'path';

import type { BatchData, TimelineEvent, AssembledProduct } from './data';
import { CreateBatchValues } from './schemas';

// Path to the JSON file that acts as our database
const dbPath = path.join(process.cwd(), 'src', 'lib', 'database.json');

// Type for the entire database structure
type Database = {
  batches: BatchData[];
  products: AssembledProduct[];
};

// Function to read the entire database from the JSON file.
async function readDb(): Promise<Database> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is invalid, return a default structure
    console.error("Could not read database file:", error);
    return { batches: [], products: [] };
  }
}

// Function to write the entire database to the JSON file.
async function writeDb(db: Database): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
}


// === BATCH FUNCTIONS ===

// Function to get all batches.
export async function getBatches(): Promise<BatchData[]> {
  const db = await readDb();
  return db.batches;
}

// Function to get a single batch by its ID.
export async function getBatchById(batchId: string): Promise<BatchData | null> {
  const db = await readDb();
  const batch = db.batches.find(b => b.batchId.toUpperCase() === batchId.toUpperCase());
  return batch || null;
}

// Function to add a new batch.
export async function addBatch(data: CreateBatchValues & { photo: string; diagnosis: { isHealthy: boolean, diagnosis: string } | null }): Promise<BatchData> {
  const db = await readDb();
  
  // Generate a new unique ID
  const lastIdNum = db.batches.reduce((max, b) => {
    const num = parseInt(b.batchId.split('-')[1]);
    return num > max ? num : max;
  }, 481515); // Start number just below the first one
  const newBatchId = `HB-${lastIdNum + 1}`;
  
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
            title: 'Cultivation & Harvest', 
            status: 'complete', 
            date: new Date().toLocaleDateString('en-CA'), 
            description: `Hand-picked from ${data.farmName}. Initial notes: ${data.processingDetails}. AI diagnosis: ${data.diagnosis?.diagnosis || 'N/A'}`,
            consumerDescription: `Origin: ${data.location}\nCultivation: Organic Certified\nHarvest Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
            icon: 'sprout', 
            allowedRole: 'farmer', 
            cta: 'Update Harvest Info' 
        },
        { id: 2, title: 'Local Processing', status: 'pending', icon: 'factory', allowedRole: 'processor', cta: 'Add Processing Details', consumerDescription: `The raw herb is carefully cleaned, dried, and prepared for the next stage of its journey.` },
        { id: 3, title: 'Supplier Receiving', status: 'locked', icon: 'warehouse', allowedRole: 'supplier', cta: 'Confirm Receipt', consumerDescription: 'Batch acquired by a verified supplier, ensuring quality and traceability.' },
        { id: 5, title: 'Supplier Processing & Dispatch', status: 'locked', icon: 'handshake', allowedRole: 'supplier', cta: 'Add Dispatch Details', consumerDescription: 'The ingredient is inspected, certified, and prepared for shipment to the manufacturer.' },
        { id: 6, title: 'Ready for Formulation', status: 'locked', icon: 'combine', allowedRole: 'brand', cta: 'Select for Product', consumerDescription: 'The ingredient is now ready to be used in a final product formulation.' },
    ]
  };

  db.batches.unshift(newBatch);
  await writeDb(db);
  return newBatch;
}

// Function to update a timeline event for a specific batch.
export async function updateTimelineEvent(batchId: string, eventId: number, data: Partial<TimelineEvent>): Promise<BatchData | null> {
    const db = await readDb();
    const batchIndex = db.batches.findIndex(b => b.batchId.toUpperCase() === batchId.toUpperCase());
    
    if (batchIndex === -1) return null;

    const eventIndex = db.batches[batchIndex].timeline.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return null;
    
    // Update the event
    db.batches[batchIndex].timeline[eventIndex] = { ...db.batches[batchIndex].timeline[eventIndex], ...data, status: 'complete' };

    // Unlock the next event if it exists
    const nextEvent = db.batches[batchIndex].timeline.find(e => e.id > eventId);
    if (nextEvent) {
      const nextEventIndex = db.batches[batchIndex].timeline.findIndex(e => e.id === nextEvent.id);
      if (db.batches[batchIndex].timeline[nextEventIndex].status === 'locked') {
        db.batches[batchIndex].timeline[nextEventIndex].status = 'pending';
      }
    }
    
    await writeDb(db);
    return db.batches[batchIndex];
}


// === PRODUCT FUNCTIONS ===

export async function addAssembledProduct(productName: string, batchIds: string[]): Promise<AssembledProduct> {
    const db = await readDb();

    const lastIdNum = db.products.reduce((max, p) => {
        const num = parseInt(p.productId.split('-')[1]);
        return num > max ? num : max;
    }, 1000);
    const newProductId = `PROD-${lastIdNum + 1}`;
    
    const newProduct: AssembledProduct = {
        productId: newProductId,
        productName: productName,
        assembledDate: new Date().toISOString().split('T')[0],
        componentBatches: batchIds,
        timeline: [
            { id: 99, title: 'Formulation & Manufacturing', status: 'complete', date: new Date().toLocaleDateString('en-CA'), description: `Combined from ${batchIds.length} ingredient batches to create ${productName}.`, consumerDescription: `Based on classical formulations, this product combines high-quality ingredients into a final blend.`, icon: 'combine', allowedRole: 'brand', cta: 'View Final Product' },
            { id: 100, title: 'Manufacturing & Packaging', status: 'pending', icon: 'package', allowedRole: 'brand', cta: 'Add Manufacturing Data', consumerDescription: 'The product is manufactured and packaged in a GMP-certified facility, ensuring safety and quality.' },
            { id: 101, title: 'Distribution & Logistics', status: 'locked', icon: 'truck', allowedRole: 'distributor', cta: 'Add Shipping Manifest', consumerDescription: `Dispatched to verified distributors, ensuring the product is handled carefully in transit.` },
            { id: 102, title: 'Retailer Receiving', status: 'locked', icon: 'warehouse', allowedRole: 'retailer', cta: 'Confirm Receipt', consumerDescription: 'Product received by a verified retail partner.'},
            { id: 103, title: 'In-Store Provenance', status: 'locked', icon: 'store', allowedRole: 'retailer', cta: 'Confirm Retail Arrival', consumerDescription: 'Product is available for purchase at your trusted local or online store.' },
            { id: 104, title: 'Consumer Authenticity Scan', status: 'locked', icon: 'scan', allowedRole: 'consumer', cta: 'View Product Story', consumerDescription: `You have scanned a verified, authentic product. Thank you for choosing FloraChain.` }
        ]
    };

    db.products.unshift(newProduct);
    await writeDb(db);
    return newProduct;
}


export async function getAssembledProductById(productId: string): Promise<AssembledProduct | null> {
    const db = await readDb();
    const product = db.products.find(p => p.productId.toUpperCase() === productId.toUpperCase());
    
    if (product) {
      const componentBatchData = await Promise.all(product.componentBatches.map(id => getBatchById(id)));
      const validBatches = componentBatchData.filter(b => b !== null) as BatchData[];
      
      const ingredientTimeline: TimelineEvent[] = validBatches.flatMap(b => {
          return b.timeline.map(e => ({ ...e, batchId: b.batchId }));
      });

      // De-duplicate ingredient steps, showing only the first occurrence for context
      const uniqueIngredientSteps = Array.from(new Map(ingredientTimeline.map(e => [e.id, e])).values());

      product.timeline = [...uniqueIngredientSteps, ...product.timeline.filter(e => e.id >= 99)];
    }
    
    return product || null;
}

export async function getAssembledProducts(): Promise<AssembledProduct[]> {
    const db = await readDb();
    return db.products;
}

export async function updateProductTimelineEvent(productId: string, eventId: number, data: Partial<TimelineEvent>): Promise<AssembledProduct | null> {
    const db = await readDb();
    const productIndex = db.products.findIndex(p => p.productId.toUpperCase() === productId.toUpperCase());

    if (productIndex === -1) return null;

    const eventIndex = db.products[productIndex].timeline.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return null;
    
    // Update the event
    db.products[productIndex].timeline[eventIndex] = { ...db.products[productIndex].timeline[eventIndex], ...data, status: 'complete' };

    // Unlock the next event
    if (eventIndex + 1 < db.products[productIndex].timeline.length) {
        db.products[productIndex].timeline[eventIndex + 1].status = 'pending';
    }
    
    await writeDb(db);
    return db.products[productIndex];
}
