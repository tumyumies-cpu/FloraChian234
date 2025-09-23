
'use client';
/**
 * @fileoverview This file simulates a simple JSON file-based database for the application.
 * On a serverless hosting platform, this will be read-only and in-memory.
 */

import type { BatchData, TimelineEvent, AssembledProduct, User } from './data';
import InitialDb from './database.json';

// Type for the entire database structure
export type Database = {
  batches: BatchData[];
  products: AssembledProduct[];
  users: User[];
};

const DB_KEY = 'florachain_db';

// Function to read the entire database.
// It reads from localStorage or initializes it from the JSON file.
export function getDb(): Database {
    try {
        const storedDb = localStorage.getItem(DB_KEY);
        if (storedDb) {
            return JSON.parse(storedDb);
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
