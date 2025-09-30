
'use client';

// IMPORTANT: This file now contains client-side data management functions
// that interact with the DbContext, which uses localStorage.
// They are not server actions anymore.

import { CreateBatchValues, AssembleProductValues, ProcessingEventValues, SupplierEventValues, ManufacturingEventValues, DistributionEventValues, RetailEventValues } from '@/lib/schemas';
import type { TimelineEvent } from '@/lib/data';

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

export function formatTimelineDescription(eventId: number, data: any): string | undefined {
    if ('collectionCenterId' in data) {
        return formatProcessingData(data as ProcessingEventValues);
    } else if ('supplierId' in data) {
        return formatSupplierData(data as SupplierEventValues);
    } else if ('recipeId' in data) {
        return formatManufacturingData(data as ManufacturingEventValues);
    } else if ('warehouseId' in data) {
        return formatDistributionData(data as DistributionEventValues);
    } else if ('storeId' in data) {
        return formatRetailData(data as RetailEventValues);
    } else {
        return (data as Partial<TimelineEvent>).description;
    }
}

export async function getGeocodedLocation(latitude: number, longitude: number): Promise<{success: boolean, location?: string, message?: string}> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    if (!response.ok) {
      throw new Error(`Nominatim API failed with status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data && data.display_name) {
      return { success: true, location: data.display_name };
    } else {
      return { success: false, message: "Could not determine address from coordinates." };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return { success: false, message: "Could not retrieve location. Please enter it manually." };
  }
}
