import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '../api/products';
import { useMemo } from 'react';
import './product-section.css';

interface Props {
  clientId: string;
}

export const ProductSection = ({ clientId }: Props) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['products', clientId],
    queryFn: () => fetchProducts(clientId),
  });

  const pensionProducts = useMemo(
    () => products?.filter((p) => p.type === 'pension_savings') || [],
    [products]
  );

  const investmentProducts = useMemo(
    () => products?.filter((p) => p.type === 'investment') || [],
    [products]
  );

  if (isLoading) return <p className="loading">Loading products...</p>;
  if (error instanceof Error)
    return <p className="error">Error loading products: {error.message}</p>;

  return (
    <div className="product-section">
      <h1>Product Overview</h1>

      <section>
        <h2>Pension Products</h2>
        <ul>
          {pensionProducts.map((p, index) => (
            <li key={index} className="pension">
              <span>€{p.value.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Investment Products</h2>
        <ul>
          {investmentProducts.map((p, index) => (
            <li key={index} className="investment">
              <span>€{p.value.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
