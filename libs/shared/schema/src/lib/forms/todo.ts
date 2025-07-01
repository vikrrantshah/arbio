import { z } from 'zod';

export const CreateTodoSchema = z.object({
  title: z.string(),
  content: z.string(),
  userId: z.number(),
});

export const UpdateTodoSchema = z.object({
  title: z.string(),
  content: z.string(),
  completed: z.boolean(),
  userId: z.number(),
});
