
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
    destination: z.string().min(3, "Destination is required."),
    transportMode: z.string().min(3, "Transport mode is required."),
});

export type ProcessingEventValues = z.infer<typeof ProcessingEventSchema>;


export const SupplierEventSchema = z.object({
    supplierId: z.string().min(1, "Supplier ID is required."),
    location: z.string().min(3, "Location is required."),
    quantity: z.string().min(1, "Quantity received is required."),
    lotNumber: z.string().min(1, "Batch/Lot number is required."),
    inspectionReport: z.string().optional(),
    certifications: z.string().optional(),
});
export type SupplierEventValues = z.infer<typeof SupplierEventSchema>;


export const ManufacturingEventSchema = z.object({
    recipeId: z.string().min(1, "Recipe ID is required."),
    extractionMethod: z.string().min(3, "Extraction method is required."),
    equipmentUsed: z.string().min(3, "Equipment details are required."),
    qualityControl: z.object({
        ipssTests: z.string().min(3, "IPSS test results are required."),
        heavyMetals: z.string().min(3, "Heavy metal test results are required."),
        microbialSafety: z.string().min(3, "Microbial safety results are required."),
    }),
    finalBatchId: z.string().min(1, "Finished Product Batch ID is required."),
    expiryDate: z.string().min(1, "Expiry date is required."),
    gmpCompliance: z.string().min(3, "GMP compliance notes are required."),
});
export type ManufacturingEventValues = z.infer<typeof ManufacturingEventSchema>;


export const DistributionEventSchema = z.object({
    warehouseId: z.string().min(1, "Warehouse ID is required."),
    stockEntryDate: z.string().min(1, "Stock entry date is required."),
    coldChain: z.string().optional(),
    transportMode: z.string().min(3, "Transport mode is required."),
    distributorId: z.string().min(1, "Distributor ID is required."),
});
export type DistributionEventValues = z.infer<typeof DistributionEventSchema>;

export const RetailEventSchema = z.object({
    storeId: z.string().min(1, "Store ID is required."),
    saleDate: z.string().min(1, "Sale date is required."),
    stockStatus: z.enum(["in_stock", "sold_out", "display_only"]),
});
export type RetailEventValues = z.infer<typeof RetailEventSchema>;


export const AssembleProductSchema = z.object({
    productName: z.string().min(3, { message: "Product name must be at least 3 characters." }),
    batchIds: z.array(z.string()).min(1, { message: "You must select at least one batch." }),
});

export type AssembleProductValues = z.infer<typeof AssembleProductSchema>;
