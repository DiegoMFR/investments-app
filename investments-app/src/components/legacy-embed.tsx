import { useEffect, useRef } from "react";

interface Props {
  clientId: string;
  onLoad?: (iframeDocument: Document) => void;
}

// TODO decouple source requests from the iframe
export default function LegacyEmbed({ clientId, onLoad }: Props) {
  const token = sessionStorage.getItem('access_token');
  const src = `/product/overview/${clientId}?token=${encodeURIComponent(token!)}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);


  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      // const styleTags = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));

      // styleTags.forEach((tag) => {
      //   doc?.head.appendChild(tag.cloneNode(true));
      // });  
      
      if (doc && onLoad) onLoad(doc);
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [onLoad]);

  return (
      <iframe
        ref={iframeRef}
        src={src}
        title="Legacy Product Detail"
        style={{ height: '100vh', width: '100vw', border: 'none' }}
      />
  );
}
