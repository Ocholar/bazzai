import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  ogUrl?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  fbAppId?: string;
  fbDomainVerification?: string;
}

export function MetaTags({
  title,
  description,
  ogUrl,
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  fbAppId,
  fbDomainVerification,
}: MetaTagsProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update standard meta tags
    if (description) {
      updateMetaTag('description', description, false);
    }

    // Update Open Graph tags
    if (ogUrl) updateMetaTag('og:url', ogUrl);
    if (ogType) updateMetaTag('og:type', ogType);
    if (ogTitle) updateMetaTag('og:title', ogTitle);
    if (ogDescription) updateMetaTag('og:description', ogDescription);
    if (ogImage) updateMetaTag('og:image', ogImage);
    if (ogImageAlt) updateMetaTag('og:image:alt', ogImageAlt);
    if (fbAppId) updateMetaTag('fb:app_id', fbAppId);

    // Update Twitter tags
    if (twitterCard) updateMetaTag('twitter:card', twitterCard, false);
    if (twitterTitle) updateMetaTag('twitter:title', twitterTitle, false);
    if (twitterDescription) updateMetaTag('twitter:description', twitterDescription, false);
    if (twitterImage) updateMetaTag('twitter:image', twitterImage, false);

    // Update Facebook domain verification
    if (fbDomainVerification) updateMetaTag('facebook-domain-verification', fbDomainVerification, false);
  }, [
    title,
    description,
    ogUrl,
    ogType,
    ogTitle,
    ogDescription,
    ogImage,
    ogImageAlt,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    fbAppId,
    fbDomainVerification,
  ]);

  return null;
}
