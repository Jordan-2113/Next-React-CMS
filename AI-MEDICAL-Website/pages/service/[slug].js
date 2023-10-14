import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../../components/Layout'
import PageHead from '../../components/PageHead'
import PageTitle from '../../components/PageTitle'
import AsyncImage from '../../components/AsyncImage'

import { services } from '../../db/models'

export default function ServicePage ({ service }) {
  const { t } = useTranslation(['common'])

  const breadcrumb = (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link href='/'>{t('Header.01')}</Link>
      </li>
      <li className='breadcrumb-item'>
        <Link href='/service'>{t('Header.03')}</Link>
      </li>
      <li className='breadcrumb-item' aria-current='page'>
        {service.title}
      </li>
    </ol>
  )

  return (
    <Layout
      title={service.metaname}
      metaurl={`service/${service.slug}`}
      description={service.metadesc}
    >
      <PageHead
        title={t('Header.03')}
        image='/images/ServicesS0000.jpg'
        breadcrumb={breadcrumb}
      />

      <div className='main-container'>
        <PageTitle underline underlineMaxWidth shadow>
          <h2 className='size--xl text-dominant'>{service.title}</h2>
        </PageTitle>
        <div className='my-5'>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-5'>
              <AsyncImage
                src={service.picture}
                alt={service.alttext}
                className='w-100'
              />
            </div>
            <div className='col-12 col-md-6 col-lg-7'>
              <div className='py-3 py-md-0 px-md-3'>
                <div
                  className='text-gray'
                  dangerouslySetInnerHTML={{ __html: service.description }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ params, locale }) {
  const Op = require('sequelize').Op
  const service = await services.findOne({
    where: {
      slug: params.slug
    },
    attributes: [
      'id',
      'slug',
      `${locale}_metaname`,
      `${locale}_metadesc`,
      `${locale}_title`,
      `${locale}_content`,
      'alttext',
      'picture'
    ]
  })

  if (service == null) {
    return {
      redirect: {
        destination: '/service',
        permanent: false
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      service: {
        id: service.dataValues.id,
        slug: service.dataValues.slug,
        metaname: service.dataValues[`${locale}_metaname`],
        metadesc: service.dataValues[`${locale}_metadesc`],
        title: service.dataValues[`${locale}_title`],
        description: service.dataValues[`${locale}_content`],
        picture: service.dataValues.picture,
        alttext: service.dataValues.alttext
      }
    }
  }
}
