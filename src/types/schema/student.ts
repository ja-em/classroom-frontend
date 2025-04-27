import { z } from "zod";

export const createStudenSchema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  birthDate: z.date(),
  classLevelId: z.coerce.number(),
  identificationNumber: z.string(),
});

export type ICreateStudenSchema = z.infer<typeof createStudenSchema>;
