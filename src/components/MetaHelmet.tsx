import { useEffect } from "react";

export interface HelmetProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

/**
 * React Helmet-like component for managing meta tags
 * Usage: <MetaHelmet title="Page Title" description="Page description" />
 */
export const MetaHelmet = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
}: HelmetProps) => {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title.includes("|") ? title : `${title} | Kalwar Traders`;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // Update canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }

    // Update Open Graph tags
    const ogTags: Record<string, string> = {};
    if (title) ogTags["og:title"] = title;
    if (description) ogTags["og:description"] = description;
    if (ogImage) ogTags["og:image"] = ogImage;
    if (canonicalUrl) ogTags["og:url"] = canonicalUrl;
    ogTags["og:type"] = ogType;

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaOG = document.querySelector(`meta[property="${property}"]`);
      if (!metaOG) {
        metaOG = document.createElement("meta");
        metaOG.setAttribute("property", property);
        document.head.appendChild(metaOG);
      }
      metaOG.setAttribute("content", content);
    });

    // Update Twitter Card tags
    const twitterTags: Record<string, string> = {
      "twitter:card": twitterCard,
    };
    if (title) twitterTags["twitter:title"] = title;
    if (description) twitterTags["twitter:description"] = description;
    if (ogImage) twitterTags["twitter:image"] = ogImage;

    Object.entries(twitterTags).forEach(([name, content]) => {
      let metaTwitter = document.querySelector(`meta[name="${name}"]`);
      if (!metaTwitter) {
        metaTwitter = document.createElement("meta");
        metaTwitter.setAttribute("name", name);
        document.head.appendChild(metaTwitter);
      }
      metaTwitter.setAttribute("content", content);
    });
  }, [title, description, canonicalUrl, ogImage, ogType, twitterCard]);

  return null;
};

/**
 * Hook to programmatically update meta tags
 */
export const useMetaTags = (props: HelmetProps) => {
  useEffect(() => {
    if (props.title) {
      document.title = props.title.includes("|") ? props.title : `${props.title} | Kalwar Traders`;
    }
  }, [props.title, props.description, props.canonicalUrl, props.ogImage]);
};
