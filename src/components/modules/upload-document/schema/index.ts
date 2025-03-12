import { z } from 'zod';

export const uploadDocumentSchema = z.object({
  documentName: z.string(),
  ownerName: z.string(),
  file: z.any(),
});
