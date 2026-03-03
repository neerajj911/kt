/**
 * SEO Utilities for Kalwar Traders
 * Helpers for managing page meta tags and structured data
 */

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
}

const DEFAULT_TITLE = "Kalwar Traders | Demolition, Debris Removal & Scrap Recycling Services";
const DEFAULT_DESCRIPTION = "Professional demolition, debris removal, scrap buying, and heavy machinery rental services. 15+ years of industrial excellence.";
const DEFAULT_IMAGE = "https://kalwartraders.com/og-image.jpg";
const DEFAULT_URL = "https://kalwartraders.com";

/**
 * Update page title for SEO
 */
export const setPageTitle = (title: string, suffix = " | Kalwar Traders") => {
  document.title = title.includes("|") ? title : `${title}${suffix}`;
};

/**
 * Update meta description tag
 */
export const setMetaDescription = (description: string) => {
  let metaTag = document.querySelector('meta[name="description"]');
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "description");
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", description);
};

/**
 * Update Open Graph meta tags
 */
export const setOGTags = (props: SEOProps) => {
  const tags = {
    "og:title": props.title || DEFAULT_TITLE,
    "og:description": props.description || DEFAULT_DESCRIPTION,
    "og:image": props.image || DEFAULT_IMAGE,
    "og:url": props.url || DEFAULT_URL,
    "og:type": props.type || "website",
  };

  Object.entries(tags).forEach(([property, content]) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("property", property);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", content);
  });
};

/**
 * Update Twitter Card meta tags
 */
export const setTwitterTags = (props: SEOProps) => {
  const tags = {
    "twitter:title": props.title || DEFAULT_TITLE,
    "twitter:description": props.description || DEFAULT_DESCRIPTION,
    "twitter:image": props.image || DEFAULT_IMAGE,
    "twitter:card": "summary_large_image",
  };

  Object.entries(tags).forEach(([name, content]) => {
    let metaTag = document.querySelector(`meta[name="${name}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", name);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", content);
  });
};

/**
 * Add JSON-LD structured data to page
 */
export const addStructuredData = (data: Record<string, unknown>) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Generate complete SEO configuration
 */
export const configureSEO = (props: SEOProps) => {
  if (props.title) setPageTitle(props.title);
  if (props.description) setMetaDescription(props.description);
  setOGTags(props);
  setTwitterTags(props);
};

/**
 * Service schema generator
 */
export const generateServiceSchema = (
  serviceName: string,
  description: string,
  provider = "Kalwar Traders"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": provider,
      "url": DEFAULT_URL,
    },
    "areaServed": "US",
  };
};

/**
 * Breadcrumb schema generator
 */
export const generateBreadcrumbSchema = (items: Array<{name: string; url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
};

/**
 * FAQPage schema generator
 */
export const generateFAQSchema = (faqs: Array<{question: string; answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
};
