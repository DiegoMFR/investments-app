import { useCallback, useState } from 'react';

export function useShadowMount(cssContent: string) {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  const mountToShadowRoot = useCallback((iframeDoc: Document, mountSelector: string) => {
    const section = iframeDoc.getElementById(mountSelector);
    if (!section) return;

    const shadow = section.attachShadow({ mode: 'open' });

    const styleEl = document.createElement('style');
    styleEl.textContent = cssContent;

    const mountPoint = document.createElement('div');
    shadow.append(styleEl, mountPoint);

    setShadowRoot(shadow);
  }, [cssContent]);

  return { shadowRoot, mountToShadowRoot };
}
