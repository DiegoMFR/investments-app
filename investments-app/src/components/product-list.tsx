import { Link } from 'react-router';
import { Product } from '../types';
import './product-list.css';
import { getCurrencySymbol } from '../utils/utils';

interface Props {
  items: Product[];
  type: 'pension' | 'investment';
}

export const ProductList = ({ items, type }: Props) => (
  <ul className={`product-list ${type}`}>
    {items.map((product) => (
      <li key={product.iban} className="product-card">
        <Link to={`/detail/${product.iban}`} className="product-card-link">

          <div className="product-content">
            <h4>{type === 'pension' ? 'Pension' : 'Investment'}</h4>
            <p className='iban'>{product.iban}</p>
            <p>Debit: {product.debit.amount} ({product.debit.frequency})</p>
          </div>
          <div className='product-value'>
            <h4 className='title'>
              Value:
            </h4>
            <span className='value'>
              {getCurrencySymbol(product.currency)}{product.value.toFixed(2)}
            </span>
          </div>
          <div className="product-arrow">›</div>

        </Link>
      </li>
    ))}
  </ul>
);
