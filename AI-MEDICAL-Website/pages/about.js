import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../components/Layout'
import PageHead from '../components/PageHead'
import HorzLine from '../components/HorzLine'
import PageTitle from '../components/PageTitle'
import AsyncImage from '../components/AsyncImage'
import { metatags } from '../db/models'

import AimPicture1 from '../public/images/about-aims-1.svg'
import AimPicture2 from '../public/images/about-aims-2.svg'
import AimPicture3 from '../public/images/about-aims-3.svg'
import AimPicture4 from '../public/images/about-aims-4.svg'

function TextRow01R ({ text, image }) {
  return (
    <div className='my-4'>
      <div className='row align-items-center'>
        <div className='col-lg-2'></div>
        <div className='col-auto text-sm-right text-lg-center order-lg-5'>
          <div style={{ width: '15vw', maxWidth: 120 }}>
            <AsyncImage src={image} alt='' />
          </div>
        </div>
        <div className='col col-lg-7 text-lg-right'>
          <div className='text-gray shadow--1'>{text}</div>
        </div>
      </div>
    </div>
  )
}

function TextRow01L ({ text, image }) {
  return (
    <div className='my-4'>
      <div className='row align-items-center'>
        <div className='col-auto text-sm-right text-lg-center order-lg-5'>
          <div style={{ width: '15vw', maxWidth: 120 }}>
            <AsyncImage src={image} alt='' />
          </div>
        </div>
        <div className='col col-lg-7 text-lg-right'>
          <div className='text-gray shadow--1'>{text}</div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage ({ metatag }) {
  const { t } = useTranslation(['common'])

  const breadcrumb = (
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link href='/'>{t('Header.01')}</Link>
      </li>
      <li className='breadcrumb-item' aria-current='page'>
        {t('Header.02')}
      </li>
    </ol>
  )

  return (
    <Layout
      title={metatag.title}
      description={metatag.description}
      metaurl='about'
    >
      <PageHead
        title={t('Header.02')}
        image='/images/AboutS0000.jpg'
        breadcrumb={breadcrumb}
      />

      <div>
        <div
          className='main-container large no-padding'
          style={{ transform: 'translateY(50%)' }}
        >
          <HorzLine>
            <PageTitle>
              <h2 className='size--xl text-dominant'>{t('About.S0101')}</h2>
            </PageTitle>
          </HorzLine>
        </div>

        <div className='main-container'>
          <div className='bg-light p-3 p-md-5'>
            <div className='about--quota'>
              <h3 className='size--xs text-dominant text-center'>
                {t('About.S0102')}
              </h3>
              <div
                className='about--quota-left'
                style={{
                  backgroundImage: `url("/images/about-quota-left.png")`
                }}
              ></div>
              <div
                className='about--quota-right'
                style={{
                  backgroundImage: `url("/images/about-quota-right.png")`
                }}
              ></div>
            </div>

            <div className='about--desc'>
              <p
                className='text-gray'
                dangerouslySetInnerHTML={{ __html: t('About.S0103') }}
              ></p>
            </div>
          </div>
        </div>

        <div className='main-container large p-md-0'>
          <div className='my-4 my-md-5'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-7 order-md-3'>
                <div className='d-none d-md-block'>
                  <img
                    src='/images/AboutS0105.jpg'
                    alt={t('About.S0104')}
                    className='w-100 clip--tl clip--bl object-fit-cover'
                    style={{ height: 460 }}
                  />
                </div>
                <div className='d-md-none'>
                  <img
                    src='/images/AboutS0105.jpg'
                    alt={t('About.S0104')}
                    className='w-100 clip--tl clip--bl clip--tr'
                  />
                </div>
              </div>
              <div className='col-12 col-md-5'>
                <div className='py-2 p-md-4 mx-xl-4'>
                  <h3 className='size--sm text-dominant pb-2'>
                    {t('About.S0104')}
                  </h3>
                  <div
                    className='text-gray shadow--1'
                    dangerouslySetInnerHTML={{ __html: t('About.S0105') }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className='my-4 my-md-5'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-7'>
                <div className='d-none d-md-block'>
                  <img
                    src='/images/AboutS0106.jpg'
                    alt={t('About.S0106')}
                    className='w-100 clip--tr clip--br object-fit-cover'
                    style={{ height: 460 }}
                  />
                </div>
                <div className='d-md-none'>
                  <img
                    src='/images/AboutS0106.jpg'
                    alt={t('About.S0106')}
                    className='w-100 clip--tl clip--br clip--tr'
                  />
                </div>
              </div>
              <div className='col-12 col-md-5'>
                <div className='py-2 p-md-4 mx-xl-4'>
                  <h3 className='size--sm text-dominant pb-2'>
                    {t('About.S0106')}
                  </h3>
                  <div
                    className='text-gray shadow--1'
                    dangerouslySetInnerHTML={{ __html: t('About.S0107') }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className='my-4 my-md-5'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-7 order-md-3'>
                <div className='d-none d-md-block'>
                  <img
                    src='/images/AboutS0107.jpg'
                    alt={t('About.S0108')}
                    className='w-100 clip--tl clip--bl object-fit-cover'
                    style={{ height: 460 }}
                  />
                </div>
                <div className='d-md-none'>
                  <img
                    src='/images/AboutS0107.jpg'
                    alt={t('About.S0108')}
                    className='w-100 clip--tl clip--bl clip--tr'
                  />
                </div>
              </div>
              <div className='col-12 col-md-5'>
                <div className='py-2 p-md-4 mx-xl-4'>
                  <h3 className='size--sm text-dominant pb-2'>
                    {t('About.S0108')}
                  </h3>
                  <div
                    className='text-gray shadow--1'
                    dangerouslySetInnerHTML={{ __html: t('About.S0109') }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className='my-4 my-md-5'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-7'>
                <div className='d-none d-md-block'>
                  <img
                    src='/images/AboutS0108.jpg'
                    alt={t('About.S0110')}
                    className='w-100 clip--tr clip--br object-fit-cover'
                    style={{ height: 460 }}
                  />
                </div>
                <div className='d-md-none'>
                  <img
                    src='/images/AboutS0108.jpg'
                    alt={t('About.S0110')}
                    className='w-100 clip--tl clip--br clip--tr'
                  />
                </div>
              </div>
              <div className='col-12 col-md-5'>
                <div className='py-2 p-md-4 mx-xl-4'>
                  <h3 className='size--sm text-dominant pb-2'>
                    {t('About.S0110')}
                  </h3>
                  <div
                    className='text-gray shadow--1'
                    dangerouslySetInnerHTML={{ __html: t('About.S0111') }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='main-container'>
        <div className='py-3 my-3'>
          <div className='d-lg-none'>
            <PageTitle underline shadow>
              <h2 className='size--sm text-dominant'>{t('About.S0201')}</h2>
            </PageTitle>
          </div>
          <div className='d-none d-lg-block'>
            <PageTitle align='left'>
              <h2 className='size--xl text-dominant'>{t('About.S0201')}</h2>
            </PageTitle>
          </div>

          <div className='py-4'>
            <div className='row align-items-stretch'>
              <div className='col-12 col-lg-8'>
                <TextRow01R text={t('About.S0202')} image={AimPicture1} />
                <TextRow01L text={t('About.S0203')} image={AimPicture2} />
                <TextRow01L text={t('About.S0204')} image={AimPicture3} />
                <TextRow01R text={t('About.S0205')} image={AimPicture4} />
              </div>

              <div className='d-none d-lg-block col-lg-4'>
                <div className='about--doctor'>
                  <div className='about--doctor-wrapper'>
                    <img src='/images/AboutS0210.jpg' alt='Image' />
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

export async function getServerSideProps ({ locale }) {
  const metatag = await metatags.findOne({
    where: { id: 2 },
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
