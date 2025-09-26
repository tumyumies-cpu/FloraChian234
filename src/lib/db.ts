
'use client';
/**
 * @fileoverview This file simulates a simple JSON file-based database for the application.
 * On a serverless hosting platform, this will be read-only and in-memory.
 */

import type { BatchData, TimelineEvent, AssembledProduct, User, FarmerApplication } from './data';
import InitialDb from './database.json';
import type { FarmerApplicationValues } from './schemas';

// Type for the entire database structure
export type Database = {
  batches: BatchData[];
  products: AssembledProduct[];
  users: User[];
  farmerApplications: FarmerApplication[];
};

const DB_KEY = 'florachain_db';

// Function to read the entire database.
// It reads from localStorage or initializes it from the JSON file.
export function getDb(): Database {
    try {
        const storedDb = localStorage.getItem(DB_KEY);
        if (storedDb) {
            const parsedDb = JSON.parse(storedDb);
            // Ensure all keys are present
            return {
                batches: parsedDb.batches || [],
                products: parsedDb.products || [],
                users: parsedDb.users || [],
                farmerApplications: parsedDb.farmerApplications || [],
            };
        }
    } catch (e) {
        console.error("Could not read from localStorage, using initial data.", e);
    }
    // If nothing in localStorage, initialize it
    const db = InitialDb as Database;
    writeDb(db);
    return db;
}


// Writes the entire database object to localStorage.
export function writeDb(db: Database): void {
  try {
      localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
      console.error("Could not write to localStorage", e);
  }
}
