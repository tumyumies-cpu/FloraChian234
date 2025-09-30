
'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getInitialDb, type Database } from '@/lib/db';
import type { BatchData, AssembledProduct, User, TimelineEvent, FarmerApplication, ApplicationStatus } from '@/lib/data';
import type { CreateBatchValues, FarmerApplicationValues } from '@/lib/schemas';
import type { DiagnosePlantHealthOutput } from '@/ai/flows/diagnose-plant-health';

interface DbContextType {
    db: Database | null;
    loading: boolean;
    getBatchById: (id: string) => BatchData | null;
    getProductById: (id: string) => AssembledProduct | null;
    addBatch: (data: CreateBatchValues & { photo: string; diagnosis: DiagnosePlantHealthOutput | null }) => BatchData;
    addProduct: (productName: string, batchIds: string[], brandName: string, photo: string) => AssembledProduct;
    updateTimelineEvent: (id: string, eventId: number, data: Partial<TimelineEvent>, isProduct: boolean) => void;
    removeBatchFromProduct: (productId: string, batchId: string) => void;
    addUser: (email: string, role: string) => void;
    updateUser: (userId: number, newRole: string) => void;
    deleteUser: (userId: number) => void;
    addFarmerApplication: (data: FarmerApplicationValues) => void;
    updateFarmerApplicationStatus: (applicationId: number, status: ApplicationStatus) => void;
    reloadDb: () => void;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

// This will hold the database state in memory for the lifetime of the client session.
// It resets on a full page reload.
let inMemoryDb: Database | null = null;

export function DbProvider({ children }: { children: ReactNode }) {
    const [db, setDb] = useState<Database | null>(inMemoryDb);
    const [loading, setLoading] = useState(true);

    const initializeDb = useCallback(() => {
        if (!inMemoryDb) {
            inMemoryDb = getInitialDb();
        }
        setDb(inMemoryDb);
        setLoading(false);
    }, []);

    useEffect(() => {
        initializeDb();
    }, [initializeDb]);

    const updateDb = (newDbState: Database) => {
        // Update both the in-memory reference and the React state
        inMemoryDb = newDbState;
        setDb(newDbState);
    };
    
    const getBatchById = useCallback((id: string) => {
        if (!db) return null;
        return db.batches.find(b => b.batchId.toUpperCase() === id.toUpperCase()) || null;
    }, [db]);

    const getProductById = useCallback((id: string) => {
        if (!db) return null;
        return db.products.find(p => p.productId.toUpperCase() === id.toUpperCase()) || null;
    }, [db]);
    
    const addBatch = (data: CreateBatchValues & { photo: string; diagnosis: DiagnosePlantHealthOutput | null }) => {
        if (!db) throw new Error("Database not initialized");

        const lastIdNum = db.batches.reduce((max, b) => {
            const num = parseInt(b.batchId.split('-')[1], 10);
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
                { id: 1, title: 'Cultivation & Harvest', status: 'complete', date: new Date().toLocaleDateString('en-CA'), description: `Hand-picked from ${data.farmName}. Initial notes: ${data.processingDetails}. AI diagnosis: ${data.diagnosis?.healthAssessment.diagnosis || 'N/A'}`, consumerDescription: `Sourced from ${data.farmName} in ${data.location}, this ingredient was harvested on ${new Date(data.harvestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} using certified organic methods.`, icon: 'sprout', allowedRole: 'farmer', cta: 'Update Harvest Info' },
                { id: 2, title: 'Batch Received by Processor', status: 'pending', icon: 'warehouse', allowedRole: 'processor', cta: 'Confirm Receipt', consumerDescription: 'The freshly harvested batch has been received at a local processing facility.' },
                { id: 3, title: 'Local Processing & Dispatch', status: 'locked', icon: 'factory', allowedRole: 'processor', cta: 'Add Processing Details', consumerDescription: `The raw herb is carefully cleaned, dried, and prepared for the next stage of its journey.` },
                { id: 4, title: 'Supplier Receiving', status: 'locked', icon: 'warehouse', allowedRole: 'supplier', cta: 'Confirm Receipt', consumerDescription: 'Batch acquired by a verified supplier, ensuring quality and traceability.' },
                { id: 5, title: 'Supplier Processing & Dispatch', status: 'locked', icon: 'handshake', allowedRole: 'supplier', cta: 'Add Dispatch Details', consumerDescription: 'The ingredient is inspected, certified, and prepared for shipment to the manufacturer.' },
                { id: 6, title: 'Ready for Formulation', status: 'locked', icon: 'combine', allowedRole: 'brand', cta: 'Select for Product', consumerDescription: 'The ingredient is now ready to be used in a final product formulation.' },
            ]
        };
        const newDb = { ...db, batches: [newBatch, ...db.batches] };
        updateDb(newDb);
        return newBatch;
    };
    
    const addProduct = (productName: string, batchIds: string[], brandName: string, photo: string) => {
        if (!db) throw new Error("Database not initialized");

        const lastIdNum = db.products.reduce((max, p) => {
            const num = parseInt(p.productId.split('-')[1], 10);
            return num > max ? num : max;
        }, 1000);
        const newProductId = `PROD-${lastIdNum + 1}`;

        const newProduct: AssembledProduct = {
            productId: newProductId,
            productName,
            brandName,
            assembledDate: new Date().toISOString().split('T')[0],
            componentBatches: batchIds,
            imageUrl: photo,
            imageHint: "final product bottle",
            timeline: [
                { id: 99, title: 'Formulation & Manufacturing', status: 'complete', date: new Date().toLocaleDateString('en-CA'), description: `Combined from ${batchIds.length} ingredient batches to create ${productName}.`, consumerDescription: `Based on classical formulations, this product combines high-quality ingredients into a final blend.`, icon: 'combine', allowedRole: 'brand', cta: 'View Final Product' },
                { id: 100, title: 'Manufacturing & Packaging', status: 'pending', icon: 'package', allowedRole: 'brand', cta: 'Add Manufacturing Data', consumerDescription: 'The product is manufactured and packaged in a GMP-certified facility, ensuring safety and quality.' },
                { id: 101, title: 'Distribution', status: 'locked', icon: 'truck', allowedRole: 'distributor', cta: 'Add Shipping Manifest', consumerDescription: `Dispatched to verified distributors, ensuring the product is handled carefully in transit.` },
                { id: 102, title: 'Retailer Receiving', status: 'locked', icon: 'warehouse', allowedRole: 'retailer', cta: 'Confirm Receipt', consumerDescription: 'Product received by a verified retail partner.'},
                { id: 103, title: 'In-Store Inventory', status: 'locked', icon: 'store', allowedRole: 'retailer', cta: 'Confirm Retail Arrival', consumerDescription: 'Product is available for purchase at your trusted local or online store.' },
                { id: 104, title: 'Consumer Authenticity Scan', status: 'locked', icon: 'scan', allowedRole: 'consumer', cta: 'View Product Story', consumerDescription: `You have scanned a verified, authentic product. Thank you for choosing FloraChain.` }
            ]
        };

        const newDb = { ...db, products: [newProduct, ...db.products] };
        updateDb(newDb);
        return newProduct;
    };
    
    const updateTimelineEvent = (id: string, eventId: number, data: Partial<TimelineEvent>, isProduct: boolean) => {
        if (!db) throw new Error("Database not initialized");

        const newDb = { ...db };
        if (isProduct) {
            const productIndex = newDb.products.findIndex(p => p.productId.toUpperCase() === id.toUpperCase());
            if (productIndex === -1) throw new Error("Product not found");
            
            const newTimeline = [...newDb.products[productIndex].timeline];
            const eventIndex = newTimeline.findIndex(e => e.id === eventId);
            if (eventIndex === -1) throw new Error("Event not found");

            newTimeline[eventIndex] = { ...newTimeline[eventIndex], ...data, status: 'complete' };
            const nextEvent = newTimeline[eventIndex + 1];
            if (nextEvent?.status === 'locked') {
                nextEvent.status = 'pending';
            }
            newDb.products[productIndex] = { ...newDb.products[productIndex], timeline: newTimeline };
        } else {
            const batchIndex = newDb.batches.findIndex(b => b.batchId.toUpperCase() === id.toUpperCase());
            if (batchIndex === -1) throw new Error("Batch not found");

            const newTimeline = [...newDb.batches[batchIndex].timeline];
            const eventIndex = newTimeline.findIndex(e => e.id === eventId);
            if (eventIndex === -1) throw new Error("Event not found");
            
            newTimeline[eventIndex] = { ...newTimeline[eventIndex], ...data, status: 'complete' };
            const nextEvent = newTimeline[eventIndex + 1];
            if (nextEvent?.status === 'locked') {
                nextEvent.status = 'pending';
            }
            newDb.batches[batchIndex] = { ...newDb.batches[batchIndex], timeline: newTimeline };
        }
        updateDb(newDb);
    };

    const removeBatchFromProduct = (productId: string, batchId: string) => {
        if (!db) throw new Error("Database not initialized");
        
        const newDb = { ...db };
        const productIndex = newDb.products.findIndex(p => p.productId.toUpperCase() === productId.toUpperCase());
        if (productIndex === -1) throw new Error("Product not found");

        const newProduct = { ...newDb.products[productIndex] };
        newProduct.componentBatches = newProduct.componentBatches.filter(b => b !== batchId);
        newDb.products[productIndex] = newProduct;

        updateDb(newDb);
    };

    const addUser = (email: string, role: string) => {
        if (!db) throw new Error("Database not initialized");

        if (db.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error("A user with this email already exists.");
        }
        const lastId = db.users.reduce((max, u) => u.id > max ? u.id : max, 0);
        const newUser: User = { id: lastId + 1, email, role };
        updateDb({ ...db, users: [...db.users, newUser] });
    };

    const updateUser = (userId: number, newRole: string) => {
        if (!db) throw new Error("Database not initialized");

        const newUsers = db.users.map(u => u.id === userId ? { ...u, role: newRole } : u);
        if (newUsers.length === db.users.length) {
            updateDb({ ...db, users: newUsers });
        } else {
            throw new Error("User not found.");
        }
    };

    const deleteUser = (userId: number) => {
        if (!db) throw new Error("Database not initialized");

        const newUsers = db.users.filter(u => u.id !== userId);
        if (newUsers.length === db.users.length) throw new Error("User not found.");
        updateDb({ ...db, users: newUsers });
    };
    
    const addFarmerApplication = (data: Omit<FarmerApplicationValues, 'agreement'>) => {
        if (!db) throw new Error("Database not initialized");

        const lastId = db.farmerApplications.reduce((max, app) => app.id > max ? app.id : max, 0);
        const newApplication: FarmerApplication = {
            id: lastId + 1,
            status: 'pending',
            submittedAt: new Date().toISOString(),
            details: {
                ...data,
                kycDocument: (data.kycDocument as any)?.[0]?.name || 'N/A',
                farmOwnershipDocument: (data.farmOwnershipDocument as any)?.[0]?.name || 'N/A',
            },
        };
        updateDb({ ...db, farmerApplications: [...db.farmerApplications, newApplication] });
    };

    const updateFarmerApplicationStatus = (applicationId: number, status: ApplicationStatus) => {
        if (!db) throw new Error("Database not initialized");
        
        let newDb = { ...db };
        const appIndex = newDb.farmerApplications.findIndex(app => app.id === applicationId);
        if (appIndex === -1) throw new Error("Application not found.");
        
        const newApplications = [...newDb.farmerApplications];
        const application = { ...newApplications[appIndex], status };
        newApplications[appIndex] = application;
        
        let newUsers = newDb.users;
        if (status === 'approved') {
            if (!newDb.users.find(u => u.email.toLowerCase() === application.details.email.toLowerCase())) {
                const lastId = newDb.users.reduce((max, u) => u.id > max ? u.id : max, 0);
                const newUser: User = { id: lastId + 1, email: application.details.email, role: 'farmer' };
                newUsers = [...newDb.users, newUser];
            }
        }
        
        updateDb({ ...newDb, farmerApplications: newApplications, users: newUsers });
    };

    const value = {
        db,
        loading,
        getBatchById,
        getProductById,
        addBatch,
        addProduct,
        updateTimelineEvent,
        removeBatchFromProduct,
        addUser,
        updateUser,
        deleteUser,
        addFarmerApplication,
        updateFarmerApplicationStatus,
        reloadDb: initializeDb,
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
