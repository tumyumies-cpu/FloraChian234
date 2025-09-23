
"use server";

import { addBatch, updateTimelineEvent as dbUpdateTimelineEvent, addAssembledProduct, updateProductTimelineEvent, getBatchById as dbGetBatchById, getAssembledProductById } from '@/lib/db';
import { CreateBatchValues, AssembleProductValues, ProcessingEventValues, SupplierEventValues, ManufacturingEventValues, DistributionEventValues, RetailEventValues } from '@/lib/schemas';
import type { TimelineEvent } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function createBatch(data: CreateBatchValues & { photo: string; diagnosis: { isHealthy: boolean, diagnosis: string } | null }) {
    try {
        const newBatch = await addBatch(data);
        revalidatePath('/past-batches');
        revalidatePath('/assemble-product');
        return { success: true, batchId: newBatch.batchId };
    } catch (error) {
        console.error("Failed to create batch:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

function formatProcessingData(data: ProcessingEventValues): string {
    return `
Procurement:
- Collection Center: ${data.collectionCenterId}

Processing:
- Cleaning: ${data.cleaningMethod}
- Drying: ${data.dryingMethod} at ${data.dryingTemp}°C for ${data.dryingDuration} (Final Moisture: ${data.finalMoisture}%)
- Grinding: ${data.particleSize || 'N/A'}

Quality & Safety:
- Inspection: ${data.visualInspection}

Storage & Dispatch:
- Stored for ${data.storageDuration} in ${data.storageCondition}
    `.trim();
}

function formatSupplierData(data: SupplierEventValues): string {
    return `
Acquisition:
- Supplier ID: ${data.supplierId}
- Location: ${data.location}
- Quantity: ${data.quantity}
- Internal Lot #: ${data.lotNumber}

Quality & Compliance:
- Inspection: ${data.inspectionReport || 'N/A'}
- Certifications: ${data.certifications || 'N/A'}
    `.trim();
}

function formatManufacturingData(data: ManufacturingEventValues): string {
    return `
Formulation & Processing:
- Recipe ID: ${data.recipeId}
- Extraction Method: ${data.extractionMethod}
- Equipment: ${data.equipmentUsed}
- Packaging Details: ${data.packagingDetails}

Quality Control:
- IPSS Tests: ${data.qualityControl.ipssTests}
- Heavy Metals: ${data.qualityControl.heavyMetals}
- Microbial Safety: ${data.qualityControl.microbialSafety}

Final Batch Details:
- Finished Product Batch ID: ${data.finalBatchId}
- Expiry Date: ${data.expiryDate}
- GMP Compliance: ${data.gmpCompliance}
    `.trim();
}

function formatDistributionData(data: DistributionEventValues): string {
    return `
Warehouse & Stock:
- Warehouse ID: ${data.warehouseId}
- Stock Entry Date: ${data.stockEntryDate}

Transportation:
- Mode: ${data.transportMode}
- Cold Chain: ${data.coldChain || 'N/A'}

Distributor:
- ID: ${data.distributorId}
    `.trim();
}

function formatRetailData(data: RetailEventValues): string {
    const statusMap = {
        in_stock: "In Stock",
        sold_out: "Sold Out",
        display_only: "Display Only",
    };
    return `
Store Details:
- Store ID: ${data.storeId}
- Available for Sale: ${data.saleDate}
- Current Status: ${statusMap[data.stockStatus]}
    `.trim();
}


export async function updateTimelineEvent(batchId: string, eventId: number, data: Partial<TimelineEvent> | ProcessingEventValues | SupplierEventValues | ManufacturingEventValues | DistributionEventValues | RetailEventValues) {
    try {
        let description: string | undefined;

        if ('collectionCenterId' in data) {
            description = formatProcessingData(data as ProcessingEventValues);
        } else if ('supplierId' in data) {
            description = formatSupplierData(data as SupplierEventValues);
        } else if ('recipeId' in data) {
            description = formatManufacturingData(data as ManufacturingEventValues);
        } else if ('warehouseId' in data) {
            description = formatDistributionData(data as DistributionEventValues);
        } else if ('storeId' in data) {
            description = formatRetailData(data as RetailEventValues);
        } else {
            description = (data as Partial<TimelineEvent>).description;
        }

        // Always set the date on the server to prevent user modification
        const updateData: Partial<TimelineEvent> = {
            description: description ?? '',
            date: new Date().toLocaleDateString('en-CA'),
            formData: data, // Store the raw form data
        };

        if (batchId.startsWith('PROD-')) {
            const updatedProduct = await updateProductTimelineEvent(batchId, eventId, updateData);
            if (!updatedProduct) {
                return { success: false, message: "Product or event not found." };
            }
            revalidatePath(`/provenance/${batchId}`);
            return { success: true, product: updatedProduct };
        } else {
            const updatedBatch = await dbUpdateTimelineEvent(batchId, eventId, updateData);
            if (!updatedBatch) {
                return { success: false, message: "Batch or event not found." };
            }
            revalidatePath(`/provenance/${batchId}`);
            revalidatePath('/past-batches');
            return { success: true, batch: updatedBatch };
        }
    } catch (error) {
        console.error("Failed to update timeline event:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function assembleProduct(data: AssembleProductValues) {
    try {
        const newProduct = await addAssembledProduct(data.productName, data.batchIds);
        revalidatePath('/assemble-product');
        revalidatePath('/past-products'); 
        return { success: true, productId: newProduct.productId };
    } catch (error) {
        console.error("Failed to assemble product:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function verifyBatchId(batchId: string): Promise<{ success: boolean }> {
    try {
        const itemExists = batchId.toUpperCase().startsWith('PROD-')
            ? await getAssembledProductById(batchId)
            : await dbGetBatchById(batchId);
        return { success: !!itemExists };
    } catch (error) {
        console.error("Failed to verify ID:", error);
        return { success: false };
    }
}
