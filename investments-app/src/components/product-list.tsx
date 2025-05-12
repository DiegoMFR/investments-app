import { Link } from "react-router";
import { Product } from "../types";
import './product-list.css';

interface Props {
    items: Product[];
    type: 'pension' | 'investment';
}

export const ProductList = ({items, type}: Props) => (
    <ul className={`product-list ${type}`}>
      {items.map((product) => (
        <li key={product.iban} className="product-card">
          <div>
            <strong>{product.type.replace('_', ' ')}</strong>
            <p>Value: €{product.value.toFixed(2)} {product.currency}</p>
            <p>IBAN: {product.iban}</p>
            <p>Debit: {product.debit.amount} ({product.debit.frequency})</p>
          </div>
          <Link to={`/detail/${product.iban}`}>
            <button>View Details</button>
          </Link>
        </li>
      ))}
    </ul>
  );