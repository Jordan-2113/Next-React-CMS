import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../../components/Layout'
import PageHead from '../../components/PageHead'

import { specialties, metatags } from '../../db/models'

export default function TeamPage ({ categories, metatag }) {
  const { t } = useTranslation(['common'])

  const breadcrumb = (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link href='/'>{t('Header.01')}</Link>
      </li>
      <li className='breadcrumb-item' aria-current='page'>
        {t('Header.04')}
      </li>
    </ol>
  )

  return (
    <Layout
      title={metatag.title}
      description={metatag.description}
      metaurl='team'
    >
      <PageHead
        title={t('Header.04')}
        image='/images/TeamS0000.jpg'
        breadcrumb={breadcrumb}
      />

      <div className='main-container'>
        <div className='row'>
          <div className='col-12'>
            <p className='text-gray p-3 m-3'>{t('Team.S0101')}</p>
          </div>
        </div>

        <div className='pb-5 mb-4'>
          <div className='row m-1 team--table'>
            <div className='col-6 col-md-4 col-xl-3 py-3 py-md-4 border-right'></div>
            <div className='col-6 col-md-4 col-xl-3 py-3 py-md-4 border-right'></div>
            <div className='d-none d-md-block col-md-4 col-xl-3 py-2 py-md-4 border-right'></div>
            <div className='d-none d-xl-block col-xl-3 py-2 py-md-4 border-right'></div>

            {categories.map((cat, idx) => (
              <div
                key={idx}
                className='col-6 col-md-4 col-xl-3 px-0 py-md-1 border-right'
              >
                <Link href={`/team/${cat.slug}`}>
                  <a
                    className='d-flex px-2 py-3 tounch-TeamS01 touch justify-content-center align-items-center'
                    style={{ height: '100%' }}
                  >
                    <div className='text-center'>
                      <h3 className='size--md shadow--1'>{cat.name}</h3>
                    </div>
                  </a>
                </Link>
              </div>
            ))}

            <div className='col-6 col-md-4 col-xl-3 py-3 py-md-4 border-right'></div>
            <div className='col-6 col-md-4 col-xl-3 py-3 py-md-4 border-right'></div>
            <div className='d-none d-md-block col-md-4 col-xl-3 py-2 py-md-4 border-right'></div>
            <div className='d-none d-xl-block col-xl-3 py-2 py-md-4 border-right'></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ locale }) {
  const results = await specialties.findAll({
    attributes: ['id', `${locale}_name`, 'slug'],
    order: [['priority', 'DESC']]
  })
  const metatag = await metatags.findOne({
    where: { id: 4 },
    attributes: ['id', `${locale}_title`, `${locale}_description`]
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      categories: Array.from(results).map(specialty => ({
        id: specialty.dataValues.id,
        name: specialty.dataValues[`${locale}_name`],
        slug: specialty.dataValues.slug
      })),
      metatag: {
        id: metatag.dataValues.id,
        title: metatag.dataValues[`${locale}_title`],
        description: metatag.dataValues[`${locale}_description`]
      }
    }
  }
}
