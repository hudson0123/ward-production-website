import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteConfig } from '../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const SEO = ({ title, description, image, article }: SEOProps) => {
  const { asPath } = useRouter();
  const { seo } = siteConfig;

  const seoTitle = title 
    ? seo.titleTemplate.replace('%s', title) 
    : seo.defaultTitle;
  
  const seoDescription = description || seo.defaultDescription;
  const seoImage = `${seo.baseUrl}${image || seo.openGraph.images[0].url}`;
  const seoUrl = `${seo.baseUrl}${asPath}`;

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="image" content={seoImage} />
      <meta name="keywords" content={seo.keywords.join(', ')} />

      {seoUrl && <meta property="og:url" content={seoUrl} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seoTitle && <meta property="og:title" content={seoTitle} />}
      {seoDescription && (
        <meta property="og:description" content={seoDescription} />
      )}
      {seoImage && <meta property="og:image" content={seoImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      {seo.twitter.handle && (
        <meta name="twitter:creator" content={seo.twitter.handle} />
      )}
      {seoTitle && <meta name="twitter:title" content={seoTitle} />}
      {seoDescription && (
        <meta name="twitter:description" content={seoDescription} />
      )}
      {seoImage && <meta name="twitter:image" content={seoImage} />}
      
      <link rel="canonical" href={seoUrl} />
    </Head>
  );
};

export default SEO;
