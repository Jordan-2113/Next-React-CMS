import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../components/Layout'
import PageHead from '../components/PageHead'
import AsyncImage from '../components/AsyncImage'
import DownloadAppBadge from '../components/DownloadAppBadge'
import PageTitle from '../components/PageTitle'
import { metatags } from '../db/models'

export default function AppPage ({ metatag }) {
  const { t } = useTranslation(['common'])

  const breadcrumb = (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link href='/'>{t('Header.01')}</Link>
      </li>
      <li className='breadcrumb-item' aria-current='page'>
        {t('Header.05')}
      </li>
    </ol>
  )

  const content1 = (
    <>
      <div className='py-3'>
        <PageTitle align='left' shadow>
          <h2 className='size--xxl text-dominant'>{t('App.S0101')}</h2>
        </PageTitle>
      </div>
      <p
        className='text-gray'
        dangerouslySetInnerHTML={{ __html: t('App.S0102') }}
      ></p>
      <PageTitle align='left'>
        <h2 className='text-dominant pb-2'>
          <a href='#'>{t('App.S0103')}</a>
        </h2>
      </PageTitle>
      <DownloadAppBadge noWrap align='left' qrcode='/images/FooterS0103.png' />
    </>
  )

  const content2 = (
    <div className='s-pm'>
      <div className='py-2'>
        <div className='size--md text-dominant'>{t('App.S0106')}</div>
      </div>
      <p className='text-gray'>{t('App.S0107')}</p>
      <AsyncImage
        src='/images/AppS0108.png'
        className='full-width pt-3'
        style={{ maxWidth: 550 }}
      />
    </div>
  )

  const content3 = (
    <div className='text-md-right s-pm'>
      <div className='py-2'>
        <div className='size--md text-dominant'>{t('App.S0109')}</div>
      </div>
      <p className='text-gray'>{t('App.S0110')}</p>
      <div className='py-2'>
        <div className='size--md text-dominant'>{t('App.S0111')}</div>
      </div>
      <p className='text-gray'>{t('App.S0112')}</p>
    </div>
  )

  const content4 = (
    <div className='s-pm'>
      <div className='py-2'>
        <div className='size--md text-dominant'>{t('App.S0115')}</div>
      </div>
      <p className='text-gray'>{t('App.S0116')}</p>
      <div className='py-2'>
        <div className='size--md text-dominant'>{t('App.S0117')}</div>
      </div>
      <p className='text-gray'>{t('App.S0118')}</p>
    </div>
  )

  return (
    <Layout
      title={metatag.title}
      description={metatag.description}
      metaurl='app'
    >
      <PageHead
        title={t('Header.05')}
        image='/images/AppS0000.jpg'
        breadcrumb={breadcrumb}
      />
      {/* <div className="main-container">
        <AsyncImage src="/images/app-placeholder.png" />
        <div className="py-5"></div>
      </div> */}

      <div className='main-container large no-padding bg--triangle'>
        <div className='main-container'>
          <div className='py-4'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-6 col-lg-7'>
                <div className='pb-4 pb-md-0'>{content1}</div>
              </div>
              <div className='col-12 col-md-6 col-lg-5'>
                <AsyncImage
                  src='/images/AppS0104.png'
                  alt='app'
                  className='w-100'
                />
              </div>
            </div>
          </div>

          {/* <div className="py-4">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-7 order-md-1">
                <div className="pb-3 pb-md-0">
                  {content2}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-5">
                <AsyncImage src="/images/AppS0105.png" alt="" className="w-100" />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className='main-container'>
        {/* <div className="my-4 py-3">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 col-lg-7">
              <div className="pb-1 pb-md-0">
                {content3}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <AsyncImage src="/images/AppS0113.png" alt="" className="w-100" />
            </div>
          </div>
        </div>

        <div className="my-4 py-3">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 col-lg-5">
              <AsyncImage src="/images/AppS0114.png" alt="" className="w-100" />
            </div>
            <div className="col-12 col-md-6 col-lg-7">
              {content4}
            </div>
          </div>
        </div> */}

        <div className='py-4 my-3 my-md-5 p-md-5'>
          <PageTitle>
            <h2 className='size--lg text-dominant'>{t('App.S0119')}</h2>
          </PageTitle>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ locale }) {
  const metatag = await metatags.findOne({
    where: { id: 5 },
    attributes: ['id', `${locale}_title`, `${locale}_description`]
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      metatag: {
        id: metatag.dataValues.id,
        title: metatag.dataValues[`${locale}_title`],
        description: metatag.dataValues[`${locale}_description`]
      }
    }
  }
}
