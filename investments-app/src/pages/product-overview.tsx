import { createPortal } from 'react-dom';
import { useShadowMount } from '../hooks/use-shadow-mount';
import { ProductSection } from '../components/product-section';
import styles from './product-overview.shadow.css?inline';
import LegacyEmbed from '../components/legacy-embed';

export default function ProductOverview() {
  const clientId = sessionStorage.getItem('client_id');
  const token = sessionStorage.getItem('access_token');

  const { shadowRoot, mountToShadowRoot } = useShadowMount(styles);

  if (!clientId || !token) return null;

  return (
    <>
    <ProductSection clientId={clientId} />
      {/* The embedded legacy page */}
      <LegacyEmbed
        url={`/product/overview/${clientId}?token=${encodeURIComponent(token)}`}
        title="Legacy Product Detail"
        onLoad={(doc) => mountToShadowRoot(doc, 'myreactapp')}
      />
      {/* The React component */}
      {shadowRoot && createPortal(<ProductSection clientId={clientId} />, shadowRoot)}
    </>
  );
}
