
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getDb, writeDb, type Database } from '@/lib/db';
import type { BatchData, AssembledProduct, User, TimelineEvent } from '@/lib/data';
import type { CreateBatchValues } from '@/lib/schemas';


interface DbContextType {
    db: Database | null;
    loading: boolean;
    getBatchById: (id: string) => BatchData | null;
    getProductById: (id: string) => AssembledProduct | null;
    verifyId: (id: string) => boolean;
    addBatch: (data: CreateBatchValues & { photo: string; diagnosis: { isHealthy: boolean, diagnosis: string } | null }) => BatchData;
    addProduct: (productName: string, batchIds: string[], brandName: string) => AssembledProduct;
    updateTimelineEvent: (id: string, eventId: number, data: Partial<TimelineEvent>, isProduct: boolean) => void;
    addUser: (email: string, role: string) => void;
    updateUser: (userId: number, newRole: string) => void;
    deleteUser: (userId: number) => void;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export function DbProvider({ children }: { children: ReactNode }) {
    const [db, setDb] = useState<Database | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This ensures localStorage is only accessed on the client-side
        setDb(getDb());
        setLoading(false);
    }, []);

    const updateDb = useCallback((newDb: Database) => {
        writeDb(newDb);
        setDb(getDb()); // Re-read from storage to ensure state is in sync
    }, []);

    const getBatchById = useCallback((id: string) => {
        if (!db) return null;
        return db.batches.find(b => b.batchId.toUpperCase() === id.toUpperCase()) || null;
    }, [db]);

    const getProductById = useCallback((id: string) => {
        if (!db) return null;
        return db.products.find(p => p.productId.toUpperCase() === id.toUpperCase()) || null;
    }, [db]);
    
    const verifyId = useCallback((id: string) => {
        if (!db) return false;
        const isProduct = id.toUpperCase().startsWith('PROD-');
        return isProduct ? !!getProductById(id) : !!getBatchById(id);
    }, [db, getProductById, getBatchById]);
    
    const addBatch = (data: CreateBatchValues & { photo: string; diagnosis: { isHealthy: boolean, diagnosis: string } | null }) => {
        const currentDb = getDb();
        const lastIdNum = currentDb.batches.reduce((max, b) => {
            const num = parseInt(b.batchId.split('-')[1]);
            return num > max ? num : max;
        }, 481515);
        const newBatchId = `HB-${lastIdNum + 1}`;

        const newBatch: BatchData = {
            batchId: newBatchId,
            productName: data.productName,
            farmName: data.farmName,
            location: data.location,
            harvestDate: data.harvestDate.toISOString().split('T')[0],
            processingDetails: data.processingDetails,
            imageUrl: data.photo,
            imageHint: 'freshly harvested product',
            timeline: [
                { id: 1, title: 'Cultivation & Harvest', status: 'complete', date: new Date().toLocaleDateString('en-CA'), description: `Hand-picked from ${data.farmName}. Initial notes: ${data.processingDetails}. AI diagnosis: ${data.diagnosis?.diagnosis || 'N/A'}`, consumerDescription: `Sourced from ${data.farmName} in ${data.location}, this ingredient was harvested on ${new Date(data.harvestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} using certified organic methods.`, icon: 'sprout', allowedRole: 'farmer', cta: 'Update Harvest Info' },
                { id: 2, title: 'Batch Received by Processor', status: 'pending', icon: 'warehouse', allowedRole: 'processor', cta: 'Confirm Receipt', consumerDescription: 'The freshly harvested batch has been received at a local processing facility.' },
                { id: 3, title: 'Local Processing & Dispatch', status: 'locked', icon: 'factory', allowedRole: 'processor', cta: 'Add Processing Details', consumerDescription: `The raw herb is carefully cleaned, dried, and prepared for the next stage of its journey.` },
                { id: 4, title: 'Supplier Receiving', status: 'locked', icon: 'warehouse', allowedRole: 'supplier', cta: 'Confirm Receipt', consumerDescription: 'Batch acquired by a verified supplier, ensuring quality and traceability.' },
                { id: 5, title: 'Supplier Processing & Dispatch', status: 'locked', icon: 'handshake', allowedRole: 'supplier', cta: 'Add Dispatch Details', consumerDescription: 'The ingredient is inspected, certified, and prepared for shipment to the manufacturer.' },
                { id: 6, title: 'Ready for Formulation', status: 'locked', icon: 'combine', allowedRole: 'brand', cta: 'Select for Product', consumerDescription: 'The ingredient is now ready to be used in a final product formulation.' },
            ]
        };
        currentDb.batches.unshift(newBatch);
        updateDb(currentDb);
        return newBatch;
    };
    
    const addProduct = (productName: string, batchIds: string[], brandName: string) => {
        const currentDb = getDb();
        const lastIdNum = currentDb.products.reduce((max, p) => {
            const num = parseInt(p.productId.split('-')[1]);
            return num > max ? num : max;
        }, 1000);
        const newProductId = `PROD-${lastIdNum + 1}`;

        const newProduct: AssembledProduct = {
            productId: newProductId,
            productName,
            brandName,
            assembledDate: new Date().toISOString().split('T')[0],
            componentBatches: batchIds,
            timeline: [
                { id: 99, title: 'Formulation & Manufacturing', status: 'complete', date: new Date().toLocaleDateString('en-CA'), description: `Combined from ${batchIds.length} ingredient batches to create ${productName}.`, consumerDescription: `Based on classical formulations, this product combines high-quality ingredients into a final blend.`, icon: 'combine', allowedRole: 'brand', cta: 'View Final Product' },
                { id: 100, title: 'Manufacturing & Packaging', status: 'pending', icon: 'package', allowedRole: 'brand', cta: 'Add Manufacturing Data', consumerDescription: 'The product is manufactured and packaged in a GMP-certified facility, ensuring safety and quality.' },
                { id: 101, title: 'Distribution', status: 'locked', icon: 'truck', allowedRole: 'distributor', cta: 'Add Shipping Manifest', consumerDescription: `Dispatched to verified distributors, ensuring the product is handled carefully in transit.` },
                { id: 102, title: 'Retailer Receiving', status: 'locked', icon: 'warehouse', allowedRole: 'retailer', cta: 'Confirm Receipt', consumerDescription: 'Product received by a verified retail partner.'},
                { id: 103, title: 'In-Store Inventory', status: 'locked', icon: 'store', allowedRole: 'retailer', cta: 'Confirm Retail Arrival', consumerDescription: 'Product is available for purchase at your trusted local or online store.' },
                { id: 104, title: 'Consumer Authenticity Scan', status: 'locked', icon: 'scan', allowedRole: 'consumer', cta: 'View Product Story', consumerDescription: `You have scanned a verified, authentic product. Thank you for choosing FloraChain.` }
            ]
        };
        currentDb.products.unshift(newProduct);
        updateDb(currentDb);
        return newProduct;
    };
    
    const updateTimelineEvent = (id: string, eventId: number, data: Partial<TimelineEvent>, isProduct: boolean) => {
        const currentDb = getDb();
        if (isProduct) {
            const productIndex = currentDb.products.findIndex(p => p.productId.toUpperCase() === id.toUpperCase());
            if (productIndex === -1) throw new Error("Product not found");
            const eventIndex = currentDb.products[productIndex].timeline.findIndex(e => e.id === eventId);
            if (eventIndex === -1) throw new Error("Event not found");

            currentDb.products[productIndex].timeline[eventIndex] = { ...currentDb.products[productIndex].timeline[eventIndex], ...data, status: 'complete' };
            const nextEvent = currentDb.products[productIndex].timeline[eventIndex + 1];
            if (nextEvent?.status === 'locked') {
                nextEvent.status = 'pending';
            }
        } else {
            const batchIndex = currentDb.batches.findIndex(b => b.batchId.toUpperCase() === id.toUpperCase());
            if (batchIndex === -1) throw new Error("Batch not found");
            const eventIndex = currentDb.batches[batchIndex].timeline.findIndex(e => e.id === eventId);
            if (eventIndex === -1) throw new Error("Event not found");
            
            currentDb.batches[batchIndex].timeline[eventIndex] = { ...currentDb.batches[batchIndex].timeline[eventIndex], ...data, status: 'complete' };
            
            const nextEvent = currentDb.batches[batchIndex].timeline[eventIndex + 1];
             if (nextEvent?.status === 'locked') {
                nextEvent.status = 'pending';
            }
        }
        updateDb(currentDb);
    };

    const addUser = (email: string, role: string) => {
        const currentDb = getDb();
        if (currentDb.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error("A user with this email already exists.");
        }
        const lastId = currentDb.users.reduce((max, u) => u.id > max ? u.id : max, 0);
        const newUser: User = { id: lastId + 1, email, role };
        currentDb.users.push(newUser);
        updateDb(currentDb);
    };

    const updateUser = (userId: number, newRole: string) => {
        const currentDb = getDb();
        const userIndex = currentDb.users.findIndex(u => u.id === userId);
        if (userIndex === -1) throw new Error("User not found.");
        currentDb.users[userIndex].role = newRole;
        updateDb(currentDb);
    };

    const deleteUser = (userId: number) => {
        const currentDb = getDb();
        const initialLength = currentDb.users.length;
        currentDb.users = currentDb.users.filter(u => u.id !== userId);
        if (currentDb.users.length === initialLength) throw new Error("User not found.");
        updateDb(currentDb);
};

    const value = {
        db,
        loading,
        getBatchById,
        getProductById,
        verifyId,
        addBatch,
        addProduct,
        updateTimelineEvent,
        addUser,
        updateUser,
        deleteUser,
    };

    return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}

export function useDbContext() {
    const context = useContext(DbContext);
    if (context === undefined) {
        throw new Error('useDbContext must be used within a DbProvider');
    }
    return context;
}
