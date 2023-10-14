import Link from 'next/link'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from '../components/Layout'
import PageHead from '../components/PageHead';

export default function TermsPage() {

  const { t } = useTranslation(['common']);

  const breadcrumb = (
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link href="/">{ t("Header.01") }</Link></li>
      <li className="breadcrumb-item" aria-current="page">{ t("General.05") }</li>
    </ol>
  )

  return (
    <Layout title={ t("General.05") }>
      <PageHead title={ t("General.05") } image="/images/ContactUsS0000.jpg" breadcrumb={ breadcrumb }/>

      <div className="main-container">
        <div className="mt-1 mb-5">

          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("Terms.S0101") }} />

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
