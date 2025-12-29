import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const siteTitle = "Vertex Global Tech";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description || "Vertex Global Tech - Premium Digital Solutions"} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
    </HelmetProvider>
  );
}
