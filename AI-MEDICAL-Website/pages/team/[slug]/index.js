import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../../../components/Layout'
import PageHead from '../../../components/PageHead'
import PageTitle from '../../../components/PageTitle'
import Button from '../../../components/Button'

import { specialties, doctors, doctor_specialty } from '../../../db/models'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { decode } from 'html-entities'

export default function TeamPage ({
  _nextI18Next: { initialLocale: locale },
  specialty,
  doctors: _doctors
}) {
  const { t } = useTranslation(['common'])
  const [currentPage, setCurrentPage] = useState(0)
  const [done, setDone] = useState(_doctors.length < 9)
  const [doctors, setDoctors] = useState(_doctors)

  const fetchDoctors = async () => {
    const fetchDoctors = await fetch(
      `/api/async/specialty?locale=${locale}&p=${currentPage + 1}&id=${
        specialty.id
      }`
    )
    if (fetchDoctors.status === 200) {
      const newDoctors = (await fetchDoctors.json()).data
      if (newDoctors.length < 9) {
        setDone(true)
      } else {
        setCurrentPage(p => p + 1)
      }
      if (newDoctors.length > 0) {
        setDoctors(doctors => [...doctors, ...newDoctors])
      }
    }
  }

  const breadcrumb = (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link href='/'>{t('Header.01')}</Link>
      </li>
      <li className='breadcrumb-item'>
        <Link href='/team'>{t('Header.04')}</Link>
      </li>
      <li className='breadcrumb-item' aria-current='page'>
        {specialty.name}
      </li>
    </ol>
  )

  return (
    <Layout
      title={specialty.metaname}
      description={specialty.metadesc}
      metaurl={`team/${specialty.slug}`}
    >
      <PageHead
        title={t('Header.04')}
        image='/images/TeamS0000.jpg'
        breadcrumb={breadcrumb}
        alttext={specialty.alttext}
      />

      <PageTitle underline shadow>
        <h2 className='size--xl text-dominant'>{specialty.name}</h2>
      </PageTitle>

      {specialty.description != null && specialty.description != '' ? (
        <p
          className='text-center px-3 py-4'
          style={{ maxWidth: 1000, margin: 'auto' }}
        >
          {decode(specialty.description)}
        </p>
      ) : null}

      <div className='main-container'>
        <div className='row text-center my-5'>
          {doctors.map((doctor, idx) => {
            return (
              <div className='col-6 col-lg-4' key={idx}>
                <div className='my-3 s-shadow'>
                  <div style={{ overflow: 'hidden' }}>
                    <img
                      src={doctor.picture}
                      alt={doctor.alttext}
                      className='w-100'
                    />
                  </div>
                  <div className='py-3 px-2 py-md-4'>
                    <PageTitle shadow>
                      <h2 className='size--xs text-dominant text-center'>
                        {doctor.name}
                      </h2>
                    </PageTitle>
                    <p className='text-dominant text-center'>{doctor.title}</p>
                    <div className='pt-3 pb-2'>
                      <div className='text-center'>
                        <Link
                          href={`${specialty.id}/doctor/${doctor.slug}`}
                          passHref
                        >
                          <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ display: 'inline-block' }}
                          >
                            <Button size='s' btnClass='text-dominant'>
                              {t('General.03')}
                            </Button>
                          </motion.a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {!done && (
          <div className='my-5'>
            <div className='text-center'>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchDoctors}
                style={{
                  display: 'inline-block',
                  backgroundColor: 'transparent',
                  border: 0
                }}
              >
                <Button rouded size='m' btnClass='bg-domiant text-white'>
                  {t('General.01')}
                </Button>
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ params, locale }) {
  const Op = require('sequelize').Op
  const specialty = await specialties.findOne({
    where: {
      slug: params.slug
    },
    attributes: [
      'id',
      'slug',
      `${locale}_name`,
      `${locale}_metaname`,
      `${locale}_metadesc`,
      'alttext',
      `${locale}_description`
    ]
  })

  if (specialty == null) {
    return {
      redirect: {
        destination: '/team',
        permanent: false
      }
    }
  }

  const res_doctors = await doctors.findAll({
    where: { visible: true },
    attributes: [
      'id',
      'slug',
      `${locale}_title`,
      `${locale}_name`,
      'picture',
      'alttext',
      'priority',
      'updated_at'
    ],
    include: [
      {
        model: doctor_specialty,
        where: { specialtyId: specialty.dataValues.id }
      }
    ],
    limit: 9,
    offset: 0,
    order: [
      ['priority', 'DESC'],
      ['updated_at', 'DESC']
    ]
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      specialty: {
        id: specialty.dataValues.id,
        slug: specialty.dataValues.slug,
        name: specialty.dataValues[`${locale}_name`],
        metaname: specialty.dataValues[`${locale}_metaname`],
        metadesc: specialty.dataValues[`${locale}_metadesc`],
        alttext: specialty.dataValues.alttext,
        description: specialty.dataValues[`${locale}_description`]
      },
      doctors: Array.from(res_doctors).map(doctor => {
        return {
          id: doctor.dataValues.id,
          picture: doctor.dataValues.picture,
          alttext: doctor.dataValues.alttext,
          slug: doctor.dataValues.slug,
          name: doctor.dataValues[`${locale}_name`],
          title: doctor.dataValues[`${locale}_title`]
        }
      })
    }
  }
}
