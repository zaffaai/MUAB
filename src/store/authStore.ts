import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AccountType = 'personal' | 'professional' | 'institution' | 'company' | 'enterprise';

export interface User {
  email: string;
  name: string;
  accountType: AccountType;
  handle: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Define personas for different account types
const personas: Record<string, User> = {
  'business@muab.info': {
    email: 'business@muab.info',
    name: 'Business Account',
    accountType: 'professional',
    handle: 'businessuser'
  },
  'personal@muab.info': {
    email: 'personal@muab.info',
    name: 'Personal User',
    accountType: 'personal',
    handle: 'personaluser'
  },
  'company@muab.info': {
    email: 'company@muab.info',
    name: 'Company Account',
    accountType: 'company',
    handle: 'companyuser'
  },
  'enterprise@muab.info': {
    email: 'enterprise@muab.info',
    name: 'Enterprise Account',
    accountType: 'enterprise',
    handle: 'enterpriseuser'
  },
  'institute@muab.info': {
    email: 'institute@muab.info',
    name: 'Institute Account',
    accountType: 'institution',
    handle: 'instituteuser'
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Check if email exists in personas and password is correct
        if (personas[email] && password === 'test123!') {
          set({
            user: personas[email],
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
