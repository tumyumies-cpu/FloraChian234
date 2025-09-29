
'use client';
/**
 * @fileoverview This file simulates a simple JSON file-based database for the application.
 * This version uses an in-memory approach, resetting on page load.
 */

import type { Database } from './data';
import InitialDb from './database.json';

// Function to read the initial database from the imported JSON file.
// This is now the single source of truth on app start.
export function getInitialDb(): Database {
    // We perform a deep copy to prevent mutations of the original JSON object import.
    return JSON.parse(JSON.stringify(InitialDb));
}
