import { create } from 'zustand';
import { ToDo } from '@prisma/client';
import axios from 'axios';
import { useAuthStore } from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().access_token; // Get the token directly from the store state

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Example: If token expires or is invalid, clear it from the store
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
      // You might also want to redirect to a login page here
    }
    return Promise.reject(error);
  },
);

type TodoStore = {
  todos: ToDo[];
  isLoading: boolean;
  error: any;
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
    axiosInstance
      .get<ToDo[]>(`/todo/user/${userId}`)
      .then(({ data }) => {
        set({
          todos: data.sort((a) => (a.completed ? 1 : -1)),
          isLoading: false,
        });
      })
      .catch((error) => set({ error, isLoading: false }));
  },
  createTodo: (todo, onSuccess) => {
    set({ isLoading: true });
    axiosInstance
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
    axiosInstance
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
    axiosInstance
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
