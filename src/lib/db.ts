
import type { Database } from './data';
import InitialDb from './database.json';

// This function provides a deep copy of the initial database state.
// It serves as the single source of truth for the initial state of the in-memory database.
export function getInitialDb(): Database {
    // We perform a deep copy to prevent any mutations of the original JSON object that's imported.
    return JSON.parse(JSON.stringify(InitialDb));
}
