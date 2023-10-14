import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Shortcut from './Shortcut'
import BackToTop from './BackToTop'
import { useTranslation } from 'next-i18next'

export default function Layout ({ title, keywords, metaurl, description, children }) {
  const { t } = useTranslation(['common'])

  return (
    <div className='true'>
      <Head>
        <title>
          {title == null || title.length === 0
            ? process.env.NEXT_PUBLIC_PAGE_TITLE
            : `${title}`}
        </title>
        {title && <meta property='og:title' content={title} />}
        {title && <meta name='twitter:title' content={title} />}
        {description && <meta name='description' content={description} />}
        {description && <meta property='og:description' content={description} />}
        {description && <meta name='twitter:description' content={description} />}
        {keywords && <meta name='keywords' content={keywords} />}
        {metaurl && <meta property="og:url" content={`https://hkaimc.com/${metaurl}`}/> }
        {metaurl && <link rel="canonical" href={`https://hkaimc.com/${metaurl}`}/> }
      </Head>

      <Header />

      <div className='home--headline'>{t('General.07')}</div>

      <motion.div className='main-container--wrapper' exit={{ opacity: 0 }}>
        {children}
      </motion.div>

      <Footer />

      <Shortcut />

      <BackToTop />
    </div>
  )
}
