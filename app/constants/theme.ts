import { Category } from '../types';

export const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  background: '#f8fafc',
  cardBackground: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const CATEGORIES: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & vegetables',
    description: 'Fresh fruits & vegetables every day',
    icon: '🥕',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    description: 'Fresh bread every morning',
    icon: '🍞',
  },
  {
    id: 'beef',
    name: 'Beef',
    description: 'Premium quality beef',
    icon: '🥩',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    description: 'Fresh chicken products',
    icon: '🍗',
  },
  {
    id: 'dairy',
    name: 'Dairy',
    description: 'Milk, cheese & more',
    icon: '🥛',
  },
  {
    id: 'pantry',
    name: 'Pantry',
    description: 'Everyday essentials',
    icon: '🥫',
  },
];