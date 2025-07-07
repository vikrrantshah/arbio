import { create } from 'zustand';
import { ToDo } from '@prisma/client';
import { useAuthStore } from '../auth/auth';
import { apiClient } from './api-client';
import { AxiosError } from 'axios';

type TodoStore = {
  todos: ToDo[];
  isLoading: boolean;
  error: AxiosError | null;
  getTodos: () => void;
  createTodo: (
    todo: Omit<ToDo, 'id' | 'completed'>,
    onSuccess: () => void,
  ) => void;
  updateTodo: (todo: ToDo, onSuccess: () => void) => void;
  deleteTodo: (todoId: ToDo['id'], onSuccess: () => void) => void;
};

export const useTodosStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  getTodos: () => {
    const userId = useAuthStore.getState().user?.id;
    set({ isLoading: true });
    apiClient
      .get<ToDo[]>(`/todo/user/${userId}`)
      .then(({ data }) => {
        set({
          todos: data
            .sort((a, b) => a.id - b.id)
            .sort((a) => (a.completed ? 1 : -1)),
          isLoading: false,
        });
      })
      .catch((error) => set({ error, isLoading: false }));
  },
  createTodo: (todo, onSuccess) => {
    set({ isLoading: true });
    apiClient
      .post<ToDo>('/todo', { ...todo, completed: false })
      .then(({ data }) => {
        const { todos } = get();
        todos.push(data);
        set({
          todos: todos.sort((a) => (a.completed ? 1 : -1)),
          isLoading: false,
        });
        onSuccess();
      })
      .catch((error) => set({ error, isLoading: false }));
  },
  updateTodo: (todo, onSuccess) => {
    const { id, ...restTodo } = todo;
    set({ isLoading: true });
    apiClient
      .patch<ToDo>(`/todo/${id}`, restTodo)
      .then(({ data }) => {
        const todos = get().todos.map((t) => {
          if (t.id !== data.id) return t;
          return data;
        });
        set({
          todos: todos.sort((a) => (a.completed ? 1 : -1)),
          isLoading: false,
        });
        onSuccess();
      })
      .catch((error) => set({ error, isLoading: false }));
  },
  deleteTodo: (todoId, onSuccess) => {
    set({ isLoading: true });
    apiClient
      .delete<ToDo>(`/todo/${todoId}`)
      .then(({ data }) => {
        set({
          todos: get().todos.filter((t) => t.id !== data.id),
          isLoading: false,
        });
        onSuccess();
      })
      .catch((error) => set({ error, isLoading: false }));
  },
}));
