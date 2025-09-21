
"use server";

import { addBatch, updateTimelineEvent as dbUpdateTimelineEvent, addAssembledProduct, updateProductTimelineEvent, getBatchById as dbGetBatchById } from '@/lib/db';
import { CreateBatchValues, AssembleProductValues } from '@/lib/schemas';
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

export async function updateTimelineEvent(batchId: string, eventId: number, data: Partial<TimelineEvent>) {
    try {
        // Determine if we are updating a batch or a product
        if (batchId.startsWith('PROD-')) {
            const updatedProduct = await updateProductTimelineEvent(batchId, eventId, data);
            if (!updatedProduct) {
                return { success: false, message: "Product or event not found." };
            }
            revalidatePath(`/provenance/${batchId}`);
            return { success: true, batch: updatedProduct };
        } else {
            const updatedBatch = await dbUpdateTimelineEvent(batchId, eventId, data);
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
