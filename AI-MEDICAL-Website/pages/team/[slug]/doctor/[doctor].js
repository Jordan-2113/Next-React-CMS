import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../../../../components/Layout'
import PageHead from '../../../../components/PageHead'
import PageTitle from '../../../../components/PageTitle'

import { doctors, doctor_attainments, specialties } from '../../../../db/models'
import ArrowButton from '../../../../components/ArrowButton'
import ContactPopup from '../../../../components/ContactPopup'
import Popup from 'reactjs-popup'

export default function DoctorPage ({ doctor, specialty }) {
  const { t } = useTranslation(['common'])

  const breadcrumb = (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link href='/'>{t('Header.01')}</Link>
      </li>
      <li className='breadcrumb-item'>
        <Link href='/team'>{t('Header.04')}</Link>
      </li>
      <li className='breadcrumb-item'>
        <Link href={`/team/${specialty.id}`}>{specialty.name}</Link>
      </li>
      <li className='breadcrumb-item' aria-current='page'>
        {doctor.name}
      </li>
    </ol>
  )

  return (
    <Layout
      title={doctor.metaname}
      description={doctor.metadesc}
      metaurl={`team/${specialty.slug}/${doctor.slug}`}
    >
      <PageHead
        title={t('Header.04')}
        image='/images/TeamS0000.jpg'
        breadcrumb={breadcrumb}
      />

      <div className='main-container'>
        <div className='doctor--wrapper'>
          <div className='row'>
            <div className='col-12 col-sm-6 col-md-4'>
              <div style={{ maxWidth: 385, margin: '0 auto' }}>
                <img
                  src={doctor.picture}
                  alt={doctor.alttext}
                  className='w-100'
                />
                <div
                  className='s-shadow p-3'
                  style={{ borderTop: '5px solid #dc3545' }}
                >
                  <PageTitle shadow>
                    <h2
                      className='size--lg text-dominant text-center'
                      style={{ fontSize: 'calc(18px + 0.3vw)' }}
                    >
                      {doctor.name}
                    </h2>
                  </PageTitle>
                  <div className='text-dominant text-center shadow--1'>
                    {doctor.title}
                  </div>
                </div>

                <Popup
                  trigger={
                    <div className='d-none d-md-block my-4'>
                      <ArrowButton>立即預約</ArrowButton>
                    </div>
                  }
                  position='bottom center'
                  closeOnDocumentClick
                  modal
                >
                  {close => <ContactPopup onClose={close} />}
                </Popup>

                <div className='my-4'>
                  <ul className='doctor--qualifications'>
                    {doctor.attainments.map((el, idx) => (
                      <li key={idx}>
                        <p className='text-gray'>{el}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <Popup
                  trigger={
                    <div className='d-block d-md-none mb-4'>
                      <ArrowButton>立即預約</ArrowButton>
                    </div>
                  }
                  position='bottom center'
                  closeOnDocumentClick
                  modal
                >
                  {close => <ContactPopup onClose={close} />}
                </Popup>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-8'>
              <div className='doctor--profile'>
                <div className='row' style={{ marginTop: '-1em' }}>
                  <div className='doctor--title'>
                    <PageTitle align='left'>
                      <div className='col-12'>
                        <h2 className='size--sm text-dominant'>
                          {t('Member01.S0100')}
                        </h2>
                      </div>
                    </PageTitle>
                  </div>

                  <div className='col-12'>
                    <div
                      className='text-gray doctor--descrption'
                      dangerouslySetInnerHTML={{ __html: doctor.description }}
                    ></div>
                  </div>

                  <div className='doctor--title'>
                    <PageTitle align='left'>
                      <div className='col-12'>
                        <h2 className='size--sm text-dominant'>
                          {t('Member01.S0106')}
                        </h2>
                      </div>
                    </PageTitle>
                  </div>

                  <div className='col-12'>
                    <p className='text-gray'>{doctor.languages}</p>
                  </div>

                  <div className='doctor--title'>
                    <PageTitle align='left'>
                      <div className='col-12'>
                        <h2 className='size--sm text-dominant'>
                          {t('Member01.S0108')}
                        </h2>
                      </div>
                    </PageTitle>
                  </div>

                  <div className='col-12'>
                    <p className='text-gray'>{doctor.clinic}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ params, locale }) {
  const doctor = await doctors.findOne({
    where: {
      slug: params.doctor
    },
    attributes: [
      'id',
      'slug',
      `${locale}_metaname`,
      `${locale}_metadesc`,
      `${locale}_title`,
      `${locale}_name`,
      `${locale}_description`,
      `${locale}_dialect`,
      `${locale}_clinic`,
      'picture',
      'alttext'
    ],
    include: [{ model: doctor_attainments }]
  })
  const specialty = await specialties.findOne({
    where: {
      id: doctor.dataValues.id
    },
    attributes: ['id', `${locale}_name`, 'slug']
  })

  if (doctor == null) {
    return {
      redirect: {
        destination: `/team/${params.doctor}`,
        permanent: false
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      specialty: {
        id: specialty.dataValues.id,
        name: specialty.dataValues[`${locale}_name`],
        slug: specialty.dataValues.slug
      },
      doctor: {
        id: doctor.dataValues.id,
        picture: doctor.dataValues.picture,
        alttext: doctor.dataValues.alttext,
        attainments: doctor.dataValues.doctor_attainments.map(
          attainment => attainment[`${locale}_name`]
        ),
        slug: doctor.dataValues.slug,
        metaname: doctor.dataValues[`${locale}_metaname`],
        metadesc: doctor.dataValues[`${locale}_metadesc`],
        name: doctor.dataValues[`${locale}_name`],
        title: doctor.dataValues[`${locale}_title`],
        description: doctor.dataValues[`${locale}_description`],
        languages: doctor.dataValues[`${locale}_dialect`],
        clinic: doctor.dataValues[`${locale}_clinic`]
      }
    }
  }
}
