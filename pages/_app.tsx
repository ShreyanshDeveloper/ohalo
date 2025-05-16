// pages/_app.tsx
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import PreviewNotice from '@components/Atoms/PreviewNotice';
import Footer from '@components/Organisms/Footer';
import Navigation from '@components/Organisms/Navigation';
import NewsletterSignup from '@components/Organisms/NewsLetterSignup';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Seomatic } from 'react-seomatic';
import { useApollo } from 'src/graphql/apolloClient';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    // Initialize dataLayer for GTM
    window.dataLayer = window.dataLayer || [];

    // LinkedIn Insight: Partner ID setup
    const partnerId = '336138';
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(partnerId);

    // Dynamically inject LinkedIn Insight script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TZL32VV');
            `,
          }}
        />

        {/* LinkedIn Insight Tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "336138";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `,
          }}
        />
      </Head>

      {/* GTM <noscript> */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TZL32VV"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      {/* LinkedIn Insight <noscript> */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src="https://dc.ads.linkedin.com/collect/?pid=336138&fmt=gif"
        />
      </noscript>

      <Seomatic Head={Head} {...pageProps.seomatic} />
      <Navigation />
      <Component {...pageProps} />
      <NewsletterSignup />
      <Footer />
      <PreviewNotice preview={pageProps.preview} />
    </ApolloProvider>
  );
}

export default MyApp;
