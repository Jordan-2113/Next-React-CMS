import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { decode } from 'html-entities'

import 'bootstrap-icons/font/bootstrap-icons.css'

import Layout from '../../components/Layout'
import PageHead from '../../components/PageHead'
import Appearance from '../../components/Appearance'
import AsyncImage from '../../components/AsyncImage'

import { services, metatags } from '../../db/models'
import { stripHTML } from '../../helper'

export default function ServicesPage({ services, metatag }) {
  const { t } = useTranslation(['common'])

  const breadcrumb = (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link href='/'>{t('Header.01')}</Link>
      </li>
      <li className='breadcrumb-item' aria-current='page'>
        {t('Header.03')}
      </li>
    </ol>
  )

  return (
    <Layout
      title={metatag.title}
      description={metatag.description}
      metaurl='service'
    >
      <PageHead
        title={t('Header.03')}
        image='/images/ServicesS0000.jpg'
        breadcrumb={breadcrumb}
      />

      <div className='main-container'>
        {services.map((service, idx) => {
          const description = stripHTML(decode(service.description || ''))
          return (
            <div className='my-4' key={idx}>
              <div className='row align-items-center'>
                <div className='col-12 col-md-6 col-lg-5'>
                  <div
                    className='clip--tl clip--br'
                    style={{ overflow: 'hidden' }}
                  >
                    <Link href={`/service/${service.slug}`}>
                      <a>
                        <div
                          style={{ position: 'relative', paddingTop: '60%' }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%'
                            }}
                          >
                            <AsyncImage
                              src={service.picture}
                              alt={service.alttext}
                              className='w-100'
                              objectFit
                            />
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='col-12 col-md-6 col-lg-7'>
                  <div className='py-3 p-md-3'>
                    <h3 className='size--sm text-dominant pb-2'>
                      {service.title}
                    </h3>
                    <p className='text-gray'>
                      {description.length > 140
                        ? `${description.substring(0, 140)}...`
                        : description}
                    </p>
                    <div className='text-dominant text-right'>
                      <Link href={`/service/${service.slug}`}>
                        <a>
                          <Appearance triangle>{t('General.01')}</Appearance>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className='p-4'></div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ locale }) {
  const results = await services.findAll({
    attributes: [
      'id',
      'slug',
      `${locale}_title`,
      `${locale}_content`,
      'picture',
      'alttext'
    ],
    order: [
      ['priority', 'DESC'],
      ['updated_at', 'DESC']
    ]
  })
  const metatag = await metatags.findOne({
    where: { id: 3 },
    attributes: ['id', `${locale}_title`, `${locale}_description`]
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      services: Array.from(results).map(service => ({
        id: service.dataValues.id,
        slug: service.dataValues.slug,
        title: service.dataValues[`${locale}_title`],
        description: service.dataValues[`${locale}_content`],
        picture: service.dataValues.picture,
        alttext: service.dataValues.alttext
      })),
      metatag: {
        id: metatag.dataValues.id,
        title: metatag.dataValues[`${locale}_title`],
        description: metatag.dataValues[`${locale}_description`]
      }
    }
  }
}
