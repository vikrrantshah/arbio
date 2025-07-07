import { create } from 'zustand';
import { User } from '@prisma/client';
import { apiClient } from './api-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ARBIO_AUTH_TOKEN } from '../constants';
import { AxiosError } from 'axios';

type AuthStore = {
  isAuthenticated: boolean;
  isLoading: boolean;
  access_token: string | null;
  user: Omit<User, 'password'> | null;
  error: AxiosError | null;
  localLogin: () => void;
  login: (credentials: { email: string; password: string }) => void;
  register: (credentials: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  access_token: null,
  user: null,
  error: null,
  localLogin: () => {
    set({ isLoading: true });
    AsyncStorage.getItem(ARBIO_AUTH_TOKEN)
      .then((token) => {
        if (!token) return;
        const user = parseJWT(token);

        set({
          isLoading: false,
          access_token: token,
          isAuthenticated: true,
          user,
        });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  login: (credentials) => {
    set({ isLoading: true });
    apiClient
      .post<{ access_token: string }>('/login', credentials)
      .then(({ data: { access_token } }) => {
        const user = parseJWT(access_token);
        set({
          access_token,
          isAuthenticated: true,
          isLoading: false,
          user,
          error: null,
        });

        AsyncStorage.setItem(ARBIO_AUTH_TOKEN, access_token);
      })
      .catch((error) => {
        JSON.stringify(error, null, 2);
        set({ isLoading: false, error });
      });
  },
  register: (credentials) => {
    set({ isLoading: false });
    apiClient
      .post<{ access_token: string }>('/register', credentials)
      .then(({ data: { access_token } }) => {
        const user = parseJWT(access_token);
        console.log(user);
        set({
          access_token,
          isAuthenticated: true,
          isLoading: false,
          user,
          error: null,
        });

        AsyncStorage.setItem(ARBIO_AUTH_TOKEN, access_token);
      })
      .catch((error) => {
        set({ isLoading: false, error });
      });
  },
  logout: () => {
    set({ access_token: null, isAuthenticated: false });

    AsyncStorage.removeItem(ARBIO_AUTH_TOKEN);
  },
}));

const parseJWT = (token: string): Omit<User, 'password'> => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload) as Omit<User, 'password'>;
};
