import { siteConfig } from '../config/siteConfig';

const LocalBusinessSchema = () => {
  const { global, seo, contact } = siteConfig;

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": global.name,
    "image": `${seo.baseUrl}${seo.openGraph.images[0].url}`,
    "@id": seo.baseUrl,
    "url": seo.baseUrl,
    "telephone": "", 
    "address": {
      "@type": "PostalAddress",
      "addressLocality": global.location.split(',')[0].trim(),
      "addressRegion": global.location.split(',')[1].trim(),
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.9519,
      "longitude": -83.3576
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": contact.socialLinks.map(link => link.url)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
