
import { z } from 'zod';

export const CreateBatchSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  farmName: z.string().min(2, { message: "Farm name must be at least 2 characters." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  harvestDate: z.date({
    required_error: "A harvest date is required.",
  }),
  processingDetails: z.string().min(10, { message: "Please provide some initial notes or details." }),
});

export type CreateBatchValues = z.infer<typeof CreateBatchSchema>;


export const ProcessingEventSchema = z.object({
    collectionCenterId: z.string().min(1, "Collection Center ID is required."),
    cleaningMethod: z.string().min(3, "Cleaning method is required."),
    dryingMethod: z.string().min(3, "Drying method is required."),
    dryingTemp: z.coerce.number().min(0, "Temperature must be a positive number."),
    dryingDuration: z.string().min(1, "Drying duration is required."),
    finalMoisture: z.coerce.number().min(0, "Moisture % must be a positive number."),
    particleSize: z.string().optional(),
    visualInspection: z.string().min(10, "Visual inspection notes are required."),
    storageCondition: z.string().min(3, "Storage condition is required."),
    storageDuration: z.string().min(1, "Storage duration is required."),
    dispatchDate: z.string().refine((val) => !isNaN(Date.parse(val)), {message: "Invalid date"}),
});

export type ProcessingEventValues = z.infer<typeof ProcessingEventSchema>;


export const AssembleProductSchema = z.object({
    productName: z.string().min(3, { message: "Product name must be at least 3 characters." }),
    batchIds: z.array(z.string()).min(1, { message: "You must select at least one batch." }),
});

export type AssembleProductValues = z.infer<typeof AssembleProductSchema>;
