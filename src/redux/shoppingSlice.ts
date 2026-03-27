import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddItemPayload,
  EditItemPayload,
  ShoppingItem,
  ShoppingState,
} from "../../types";

const initialState: ShoppingState = {
  items: [],
  filter: "all",
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        ...action.payload,
        isPurchased: false,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newItem);
    },

    editItem: (state, action: PayloadAction<EditItemPayload>) => {
      const { id, ...updates } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          ...updates,
        };
      }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.isPurchased = !item.isPurchased;
      }
    },

    setFilter: (
      state,
      action: PayloadAction<"all" | "purchased" | "unpurchased">,
    ) => {
      state.filter = action.payload;
    },

    clearPurchasedItems: (state) => {
      state.items = state.items.filter((item) => !item.isPurchased);
    },

    clearAllItems: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  editItem,
  deleteItem,
  togglePurchased,
  setFilter,
  clearPurchasedItems,
  clearAllItems,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
