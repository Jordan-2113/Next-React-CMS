import Link from 'next/link'
import Layout from '../components/Layout'

import SwiperCore, { Navigation, Thumbs } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import 'bootstrap-icons/font/bootstrap-icons.css'

import HomeS02 from '../components/HomeS02'
import HomeS04 from '../components/HomeS04'

import Button from '../components/Button'
import PageTitle from '../components/PageTitle'
import Appearance from '../components/Appearance'
import AsyncImage from '../components/AsyncImage'

import { services, specialties, banners, metatags } from '../db/models'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { serialize } from 'object-to-formdata'
import { useRouter } from 'next/router'
import Tippy from '@tippyjs/react'
import Popup from 'reactjs-popup'

import WeChat from '../public/images/wechat.png'
import Facebook from '../public/images/facebook.png'
import Twitter from '../public/images/twitter.png'

import HomeBanner from '../public/images/home-banner.jpg'
import ContactPopup from '../components/ContactPopup'

SwiperCore.use([Navigation, Thumbs])

export default function HomePage ({ services, specialties, banners, metatag }) {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  })
  const [sending, setSending] = React.useState(false)
  const bannerSwiperRef = React.useRef(null)
  const specialtySwiperRef = React.useRef(null)
  const serviceSwiperRef = React.useRef(null)
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const { t } = useTranslation(['common'])

  const onSubmit = async data => {
    setSending(true)
    const resp = await fetch(`/api/contact`, {
      method: 'POST',
      body: serialize(data)
    })
      .catch(() => {
        // setFormMsg("暫時無法發送請求，請稍後再嘗試");
      })
      .finally(() => {
        setSending(false)
      })
    if (resp == null) return
    if (!resp.ok) {
      // setFormMsg("暫時無法發送請求，請稍後再嘗試");
      return
    }
    router.reload()
  }

  return (
    <Layout title={metatag.title} description={metatag.description} metaurl=' '>
      <div className='home--social'>
        {t('Home.S0201')}
        <div className='home--social-icons'>
          <Tippy content={t('General.04')} animation='scale-subtle'>
            <a
              whilehover={{ scale: 1.05 }}
              whiletap={{ scale: 0.95 }}
              href='#'
              style={{ display: 'inline-block' }}
            >
              <AsyncImage src={WeChat} alt='Wechat' className='w-100' />
            </a>
          </Tippy>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href='https://www.facebook.com/AIMC.HONGKONG/'
            style={{ display: 'inline-block' }}
          >
            <AsyncImage src={Facebook} alt='Facebook' className='w-100' />
          </motion.a>
          <Tippy content={t('General.04')} animation='scale-subtle'>
            <a
              whilehover={{ scale: 1.05 }}
              whiletap={{ scale: 0.95 }}
              href='#'
              style={{ display: 'inline-block' }}
            >
              <AsyncImage src={Twitter} alt='Twitter' className='w-100' />
            </a>
          </Tippy>
        </div>
      </div>

      <div className='home--banner'>
        <div className='home--banner-bg'></div>
        <div className='home--banner-wrapper'></div>
        <div className='home--banner-swiper'>
          {mounted && (
            <Swiper
              spaceBetween={18}
              loop={true}
              onSwiper={swiper => (bannerSwiperRef.current = swiper)}
            >
              <SwiperSlide>
                <Popup
                  trigger={
                    <button
                      className='home--banner-swiper-picture'
                      style={{ backgroundImage: `url(${HomeBanner})` }}
                    />
                  }
                  position='bottom center'
                  closeOnDocumentClick
                  modal
                >
                  {close => <ContactPopup onClose={close} />}
                </Popup>
              </SwiperSlide>
              {banners.map((banner, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Link href={banner.link || ''}>
                      <a>
                        <div
                          className='home--banner-swiper-picture'
                          style={{ backgroundImage: `url(${banner.picture})` }}
                        ></div>
                      </a>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          )}
          <div className='home--banner-swiper-pagination'>
            <button
              type='button'
              style={{ backgroundImage: 'url(/images/arrow-right.svg)' }}
              onClick={() => bannerSwiperRef.current?.slidePrev()}
            ></button>
            <button
              type='button'
              style={{ backgroundImage: 'url(/images/arrow-right.svg)' }}
              onClick={() => bannerSwiperRef.current?.slideNext()}
            ></button>
          </div>
        </div>
      </div>

      <div className='home--info'>
        <HomeS02 data={t} specialties={specialties} />
      </div>

      <div className=''>
        <div className='main-container'>
          <div className='py-5'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-6 col-lg-7 order-md-3'>
                <div className='pb-3 pb-md-0 pl-md-3'>
                  <div className='py-3'>
                    <PageTitle align='left' underline shadow>
                      <h2 className='size--sm text-dominant'>
                        {t('Home.S0308')}
                      </h2>
                    </PageTitle>
                  </div>
                  <p
                    className='text-gray py-3 shadow--1'
                    dangerouslySetInnerHTML={{ __html: t('Home.S0309') }}
                  ></p>
                  <div className='my-3'>
                    <div className='text-center'>
                      <Link href='/about' passHref>
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          style={{ display: 'inline-block' }}
                        >
                          <Button
                            rouded
                            size='m'
                            btnClass='bg-domiant text-white'
                          >
                            {t('General.01')}
                          </Button>
                        </motion.a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-5'>
                <AsyncImage
                  src='/images/HomeS0307.jpg'
                  alt={t('Home.S0308')}
                  className='w-100'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <HomeS04 data={t} />
      </div>

      <div className='py-5 border-bottom'>
        <div className='main-container'>
          <div className='pb-4'>
            <div className='row align-items-center'>
              <div className='col-12 col-md-6 col-lg-7'>
                <div className='pb-3 pb-md-0'>
                  <div className='py-3'>
                    <PageTitle align='left' underline shadow>
                      <h2 className='size--sm text-dominant'>
                        {t('Home.S0301')}
                      </h2>
                    </PageTitle>
                  </div>
                  <div className=''>
                    <PageTitle align='left' shadow>
                      <h2 className='size--xxl text-dominant'>
                        {t('Home.S0302')}
                      </h2>
                    </PageTitle>
                  </div>
                  <p className='text-gray py-3 shadow--1'>{t('Home.S0303')}</p>
                  <div className='text-center' style={{ maxWidth: 520 }}>
                    <div className='row'>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-1.png'
                          className='px-2'
                          alt={t('Home.S03031')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03031')}
                        </h3>
                      </div>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-2.png'
                          className='px-2'
                          alt={t('Home.S03032')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03032')}
                        </h3>
                      </div>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-3.png'
                          className='px-2'
                          alt={t('Home.S03033')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03033')}
                        </h3>
                      </div>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-4.png'
                          className='px-2'
                          alt={t('Home.S03034')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03034')}
                        </h3>
                      </div>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-5.png'
                          className='px-2'
                          alt={t('Home.S03035')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03035')}
                        </h3>
                      </div>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-6.png'
                          className='px-2'
                          alt={t('Home.S03036')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03036')}
                        </h3>
                      </div>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-7.png'
                          className='px-2'
                          alt={t('Home.S03037')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03037')}
                        </h3>
                      </div>
                      <div className='col-6 col-sm-3 col-md-4 col-lg-3'>
                        <AsyncImage
                          src='/images/about-8.png'
                          className='px-2'
                          alt={t('Home.S03038')}
                        />
                        <h3
                          className='text-dominant pt-1 pb-2'
                          style={{
                            fontSize: 'calc(20px + 1vw * .1)',
                            fontWeight: 600,
                            lineHeight: 1.65
                          }}
                        >
                          {t('Home.S03038')}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className='py-3'>
                    <div className='text-center'>
                      <Link href='/app' passHref>
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          style={{ display: 'inline-block' }}
                        >
                          <Button
                            rouded
                            size='m'
                            btnClass='bg-domiant text-white'
                          >
                            {t('General.01')}
                          </Button>
                        </motion.a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-6 col-lg-5'>
                <AsyncImage
                  src='/images/HomeS0306.png'
                  alt={t('Home.S0302')}
                  className='w-100'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='py-3'>
                <PageTitle underline shadow>
                  <h2 className='size--sm text-dominant'>{t('Home.S0701')}</h2>
                </PageTitle>
              </div>
            </div>
          </div>

          <div className='py-4 px-2'>
            <div className='row align-items-center flex-nowrap'>
              <div className='col-auto'>
                <button
                  style={{ border: 0, padding: 0 }}
                  onClick={() => specialtySwiperRef.current?.slidePrev()}
                >
                  <img
                    src='/images/home-team-left.png'
                    alt='Prev'
                    width='40px'
                  />
                </button>
              </div>

              <div className='col' style={{ overflow: 'hidden' }}>
                {mounted && (
                  <Swiper
                    spaceBetween={25}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                      },
                      680: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                      },
                      1100: {
                        slidesPerView: 3,
                        slidesPerGroup: 3
                      },
                      1400: {
                        slidesPerView: 4,
                        slidesPerGroup: 4
                      }
                    }}
                    loop={true}
                    onSwiper={swiper => (specialtySwiperRef.current = swiper)}
                  >
                    {specialties.map((specialty, idx) => {
                      return (
                        <SwiperSlide key={idx}>
                          <Link href={`/team/${specialty.id}`}>
                            <a>
                              <div className='home--slide'>
                                <div className='home--slide-wrapper'>
                                  <div className='home--slide-icon'>
                                    <div className='home--slide-icon-wrapper'>
                                      <img
                                        src={
                                          specialty.icon ||
                                          '/images/specialties/default.png'
                                        }
                                        alt={specialty.name}
                                      />
                                    </div>
                                  </div>
                                  <h3 className='size--xs px-3 text-center text-dominant font-weight-bold d-lg-none'>
                                    {specialty.name}
                                  </h3>
                                </div>
                                <h3 className='home--slide-text size--xs font-weight-bold text-white'>
                                  {specialty.name}
                                </h3>
                              </div>
                            </a>
                          </Link>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                )}
              </div>

              <div className='col-auto'>
                <button
                  style={{ border: 0, padding: 0 }}
                  onClick={() => specialtySwiperRef.current?.slideNext()}
                >
                  <img
                    src='/images/home-team-right.png'
                    alt='Next'
                    width='40px'
                  />
                </button>
              </div>
            </div>
          </div>

          <div className='my-3'>
            <div className='text-center'>
              <Link href='/team' passHref>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: 'inline-block' }}
                >
                  <Button rouded size='m' btnClass='bg-domiant text-white'>
                    {t('General.02')}
                  </Button>
                </motion.a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <div className='py-5'>
          <div className='main-container'>
            <div className='row'>
              <div className='col-12'>
                <div className='py-3'>
                  <PageTitle underline shadow>
                    <h2 className='size--sm text-dominant'>
                      {t('Home.S0501')}
                    </h2>
                  </PageTitle>
                </div>
              </div>
            </div>

            <div className='row align-items-center flex-nowrap'>
              <div className='col-auto'>
                <button
                  style={{ border: 0, padding: 0 }}
                  onClick={() => serviceSwiperRef.current?.slidePrev()}
                >
                  <img
                    src='/images/home-team-left.png'
                    alt='Prev'
                    width='40px'
                  />
                </button>
              </div>

              <div className='col' style={{ overflow: 'hidden' }}>
                {mounted && (
                  <Swiper
                    spaceBetween={25}
                    breakpoints={{
                      0: {
                        slidesPerView: 1
                      },
                      768: {
                        slidesPerView: 2
                      },
                      992: {
                        slidesPerView: 3
                      }
                    }}
                    loop={true}
                    onSwiper={swiper => (serviceSwiperRef.current = swiper)}
                  >
                    {services.map((service, idx) => {
                      return (
                        <SwiperSlide key={idx}>
                          <div className='text-center' key={idx}>
                            <div className='card border-0 mx-1 my-3'>
                              <div className='card-body p-0 s-shadow'>
                                <div
                                  style={{
                                    position: 'relative',
                                    paddingTop: '60%'
                                  }}
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
                                      className='w-100'
                                      objectFit
                                      alt={service.title}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className='border-D'>
                                    <h3
                                      className='size--xs text-black p-3 my-3'
                                      style={{ fontWeight: 'bold' }}
                                    >
                                      {service.title}
                                    </h3>
                                  </div>
                                  <div className='text-dominant p-2 m-2'>
                                    <Link href={`/service/${service.id}`}>
                                      <a>
                                        <Appearance triangle>
                                          {t('General.01')}
                                        </Appearance>
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                )}
              </div>

              <div className='col-auto'>
                <button
                  style={{ border: 0, padding: 0 }}
                  onClick={() => serviceSwiperRef.current?.slideNext()}
                >
                  <img
                    src='/images/home-team-right.png'
                    alt='Next'
                    width='40px'
                  />
                </button>
              </div>
            </div>
            <div className='my-3'>
              <div className='text-center'>
                <Link href='/service' passHref>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Button rouded size='m' btnClass='bg-domiant text-white'>
                      {t('General.02')}
                    </Button>
                  </motion.a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='home--contact-bg'
        style={{ backgroundImage: `url("/images/home-contact-bg.jpg")` }}
      >
        <div className='home--contact'>
          <div className='main-container'>
            <div className='py-4'>
              <div className='py-4'>
                <PageTitle underline shadow>
                  <h2 className='size--sm text-white'>{t('Home.S0601')}</h2>
                </PageTitle>
              </div>

              <form
                className='px-md-3 px-lg-5'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='py-md-3'>
                  <div className='row'>
                    <label
                      htmlFor='name'
                      className='text-white col-md-2 col-form-label text-md-end'
                    >
                      {t('Home.S0602')}*
                    </label>
                    <div className='col-md-4'>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        {...register('name', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className='py-md-3'>
                  <div className='row'>
                    <label
                      htmlFor='telnum'
                      className='text-white col-md-2 col-form-label text-md-end'
                    >
                      {t('Home.S0603')}*
                    </label>
                    <div className='col-md-4'>
                      <input
                        type='tel'
                        className='form-control'
                        id='telnum'
                        {...register('phone', {
                          required: true,
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Please enter a number'
                          }
                        })}
                      />
                    </div>
                    <label
                      htmlFor='email'
                      className='text-white col-md-2 col-form-label text-md-end'
                    >
                      {t('Home.S0604')}*
                    </label>
                    <div className='col-md-4'>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        {...register('email', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className='py-md-3'>
                  <div className='row'>
                    <label
                      htmlFor='content'
                      className='text-white col-md-2 col-form-label text-md-end'
                    >
                      {t('Home.S0605')}
                    </label>
                    <div className='col-md-10'>
                      <textarea
                        className='form-control'
                        id='content'
                        style={{ height: 90 }}
                        {...register('content')}
                      />
                    </div>
                  </div>
                </div>

                <div className='py-4'>
                  <div className='text-center'>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'inline-block',
                        border: 0,
                        backgroundColor: 'transparent'
                      }}
                      disabled={sending}
                    >
                      <Button rouded size='m' btnClass='bg-danger text-white'>
                        {t('Home.S0606')}
                      </Button>
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ locale }) {
  const res_specialties = await specialties.findAll({
    attributes: ['id', 'icon', `${locale}_name`],
    order: [['priority', 'DESC']],
    limit: 10
  })
  const res_services = await services.findAll({
    attributes: ['id', `${locale}_title`, 'picture'],
    order: [
      ['priority', 'DESC'],
      ['updated_at', 'DESC']
    ],
    limit: 6
  })
  const res_banners = await banners.findAll({
    attributes: ['id', 'link', 'banner_path'],
    order: [
      ['priority', 'DESC'],
      ['updated_at', 'DESC']
    ]
  })
  const metatag = await metatags.findOne({
    where: { id: 1 },
    attributes: ['id', `${locale}_title`, `${locale}_description`]
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      banners: Array.from(res_banners).map(banner => ({
        id: banner.dataValues.id,
        link: banner.link,
        picture: banner.dataValues.banner_path
      })),
      services: Array.from(res_services).map(service => ({
        id: service.dataValues.id,
        title: service.dataValues[`${locale}_title`],
        picture: service.dataValues.picture
      })),
      specialties: Array.from(res_specialties).map(specialty => ({
        id: specialty.dataValues.id,
        name: specialty.dataValues[`${locale}_name`],
        icon: specialty.dataValues.icon
      })),
      metatag: {
        id: metatag.dataValues.id,
        title: metatag.dataValues[`${locale}_title`],
        description: metatag.dataValues[`${locale}_description`]
      }
    }
  }
}
