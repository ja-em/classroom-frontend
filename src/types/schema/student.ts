import { z } from "zod";

export const createStudenSchema = z.object({
  prefix: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  gender: z.string(),
  birthDate: z.date(),
  classLevelId: z.coerce.number(),
});

export type ICreateStudenSchema = z.infer<typeof createStudenSchema>;
