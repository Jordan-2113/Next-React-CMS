import Head from 'next/head'
import Router from 'next/router'
import Script from 'next/script'

import { appWithTranslation } from 'next-i18next'
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AnimatePresence } from 'framer-motion'
import { ConfigContextProvider } from '../configContext'
// import { metatags } from '../db/models';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap-icons/font/bootstrap-icons.css'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

import '../styles/styles.scss'

NProgress.configure({ showSpinner: false })

const AiMedical = ({ Component, pageProps, router }) => {
  React.useEffect(() => {
    // pageAnimationRef.current.start();
    // setTimeout(() => pageAnimationRef.current.end(), 5000)
    Router.events.on('routeChangeStart', url => {
      if (router.pathname !== url) {
        NProgress.start()
      }
    })
    Router.events.on('routeChangeComplete', () => {
      NProgress.done()
    })
    Router.events.on('routeChangeError', () => {
      NProgress.done()
    })
    window.addEventListener('load', () => {
      // prevent browser scroll to previous page scroll top on reload
      if (window.location.hash.length === 0) {
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 0)
      }
    })
    if (
      !!('undefined' != typeof document.documentElement.ontouchstart) == false
    ) {
      document.querySelector('html').classList.add('no-touch')
    }
  }, [router.pathname])

  return (
    <>
      {process.env.productionMode && (
        <>
          <Script
            strategy='afterInteractive'
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script strategy='afterInteractive'>
            {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', { page_path: window.location.pathname });
                        `}
          </Script>
          {/* Facebook Pixel Code */}
          <Script strategy='afterInteractive'>
            {`
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                            fbq('track', 'PageView');
                        `}
          </Script>
        </>
      )}
      <Head>
        {/* Dynamic Render */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='facebook-domain-verification'
          content='9e4hsd9klzbxequ54x4hrt9tb90z8v'
        />
        <meta name='author' content='bill' />

        <link rel='icon' href='/favicon.ico' />
        <noscript>
          <img
            height='1'
            width='1'
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=''
          />
        </noscript>
      </Head>
      <ConfigContextProvider>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component
            {...pageProps}
            key={router.route}
            currentRoute={router.route}
          />
        </AnimatePresence>
      </ConfigContextProvider>
    </>
  )
}

export default appWithTranslation(AiMedical)

// export async function getServerSideProps({ locale }) {
//     const results = await metatags.findAll({ attributes: ['id', `${locale}_title`, `${locale}_description`], order:[['priority','DESC']] });
//     console.log("this is first models results good lucky!!!!!!",results);
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['common'])),
//             metatags: Array.from(results).map(metatag => ({
//                 id: metatag.dataValues.id,
//                 title: metatag.dataValues[`${locale}_title`],
//                 description: metatag.dataValues[`${locale}_description`]
//             }))
//         }
//     }
// }
