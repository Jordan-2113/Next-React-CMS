import * as React from 'react'
import Link from 'next/link'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from '../components/Layout'
import PageHead from '../components/PageHead';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { serialize } from 'object-to-formdata';
import { useRouter } from 'next/router';
import { metatags } from '../db/models';

export default function ContactUsPage({metatag}) {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  });
  const [ sending, setSending ] = React.useState(false);
  const { t } = useTranslation(['common']);
  const router = useRouter();

  const breadcrumb = (
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link href="/">{ t("Header.01") }</Link></li>
      <li className="breadcrumb-item" aria-current="page">{ t("Header.06") }</li>
    </ol>
  )

  const onSubmit = async data => {
    setSending(true);
    const resp = await fetch(`/api/contact`, {
        method: 'POST',
        body: serialize(data)
    }).catch(() => {
        // setFormMsg("暫時無法發送請求，請稍後再嘗試");
    }).finally(() => {
        setSending(false);
    });
    if (resp == null) return;
    if (!resp.ok) {
        // setFormMsg("暫時無法發送請求，請稍後再嘗試");
        return;
    }
    router.reload();
  }

  return (
    <Layout title={metatag.title} description={metatag.description} metaurl="contact">
      <PageHead title={ t("Header.06") } image="/images/ContactUsS0000.jpg" breadcrumb={ breadcrumb }/>

      <div className="main-container">
        <div className="px-3 mx-3">

          <p className="text-gray text-center">
            { t("ContactUs.S0101") }
            <a className="text-link" href="tel:+85236222361" style={{ margin: "0 5px" }}>+852 3622 2361</a>
            { t("ContactUs.S0103") }
            <a className="text-link" href="mailto:enquiry@hkaimc.com" style={{ margin: "0 5px" }}>enquiry@hkaimc.com</a>
            { t("ContactUs.S0104") }
          </p>

        </div>

        <div className="my-5 m-md-5">
          <form className="shadow-m border-round-l p-4 p-md-5" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="col-form-label"><div className="gray">{ t("ContactUs.S0105") }*</div></label>
            <input type="name" className="form-control" id="name" { ...register('name', { required: true }) } />
            <label htmlFor="telnum" className="col-form-label pt-4"><div className="gray">{ t("ContactUs.S0107") }*</div></label>
            <input
              type="tel"
              className="form-control"
              id="telnum"
              { ...register('phone', {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please enter a number',
                }
              }) }
            />
            <label htmlFor="email" className="col-form-label pt-4"><div className="gray">{ t("ContactUs.S0106") }*</div></label>
            <input type="email" className="form-control" id="email" { ...register('email', { required: true }) } />
            <label htmlFor="content" className="col-form-label pt-4"><div className="gray">{ t("ContactUs.S0108") }</div></label>
            <input type="content" className="form-control" id="content" { ...register('content') } />
            <div className="py-4">
              <div className="text-center">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block', border: 0, backgroundColor: 'transparent' }} disabled={sending}>
                  <Button rouded size="m" btnClass="bg-danger text-white">{ t("ContactUs.S0109") }</Button>
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps( {locale} ) {
  const metatag = await metatags.findOne({
    where: { id: 6 },
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
    },
  }
}
