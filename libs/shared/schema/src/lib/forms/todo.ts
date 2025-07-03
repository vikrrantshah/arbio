import { z } from 'zod';

export const CreateTodoSchema = z.object({
  title: z.string().nonempty('Please provide a Title'),
  content: z.string(),
  userId: z.number().min(1),
});
export type CreateTodoForm = z.infer<typeof CreateTodoSchema>;
export const CreateTodoFormDefaultValues: CreateTodoForm = {
  title: '',
  content: '',
  userId: 0,
};

export const UpdateTodoSchema = z.object({
  title: z.string().nonempty('Please provide a Title'),
  content: z.string(),
  completed: z.boolean(),
  userId: z.number().min(1),
});
export type UpdateTodoForm = z.infer<typeof UpdateTodoSchema>;
