import Link from 'next/link'

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from '../../components/Layout'
import PageHead from '../../components/PageHead';

export default function AppPrivacyPage() {

  const { t } = useTranslation(['common']);

  const breadcrumb = (
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link href="/">{ t("Header.01") }</Link></li>
      <li className="breadcrumb-item" aria-current="page">{ t("General.10") }</li>
    </ol>
  )

  return (
    <Layout title={ t("General.10") }>
      <PageHead title={ t("General.10") } image="/images/ContactUsS0000.jpg" breadcrumb={ breadcrumb }/>

      <div className="main-container">
        <div className="mt-1 mb-5">
          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0101") }}></p>
          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0102") }}></p>
          <p className="text-gray"><b>{ t("AppPrivacy.S0103") }</b></p>
          <p className="text-gray">{ t("AppPrivacy.S0104") }</p>
          <p className="text-gray" style={{ textAlign: "right" }}>{ t("AppPrivacy.S0105") }</p>
          <br />
          <p className="text-gray"><b>{ t("AppPrivacy.S0106") }</b></p>
          <p className="text-gray"><a href="#s1">{ t("AppPrivacy.S0107") }</a></p>
          <p className="text-gray"><a href="#s2">{ t("AppPrivacy.S0108") }</a></p>
          <p className="text-gray"><a href="#s3">{ t("AppPrivacy.S0109") }</a></p>
          <p className="text-gray"><a href="#s4">{ t("AppPrivacy.S0110") }</a></p>
          <p className="text-gray"><a href="#s5">{ t("AppPrivacy.S0111") }</a></p>
          <p className="text-gray"><a href="#s6">{ t("AppPrivacy.S0112") }</a></p>
          <p className="text-gray"><a href="#s7">{ t("AppPrivacy.S0113") }</a></p>
          <p className="text-gray"><a href="#s8">{ t("AppPrivacy.S0114") }</a></p>
          <p className="text-gray"><a href="#s9">{ t("AppPrivacy.S0115") }</a></p>
          <p className="text-gray"><a href="#s10">{ t("AppPrivacy.S0116") }</a></p>
          <p className="text-gray">{ t("AppPrivacy.S0117") }</p>
          <br />
          <p className="text-gray app-privacy--title" id="s1">{ t("AppPrivacy.S0107") }</p>
          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0118") }}></p>
          <p className="text-gray">{ t("AppPrivacy.S0119") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0120") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0121") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0122") }</p>
          <p className="text-gray">1.1 <b>{ t("AppPrivacy.S0123") }</b></p>
          <ol className="app-privacy--parentheses">
            <li>
              <p className="text-gray"><b>{ t("AppPrivacy.S0124") }</b></p>
              <ol type="a" className="app-privacy--parentheses">
                <li><p className="text-gray">{ t("AppPrivacy.S0125") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0126") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0127") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0128") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0129") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0130") }</p></li>
              </ol>
            </li>
            <li>
              <p className="text-gray"><b>{ t("AppPrivacy.S0131") }</b></p>
              <ol type="a" className="app-privacy--parentheses">
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0132") }</b></p>
                  <ol type="1">
                    <li><p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0133") }}></p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0134") }</p></li>
                  </ol>
                  <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0135") }}></p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0136") }</b></p>
                  <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0137") }}></p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0138") }</b></p>
                  <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0139") }}></p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0140") }</b></p>
                  <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0141") }}></p>
                  <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0142") }}></p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0143") }</b></p>
                  <ol type="1">
                    <li><p className="text-gray">{ t("AppPrivacy.S0144") }</p></li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              <p className="text-gray"><b>{ t("AppPrivacy.S0145") }</b></p>
              <ol type="a" className="app-privacy--parentheses">
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0146") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0147") }</p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0148") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0149") }</p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0150") }</b></p>
                  <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0151") }}></p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0152") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0153") }</p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0154") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0155") }</p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0156") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0157") }</p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0158") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0159") }</p>
                </li>
                <li>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0160") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0161") }</p>
                  <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0162") }}></p>
                  <p className="text-gray"><b>{ t("AppPrivacy.S0163") }</b></p>
                  <p className="text-gray">{ t("AppPrivacy.S0164") }</p>
                  <ol type="1">
                    <li><p className="text-gray">{ t("AppPrivacy.S0165") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0166") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0167") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0168") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0169") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0170") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0171") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0172") }</p></li>
                    <li><p className="text-gray">{ t("AppPrivacy.S0173") }</p></li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0174") }</p>
              <p className="text-gray">{ t("AppPrivacy.S0175") }</p>
              <p className="text-gray">{ t("AppPrivacy.S0176") }</p>
            </li>
            <li><p className="text-gray"><b>{ t("AppPrivacy.S0177") }</b></p></li>
            <li><p className="text-gray"><b>{ t("AppPrivacy.S0178") }</b></p></li>
          </ol>
          <br />
          <p className="text-gray app-privacy--title" id="s2">{ t("AppPrivacy.S0108") }</p>
          <p className="text-gray">2.1 { t("AppPrivacy.S0179") }</p>
          <ol className="app-privacy--parentheses">
            <li><p className="text-gray">{ t("AppPrivacy.S0180") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0181") }</p></li>
          </ol>
          <p className="text-gray">2.2 { t("AppPrivacy.S0182") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0183") }</p>
          <br />
          <p className="text-gray app-privacy--title" id="s3">{ t("AppPrivacy.S0109") }</p>
          <p className="text-gray">3.1 <b>{ t("AppPrivacy.S0184") }</b></p>
          <ol className="app-privacy--parentheses">
            <li>
              <p className="text-gray"><b>{ t("AppPrivacy.S0185") }</b></p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0186") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0187") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0188") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0189") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0190") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0191") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0192") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0193") }</p></li>
              </ol>
            </li>
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0194") }</p>
              <p className="text-gray"><b>{ t("AppPrivacy.S0195") }</b></p>
              <p className="text-gray">{ t("AppPrivacy.S0196") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0197") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0198") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0199") }</p></li>
              </ol>
            </li>
          </ol>
          <p className="text-gray">3.2 { t("AppPrivacy.S0200") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0201") }</p>
          <ol type="1">
            <li><p className="text-gray">{ t("AppPrivacy.S0202") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0203") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0204") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0205") }</p></li>
          </ol>
          <p className="text-gray">3.3 { t("AppPrivacy.S0206") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0207") }</p>
          <ol type="1">
            <li><p className="text-gray">{ t("AppPrivacy.S0208") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0209") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0210") }</p></li>
          </ol>
          <p className="text-gray">3.4 <b>{ t("AppPrivacy.S0211") }</b></p>
          <p className="text-gray">{ t("AppPrivacy.S0212") }</p>
          <ol type="1">
            <li><p className="text-gray">{ t("AppPrivacy.S0213") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0214") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0215") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0216") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0217") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0218") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0219") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0220") }</p></li>
          </ol>
          <p className="text-gray"><b>{ t("AppPrivacy.S0221") }</b></p>
          <br />
          <p className="text-gray app-privacy--title" id="s4">{ t("AppPrivacy.S0110") }</p>
          <p className="text-gray">4.1 { t("AppPrivacy.S0222") }</p>
          <ol type="1" className="app-privacy--parentheses">
            <li><p className="text-gray">{ t("AppPrivacy.S0223") }</p></li>
          </ol>
          <p className="text-gray">4.2 { t("AppPrivacy.S0224") }</p>
          <ol type="1" className="app-privacy--parentheses">
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0225") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0226") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0227") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0228") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0229") }</p></li>
              </ol>
            </li>
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0230") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0231") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0232") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0233") }</p></li>
              </ol>
            </li>
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0234") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0235") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0236") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0237") }</p></li>
              </ol>
            </li>
          </ol>
          <br />
          <p className="text-gray app-privacy--title" id="s5">{ t("AppPrivacy.S0111") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0238") }</p>
          <p className="text-gray">5.1 { t("AppPrivacy.S0239") }</p>
          <ol type="1" className="app-privacy--parentheses">
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0240") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0241") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0242") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0243") }</p></li>
              </ol>
            </li>
          </ol>
          <p className="text-gray">5.2 { t("AppPrivacy.S0244") }</p>
          <ol type="1" className="app-privacy--parentheses">
            <li>
              <p className="text-gray">1) { t("AppPrivacy.S0245") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0246") }</p></li>
              </ol>
            </li>
            <li><p className="text-gray">{ t("AppPrivacy.S0247") }</p></li>
          </ol>
          <p className="text-gray">5.3 { t("AppPrivacy.S0248") }</p>
          <ol type="1" className="app-privacy--parentheses">
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0249") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0250") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0251") }</p></li>
              </ol>
            </li>
            <li><p className="text-gray">{ t("AppPrivacy.S0252") }</p></li>
            <li>
              <p className="text-gray">{ t("AppPrivacy.S0253") }</p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0254") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0255") }</p></li>
              </ol>
            </li>
            <li><p className="text-gray">{ t("AppPrivacy.S0256") }</p></li>
          </ol>
          <p className="text-gray">5.4 { t("AppPrivacy.S0257") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0258") }</p>
          <ol type="1">
            <li><p className="text-gray">{ t("AppPrivacy.S0259") }</p></li>
            <li><p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0260") }}></p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0261") }</p></li>
          </ol>
          <p className="text-gray">5.5 { t("AppPrivacy.S0262") }</p>
          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0263") }}></p>
          <p className="text-gray">5.6 { t("AppPrivacy.S0264") }</p>
          <ol type="1" className="app-privacy--parentheses">
            <li><p className="text-gray">{ t("AppPrivacy.S0265") }</p></li>
            <li>
              <p className="text-gray"><b>{ t("AppPrivacy.S0266") }</b></p>
              <ol type="1">
                <li><p className="text-gray">{ t("AppPrivacy.S0267") }</p></li>
                <li><p className="text-gray">{ t("AppPrivacy.S0268") }</p></li>
              </ol>
            </li>
          </ol>
          <p className="text-gray">5.7 { t("AppPrivacy.S0269") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0270") }</p>
          <p className="text-gray">5.8 { t("AppPrivacy.S0271") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0272") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0273") }</p>
          <p className="text-gray">5.9 { t("AppPrivacy.S0274") }</p>
          <ol type="1">
            <li><p className="text-gray">{ t("AppPrivacy.S0275") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0276") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0277") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0278") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0279") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0280") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0281") }</p></li>
          </ol>
          <br />
          <p className="text-gray app-privacy--title" id="s6">{ t("AppPrivacy.S0112") }</p>
          <p className="text-gray">6.1 { t("AppPrivacy.S0282") }</p>
          <p className="text-gray">6.2 { t("AppPrivacy.S0283") }</p>
          <p className="text-gray">6.3 { t("AppPrivacy.S0284") }</p>
          <p className="text-gray">6.4 { t("AppPrivacy.S0285") }</p>
          <p className="text-gray">6.5 { t("AppPrivacy.S0286") }</p>
          <ol type="1">
            <li><p className="text-gray">{ t("AppPrivacy.S0287") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0288") }</p></li>
            <li><p className="text-gray">{ t("AppPrivacy.S0289") }</p></li>
          </ol>
          <br />
          <p className="text-gray app-privacy--title" id="s7">{ t("AppPrivacy.S0113") }</p>
          <p className="text-gray">7.1 { t("AppPrivacy.S0290") }</p>
          <p className="text-gray">7.2 { t("AppPrivacy.S0291") }</p>
          <p className="text-gray">7.3 { t("AppPrivacy.S0292") }</p>
          <br />
          <p className="text-gray app-privacy--title" id="s8">{ t("AppPrivacy.S0114") }</p>
          <p className="text-gray">8.1 { t("AppPrivacy.S0293") }</p>
          <p className="text-gray" dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0294") }}></p>
          <p className="text-gray">8.2 <b>{ t("AppPrivacy.S0295") }</b></p>
          <br />
          <p className="text-gray app-privacy--title" id="s9">{ t("AppPrivacy.S0115") }</p>
          <p className="text-gray">{ t("AppPrivacy.S0296") }</p>
          <br />
          <p className="text-gray app-privacy--title" id="s10">{ t("AppPrivacy.S0116") }</p>
          <p className="text-gray">10.1 <span dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0297") }}></span></p>
          <p className="text-gray">10.2 <span dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0298") }}></span></p>
          <p className="text-gray">10.3 <span dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0299") }}></span></p>
          <p className="text-gray">10.4 <span dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0300") }}></span></p>
          <p className="text-gray">10.5 <span dangerouslySetInnerHTML={{ __html: t("AppPrivacy.S0301") }}></span></p>
          <p className="text-gray"><b>{ t("AppPrivacy.S0302") }</b></p>
          <p className="text-gray" style={{ textAlign: "right" }}>{ t("AppPrivacy.S0303") }</p>
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
