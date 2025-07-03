import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  token: null,
  login: (token) => set({ token, isAuthenticated: true }),
  logout: () => set({ token: null, isAuthenticated: false }),
}));
