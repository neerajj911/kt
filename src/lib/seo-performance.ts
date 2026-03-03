/**
 * SEO & Performance Best Practices for Images
 * Use these utilities to optimize images for web performance and SEO
 */

/**
 * Generate responsive image with proper attributes
 * Usage: <img {...getResponsiveImageAttrs('hero', 'Demolition site', 'wide')} />
 */
export const getResponsiveImageAttrs = (
  src: string,
  alt: string,
  type: 'wide' | 'square' | 'portrait' = 'wide'
) => {
  const getAspectRatio = (t: string) => {
    switch (t) {
      case 'square':
        return '1/1';
      case 'portrait':
        return '2/3';
      default:
        return '16/9';
    }
  };

  return {
    src,
    alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    fetchPriority: 'low' as const,
    style: { aspectRatio: getAspectRatio(type) },
  };
};

/**
 * Performance hints for page optimization
 */
export const performanceHints = {
  /**
   * Critical Resources - Preload in HTML <head>
   */
  preloadCritical: [
    'Font files (Google Fonts, custom fonts)',
    'Above-the-fold images (hero images)',
    'Critical CSS',
  ],

  /**
   * Image Optimization
   */
  imageOptimization: [
    'Use next-gen formats: WebP with PNG fallback',
    'Lazy load below-fold images',
    'Use srcset for responsive images',
    'Compress images: TinyPNG, ImageOptim',
    'Use CDN for image delivery',
    'Generate WebP variants for all images',
  ],

  /**
   * Code Splitting & Lazy Loading
   */
  bundleOptimization: [
    'Use React.lazy() for route-based code splitting',
    'Dynamic imports for heavy components',
    'Implement route-based code splitting with React Router',
    'Monitor bundle size with webpack-bundle-analyzer',
  ],

  /**
   * Core Web Vitals
   */
  coreWebVitals: [
    'LCP (Largest Contentful Paint): < 2.5s',
    'FID (First Input Delay): < 100ms (deprecated, use INP)',
    'INP (Interaction to Next Paint): < 200ms',
    'CLS (Cumulative Layout Shift): < 0.1',
  ],

  /**
   * CSS & JS Optimization
   */
  frontendOptimization: [
    'Minimize and compress CSS/JS',
    'Remove unused CSS (PurgeCSS, Tailwind)',
    'Defer non-critical JavaScript',
    'Use async/defer for script loading',
    'Implement service workers for caching',
  ],
};

/**
 * Heading hierarchy best practice example
 * Only ONE H1 per page!
 */
export const headingHierarchy = {
  h1: 'Main page heading (only one per page) - "Professional Demolition Services"',
  h2: 'Section headings - "About Our Services", "Our Projects"',
  h3: 'Subsection headings - "Commercial Demolition", "Residential Cleanup"',
  h4: 'Minor headings within subsections',
};

/**
 * Alt text best practices
 */
export const altTextGuidelines = {
  tooShort: 'Image',
  tooLong: 'Picture of a large construction machine working on a demolition site with debris scattered across the ground on a sunny day',
  perfect: 'Excavator removing concrete debris from commercial demolition project',

  tips: [
    'Be descriptive but concise (125 characters max)',
    'Include keywords naturally (demolition, machinery, etc.)',
    'Describe context, not just "image of..."',
    'For decorative images, use empty alt="" ',
    'Never stuff keywords - write for users',
  ],
};

/**
 * Internal linking strategy
 */
export const internalLinkingStrategy = {
  homepage: [
    'Link to main service pages',
    'Link to case studies/projects',
    'Link to contact page',
    'Link to about page',
  ],

  servicePage: [
    'Link to related services',
    'Link to case studies using this service',
    'Link to contact page',
    'Link back to homepage',
  ],

  projectPage: [
    'Link to related services',
    'Link to similar projects',
    'Link to blog posts about similar work',
    'Link to contact page',
  ],

  tips: [
    'Use descriptive anchor text (avoid "click here")',
    'Keep navigation structure flat (< 3 clicks to any page)',
    'Use breadcrumb navigation',
    'Aim for 2-4 links per 1000 words',
  ],
};

/**
 * Local SEO Optimization
 */
export const localSEOOptimization = {
  googleMyBusiness: [
    'Complete your Google My Business profile',
    'Add high-quality business photos',
    'Respond to customer reviews',
    'Keep business hours updated',
    'Add service areas/delivery zones',
    'Add posts about promotions/updates',
  ],

  citations: [
    'Add business to local directories',
    'Yelp business page',
    'Better Business Bureau (BBB)',
    'Yellow Pages',
    'Local chamber of commerce',
  ],

  reviews: [
    'Ask satisfied customers for Google reviews',
    'Respond professionally to all reviews',
    'Use star ratings in structured data',
    'Showcase testimonials on website',
  ],

  localKeywords: [
    'Include city/region names in titles',
    'Create service area pages',
    'Add city-specific call-to-action',
    'Geo-targeted ad campaigns',
  ],
};

/**
 * Mobile SEO Specific
 */
export const mobileSEO = {
  mustHaves: [
    'Responsive design (not separate mobile site)',
    'Mobile-first indexing (mobile version is primary)',
    'Fast page load (< 3s on mobile networks)',
    'Touch-friendly buttons (48x48px minimum)',
    'No intrusive interstitials',
    'Legible fonts (16px minimum)',
    'Viewport meta tag configured',
  ],

  test: [
    'Google Mobile-Friendly Test',
    'PageSpeed Insights for mobile',
    'Test on actual devices (iPhone, Android)',
    'Check with mobile networks (3G/4G)',
  ],
};

/**
 * Export as object for easy reference
 */
export const seoPerformanceGuide = {
  performanceHints,
  headingHierarchy,
  altTextGuidelines,
  internalLinkingStrategy,
  localSEOOptimization,
  mobileSEO,
};
