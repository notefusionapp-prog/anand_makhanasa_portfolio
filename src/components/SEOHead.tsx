import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'profile' | 'article';
  ogImage?: string;
  structuredData?: object | object[];
}

const DOMAIN = 'https://anandmakhanasa.com';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage = `${DOMAIN}/og-image.png`,
  structuredData,
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // 3. Canonical Link
    const fullCanonical = `${DOMAIN}${canonicalPath}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonical;

    // 4. OpenGraph Tags
    const setMetaProperty = (prop: string, val: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.content = val;
    };

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', fullCanonical);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:image', ogImage);
    setMetaProperty('og:site_name', 'Anand Makhanasa');

    // 5. Twitter Card Tags
    const setMetaName = (name: string, val: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = val;
    };

    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', ogImage);

    // 6. Dynamic Structured Data JSON-LD
    const SCRIPT_ID = 'route-dynamic-jsonld';
    let existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.getElementById(SCRIPT_ID);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, canonicalPath, ogType, ogImage, structuredData]);

  return null;
};
