import { authFetch } from './authFetch';

export interface Product {
  clientId: string;
  currency: string;
  type: 'investment' | 'pension_savings' | string; // expand as needed
  iban: string;
  debit: {
    amount: number;
    frequency: 'monthly' | 'weekly' | 'yearly' | string; // adjust allowed values
  };
  value: number;
}

export async function fetchProducts(clientId: string, iban?: string):Promise<Product[]> {
  const res = await authFetch(`/api/v1/products/${clientId}/${iban || ''}`);
  return res.json();
}