"use server";

import { addBatch, updateTimelineEvent as dbUpdateTimelineEvent } from '@/lib/db';
import { CreateBatchValues } from '@/lib/schemas';
import type { TimelineEvent } from '@/lib/data';

export async function createBatch(data: CreateBatchValues & { photo: string; diagnosis: { isHealthy: boolean, diagnosis: string } | null }) {
    try {
        const newBatch = await addBatch(data);
        return { success: true, batchId: newBatch.batchId };
    } catch (error) {
        console.error("Failed to create batch:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function updateTimelineEvent(batchId: string, eventId: number, data: Partial<TimelineEvent>) {
    try {
        const updatedBatch = await dbUpdateTimelineEvent(batchId, eventId, data);
        if (!updatedBatch) {
            return { success: false, message: "Batch or event not found." };
        }
        return { success: true, batch: updatedBatch };
    } catch (error) {
        console.error("Failed to update timeline event:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}
