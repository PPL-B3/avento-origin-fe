/**
 * Storage Adapter Pattern
 *
 * This adapter provides an abstraction over browser storage mechanisms.
 * Benefits:
 * - Makes code more testable by allowing storage mocking
 * - Centralizes storage access logic
 * - Allows for easy switching between storage types (localStorage, sessionStorage, etc.)
 */
export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export class LocalStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// For testing or SSR environments
export class InMemoryStorageAdapter implements StorageAdapter {
  private storage = new Map<string, string>();

  getItem(key: string): string | null {
    return this.storage.has(key) ? this.storage.get(key) || null : null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

// Factory function to get the appropriate storage adapter
export function createStorageAdapter(): StorageAdapter {
  if (typeof window !== 'undefined') {
    return new LocalStorageAdapter();
  }
  return new InMemoryStorageAdapter();
}

// Singleton instance
export const storageAdapter = createStorageAdapter();
