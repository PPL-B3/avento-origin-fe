/**
 * Repository Pattern for Document Access
 *
 * This pattern separates the logic that retrieves the data and maps it to the entity model
 * from the business logic that acts on the model.
 *
 * Benefits:
 * - Decouples application from persistence frameworks
 * - Centralizes data access logic
 * - Makes code more testable
 * - Provides clean API for data access
 */

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { DocumentMetadataResponse } from '@/components/modules/metadata/types';
import { AxiosInstance } from 'axios';

export interface DocumentRepository {
  getMetadata(qrId: string): Promise<DocumentMetadataResponse>;
  requestAccess(qrId: string): Promise<unknown>;
  verifyAccess(qrId: string, otp: string): Promise<unknown>;
}

export class ApiDocumentRepository implements DocumentRepository {
  constructor(private client: AxiosInstance) {}

  async getMetadata(qrId: string): Promise<DocumentMetadataResponse> {
    const apiUrl = `${ENDPOINTS.METADATA}/${qrId}`;
    const { data } = await this.client.get(apiUrl);
    return data as DocumentMetadataResponse;
  }

  async requestAccess(qrId: string): Promise<unknown> {
    const apiUrl = `${ENDPOINTS.ACCESS_DOCUMENT}/${qrId}`;
    const { data } = await this.client.get(apiUrl);
    return data;
  }

  async verifyAccess(qrId: string, otp: string): Promise<unknown> {
    const apiUrl = ENDPOINTS.ACCESS_DOCUMENT;
    const response = await this.client.post(apiUrl, {
      qrId,
      otp,
    });
    return response;
  }
}

export const useDocumentRepository = (): DocumentRepository => {
  const client = useAventoClient();
  return new ApiDocumentRepository(client);
};
