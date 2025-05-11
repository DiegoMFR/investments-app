import { useState } from 'react';
import LegacyEmbed from '../components/legacy-embed';
import { ProductSection } from '../components/product-section';
import { createPortal } from 'react-dom';
import globalStyles from '../components/product-section.css?inline';

export default function ProductOverview() {
  const clientId = sessionStorage.getItem('client_id') as string;
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  const handleIframeLoad = (iframeDoc: Document) => {
    const section = iframeDoc.getElementById('myreactapp');
    if (!section) return;

    // Attach Shadow DOM
    const shadow = section.attachShadow({ mode: 'open' });

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = globalStyles;
    shadow.appendChild(styleEl);

    // Create mount node
    const mountPoint = document.createElement('div');
    shadow.appendChild(mountPoint);

    setShadowRoot(shadow);
  };

  return (
    <div>
      <section>
      <ProductSection clientId={clientId} />
        <LegacyEmbed clientId={clientId} onLoad={handleIframeLoad} />
        {shadowRoot && createPortal(<ProductSection clientId={clientId} />, shadowRoot)}
      </section>
    </div>
  );
}
