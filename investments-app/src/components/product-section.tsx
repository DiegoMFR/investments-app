import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import { Product } from '../types';
import { ProductList } from './product-list';
import './product-section.css';
import { ProducTotals } from './product-totals';

interface Props {
  clientId: string;
}

export const ProductSection = ({ clientId }: Props) => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['products', clientId],
    queryFn: () => fetchProducts(clientId),
  });

  const categorized = useMemo(() => {
    const pension = products.filter(p => p.type === 'pension_savings');
    const investment = products.filter(p => p.type === 'investment');

    const totalValue = (items: Product[]) =>
      items.reduce((sum, p) => sum + p.value, 0).toFixed(2);

    return {
      pension,
      investment,
      totals: {
        pension: totalValue(pension),
        investment: totalValue(investment),
      },
    };
  }, [products]);

  if (isLoading) return <p className="loading" aria-live="polite">Loading products...</p>;
  if (error instanceof Error) return <p className="error" aria-live="assertive">Error: {error.message}</p>;

  const renderSection = (title: string, items: Product[], type: 'pension' | 'investment') => (
    <section>
      <h2>{title}</h2>
      {items.length > 0
        ? <ProductList items={items} type={type} />
        : <p>No {type} products found.</p>}
    </section>
  );

  return (
    <div className="product-section">
      <ProducTotals totals={categorized.totals} />
      <hr />
      {renderSection('Pension Products', categorized.pension, 'pension')}
      <hr />
      {renderSection('Investment Products', categorized.investment, 'investment')}
      <hr />
    </div>
  );
};
