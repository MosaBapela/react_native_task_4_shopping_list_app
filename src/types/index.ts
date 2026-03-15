export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  category: string;
  isPurchased: boolean;
  createdAt: string;
}

export interface ShoppingState {
  items: ShoppingItem[];
  filter: 'all' | 'purchased' | 'unpurchased';
}

export interface RootState {
  shopping: ShoppingState;
}

export interface AddItemPayload {
  name: string;
  quantity: number;
  price: number;
  unit: string;
  category: string;
}

export interface EditItemPayload {
  id: string;
  name?: string;
  quantity?: number;
  price?: number;
  unit?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}