export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // ISO string format
  createdAt?: string;
  updatedAt?: string;
}

export const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
  'Other',
] as const;

export type Category = typeof CATEGORIES[number];