import { useEffect, useRef } from "react";

interface Props {
  url: string;
  title?: string;
  onLoad?: (iframeDocument: Document) => void;
}

export default function LegacyEmbed({ url, title, onLoad }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);


  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc && onLoad) onLoad(doc);
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [onLoad]);

  return (
      <iframe
        ref={iframeRef}
        src={url}
        title={title}
        style={{ height: '100vh', width: '100vw', border: 'none' }}
      />
  );
}
