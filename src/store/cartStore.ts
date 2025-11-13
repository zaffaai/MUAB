import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  creatorName: string;
  creatorAvatar: string;
  type: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const exists = items.find(i => i.id === item.id);
        if (!exists) {
          set({ items: [...items, item] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },
      getItemCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
