import { z } from 'zod';

export const uploadDocumentSchema = z.object({
  image: z.string(),
});
