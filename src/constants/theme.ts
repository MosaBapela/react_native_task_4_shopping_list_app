import { Category } from "../types";

export const COLORS = {
  primary: "#16a34a", // vibrant green
  primaryDark: "#15803d",
  primaryLight: "#bbf7d0",
  accent: "#f59e0b", // amber accent
  background: "#f0fdf4", // very light green tint
  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  text: "#0f172a",
  textSecondary: "#475569",
  textMuted: "#94a3b8",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  success: "#16a34a",
  danger: "#dc2626",
  dangerLight: "#fee2e2",
  warning: "#f59e0b",
  warningLight: "#fef3c7",
  cardBackground: "#ffffff",
  headerBg: "#0f172a", // deep navy header
  headerText: "#ffffff",
  badge: "#16a34a",
  badgeText: "#ffffff",
  purchased: "#dcfce7",
  purchasedText: "#15803d",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  full: 9999,
};

export const SHADOW = {
  sm: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const CATEGORIES: Category[] = [
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    description: "Fresh produce daily",
    icon: "🥕",
  },
  {
    id: "bakery",
    name: "Bakery",
    description: "Fresh bread & pastries",
    icon: "🍞",
  },
  {
    id: "beef",
    name: "Beef",
    description: "Premium quality beef",
    icon: "🥩",
  },
  {
    id: "chicken",
    name: "Chicken",
    description: "Fresh chicken products",
    icon: "🍗",
  },
  {
    id: "dairy",
    name: "Dairy",
    description: "Milk, cheese & more",
    icon: "🥛",
  },
  {
    id: "pantry",
    name: "Pantry",
    description: "Everyday essentials",
    icon: "🥫",
  },
];
