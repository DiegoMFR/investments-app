import { Product } from '../types';
import { authFetch } from './authFetch';

export async function fetchProducts(clientId: string, iban?: string):Promise<Product[]> {
  const res = await authFetch(`/api/v1/products/${clientId}/${iban || ''}`);
  return res.json();
}