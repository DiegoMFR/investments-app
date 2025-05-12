import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { useMemo } from 'react';
import './product-section.css';
import { Product } from '../types';
import { ProductList } from './product-list';

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

  const categorizedProducts = useMemo(() => {
    return {
      pension: products?.filter((p) => p.type === 'pension_savings') || [],
      investment: products?.filter((p) => p.type === 'investment') || [],
    };
  }, [products]);

  if (isLoading) return <p className="loading">Loading products...</p>;
  if (error instanceof Error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="product-section">
      <h1>Product Overview</h1>

      <section>
        <h2>Pension Products</h2>
        {categorizedProducts.pension.length > 0
          ? <ProductList items={categorizedProducts.pension} type="pension" />
          : <p>No pension products found.</p>}
      </section>

      <section>
        <h2>Investment Products</h2>
        {categorizedProducts.investment.length > 0
          ? <ProductList items={categorizedProducts.investment} type="investment" />
          : <p>No investment products found.</p>}
      </section>
    </div>
  );
};
