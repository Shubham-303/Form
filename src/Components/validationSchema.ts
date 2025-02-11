import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  profilePicture: z.instanceof(File).optional(),
  framework: z.string().min(1, "Please select a framework"),
  gender: z.string().min(1, "Please select a gender"),
  anotherName: z.string().min(1, "Another name is required"),
});
