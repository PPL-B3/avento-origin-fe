/**
 * Document Service - Facade Pattern
 *
 * The Facade pattern provides a simplified interface to a complex subsystem.
 *
 * Benefits:
 * - Simplifies client interface
 * - Decouples client from subsystem components
 * - Makes components easier to use and understand
 * - Centralizes business logic
 */

import { storageAdapter } from '@/lib/adapters/storage-adapter';
import { defaultErrorHandler } from '@/lib/strategies/error-handling-strategy';
import { toast } from 'sonner';
import {
  DocumentRepository,
  useDocumentRepository,
} from '../repositories/document-repository';
import { getSignedUrlFromSpaces } from '../utils/getSignedUrl';

export class DocumentService {
  private repository: DocumentRepository;
  private readonly OTP_CACHE_PREFIX = 'requestAccess_';
  private readonly CACHE_EXPIRY_MS = 8 * 60 * 1000; // 8 minutes

  constructor(repository: DocumentRepository) {
    this.repository = repository;
  }

  /**
   * Checks if OTP request is cached and still valid
   */
  private isOtpRequestCached(qrId: string): boolean {
    const cacheKey = `${this.OTP_CACHE_PREFIX}${qrId}`;
    const cachedTime = storageAdapter.getItem(cacheKey);
    if (!cachedTime) return false;

    const now = Date.now();
    return now - Number(cachedTime) <= this.CACHE_EXPIRY_MS;
  }

  /**
   * Request document access OTP
   */
  async requestAccess(qrId: string): Promise<void> {
    try {
      await this.repository.requestAccess(qrId);

      // Cache the request time
      const cacheKey = `${this.OTP_CACHE_PREFIX}${qrId}`;
      storageAdapter.setItem(cacheKey, Date.now().toString());

      return;
    } catch (error) {
      const errorMessage = defaultErrorHandler.handleError(error);
      throw new Error(errorMessage);
    }
  }

  /**
   * Request access if not recently requested
   */
  async requestAccessIfNeeded(qrId: string): Promise<void> {
    if (!this.isOtpRequestCached(qrId)) {
      return this.requestAccess(qrId);
    }
  }

  /**
   * Verify document access with OTP
   */
  async verifyAccess(qrId: string, otp: string): Promise<void> {
    const promise = this.repository.verifyAccess(qrId, otp);

    // Show toast notification
    toast.promise(promise, {
      loading: 'Verifying OTP...',
      success: () => 'OTP Verified.',
      error: (error) => defaultErrorHandler.handleError(error),
    });

    try {
      await promise;

      // Clear OTP request cache after successful verification
      const cacheKey = `${this.OTP_CACHE_PREFIX}${qrId}`;
      storageAdapter.removeItem(cacheKey);

      return;
    } catch (error) {
      // Clear storage on error as well to allow re-requesting
      storageAdapter.clear();
      throw error;
    }
  }

  /**
   * Get document metadata
   */
  async getMetadata(qrId: string) {
    try {
      return await this.repository.getMetadata(qrId);
    } catch (error) {
      const errorMessage = defaultErrorHandler.handleError(error);
      throw new Error(errorMessage);
    }
  }

  /**
   * Get signed URL for document file
   */
  async getSignedUrl(filePath: string): Promise<string> {
    try {
      return await getSignedUrlFromSpaces(filePath);
    } catch (error) {
      const errorMessage = defaultErrorHandler.handleError(error);
      throw new Error(errorMessage);
    }
  }
}

export function useDocumentService() {
  const repository = useDocumentRepository();
  return new DocumentService(repository);
}
