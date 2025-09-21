import { z } from 'zod';

export const CreateBatchSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  farmName: z.string().min(2, { message: "Farm name must be at least 2 characters." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  harvestDate: z.date({
    required_error: "A harvest date is required.",
  }),
  processingDetails: z.string().min(10, { message: "Please provide some initial notes or details." }),
});

export type CreateBatchValues = z.infer<typeof CreateBatchSchema>;
