
"use server";

import { addBatch, updateTimelineEvent as dbUpdateTimelineEvent, addAssembledProduct, updateProductTimelineEvent, getBatchById as dbGetBatchById } from '@/lib/db';
import { CreateBatchValues, AssembleProductValues, ProcessingEventValues, SupplierEventValues } from '@/lib/schemas';
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
- Dispatched on: ${data.dispatchDate}
    `.trim();
}

function formatSupplierData(data: SupplierEventValues): string {
    return `
Acquisition:
- Supplier ID: ${data.supplierId}
- Location: ${data.location}
- Received Date: ${data.receivedDate}
- Quantity: ${data.quantity}
- Internal Lot #: ${data.lotNumber}

Quality & Compliance:
- Inspection: ${data.inspectionReport || 'N/A'}
- Certifications: ${data.certifications || 'N/A'}
    `.trim();
}


export async function updateTimelineEvent(batchId: string, eventId: number, data: Partial<TimelineEvent> | ProcessingEventValues | SupplierEventValues) {
    try {
        let description: string | undefined;

        if ('collectionCenterId' in data) {
            description = formatProcessingData(data as ProcessingEventValues);
        } else if ('supplierId' in data) {
            description = formatSupplierData(data as SupplierEventValues);
        } else {
            description = (data as Partial<TimelineEvent>).description;
        }

        const updateData: Partial<TimelineEvent> = {
            description,
            date: data.date,
        };

        if (batchId.startsWith('PROD-')) {
            const updatedProduct = await updateProductTimelineEvent(batchId, eventId, updateData);
            if (!updatedProduct) {
                return { success: false, message: "Product or event not found." };
            }
            revalidatePath(`/provenance/${batchId}`);
            return { success: true, batch: updatedProduct };
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
        // This will be the page where admins can see final products.
        revalidatePath('/admin'); 
        return { success: true, productId: newProduct.productId };
    } catch (error) {
        console.error("Failed to assemble product:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function verifyBatchId(batchId: string): Promise<{ success: boolean }> {
    try {
        const batchExists = await dbGetBatchById(batchId);
        return { success: !!batchExists };
    } catch (error) {
        console.error("Failed to verify batch ID:", error);
        return { success: false };
    }
}
