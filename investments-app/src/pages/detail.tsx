import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";
import { getCurrencySymbol } from "../utils/utils";
import { fetchProductByIban } from "../api/products";
import './detail.css';

export default function Detail() {
  const { clientId, iban } = useParams<{ clientId: string; iban: string }>();

  const isReady = !!clientId && !!iban;

  const {
    data,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['product-detail', clientId, iban],
    queryFn: () => fetchProductByIban(clientId!, iban!),
    enabled: isReady,
  });

  if (!isReady) {
    return <p className="detail-message error">Missing client or product information.</p>;
  }

  if (isLoading) {
    return <p className="detail-message">Loading product details...</p>;
  }

  if (error instanceof Error) {
    return <p className="detail-message error">Error: {error.message}</p>;
  }

  const product = data?.[0];

  if (!product) {
    return <p className="detail-message">Product not found.</p>;
  }

  return (
    <div className="detail-container">
      <h1 className="detail-title">Product Details</h1>
      <div className="detail-card">
        <p><strong>Type:</strong> {product.type.replace('_', ' ')}</p>
        <p><strong>Value:</strong> {getCurrencySymbol(product.currency)}{product.value.toFixed(2)}</p>
        <p><strong>Currency:</strong> {product.currency}</p>
        <p><strong>IBAN:</strong> {product.iban}</p>
        <p><strong>Debit:</strong> {product.debit.amount} ({product.debit.frequency})</p>
      </div>
    </div>
  );
}
