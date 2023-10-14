import Link from 'next/link'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from '../components/Layout'
import PageHead from '../components/PageHead';

export default function PrivacyPage() {

  const { t } = useTranslation(['common']);

  const breadcrumb = (
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link href="/">{ t("Header.01") }</Link></li>
      <li className="breadcrumb-item" aria-current="page">{ t("General.06") }</li>
    </ol>
  )

  return (
    <Layout title={ t("General.06") }>
      <PageHead title={ t("General.06") } image="/images/ContactUsS0000.jpg" breadcrumb={ breadcrumb }/>

      <div className="main-container">
        <div className="mt-1 mb-5">

          <p className="text-gray">
            <u>{ t("Privacy.S0101") }</u>
          </p>
          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("Privacy.S0102") }} />
          <br />
          <p className="text-gray">
            <u>{ t("Privacy.S0103") }</u>
          </p>
          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("Privacy.S0104") }} />

        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps( {locale} ) {
  return {
    props: {...(await serverSideTranslations(locale, ['common']))},
  }
}
