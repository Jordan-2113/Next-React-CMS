import DownloadAppBadge from './DownloadAppBadge';
import WeChat from '../public/images/wechat.png';
import Facebook from '../public/images/facebook.png';
import Twitter from '../public/images/twitter.png';
import Icon1 from '../public/images/HomeS0203Icon01.svg';
import Icon2 from '../public/images/HomeS0203Icon02.svg';
import Icon3 from '../public/images/HomeS0203Icon03.png';
import { useEffect, useState } from 'react';
import AsyncImage from './AsyncImage';
import { motion } from 'framer-motion';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';
import { useTranslation } from 'next-i18next';
import ArrowButton from './ArrowButton';
import Link from 'next/link';
import { useRouter } from 'next/router';

function useWindowSize() {
  const [ size, setSize ] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([document.body.clientWidth, document.body.clientHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function HomeS02({ data, specialties }) {
  const [ width, height ] = useWindowSize();
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const router = useRouter();

  const { t } = useTranslation(['common']);

  const content1 = (
      <div className="py-2" style={{ margin: "0 auto", maxWidth: 240 }}>
        <div className="row">
          <div className="col-4">
            <Tippy content={t("General.04")} animation="scale-subtle">
              <a whilehover={{ scale: 1.05 }} whiletap={{ scale: 0.95 }} href="#" style={{ display: 'inline-block' }}>
                <AsyncImage src={WeChat} alt="Wechat" className="w-100" />
              </a>
            </Tippy>
          </div>
          <div className="col-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://www.facebook.com/AIMC.HONGKONG/" style={{ display: 'inline-block' }}>
              <AsyncImage src={Facebook} alt="Facebook" className="w-100" />
            </motion.a>
          </div>
          <div className="col-4">
            <Tippy content={t("General.04")} animation="scale-subtle">
              <a whilehover={{ scale: 1.05 }} whiletap={{ scale: 0.95 }} href="#" style={{ display: 'inline-block' }}>
                <AsyncImage src={Twitter} alt="Twitter" className="w-100" />
              </a>
            </Tippy>
          </div>
        </div>
      </div>
  )

  return (
    <div className="main-container text-center text-md-left">
      <div className="home--info-wrapper">
        <div className="home--info-block d-md-none">
          <div className="home--info-specialist">
            <div className="home--info-specialist-title text-domain">{ data("Home.S0202") }</div>
            <div className="home--info-specialist-hr"></div>
            <div className="home--info-specialist-list">
              <div className="row">
                { specialties.slice(0, 8).map((specialty, idx) => {
                  return (
                    <div className="col-6" key={idx}>
                      <Link href={`/team/${specialty.id}`}>
                        <a className="home--info-specialist-list-item">{ specialty.name }</a>
                      </Link>
                    </div>
                  );
                }) }
                <div className="col">
                  <Link href="/team">
                    <a className="home--info-specialist-list-item">{ data("Home.S0204") }</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home--info-block d-md-none">
          <h3 className="size--sm home--info-block-title">{ data("Home.S0201") }</h3>
          { content1 }
        </div>
        <div className="home--info-block d-none d-md-block">
          <h3 className="size--sm home--info-block-title">{ data("Home.S0203") }</h3>
          <div className="my-2" style={{ maxWidth: 280 }}>
            <div className="home--dropdown">
              <ArrowButton size="small" onClick={() => setDropdownOpened(x => !x)}>{ data("Home.S0203") }</ArrowButton>
              <div className="home--dropdown-menu" style={{ display: dropdownOpened ? "block" : "none" }}>
                <div className="home--dropdown-menu-wrapper">
                  { specialties.map((specialty, idx) => {
                    return (
                      <button className="home--dropdown-menu-item" type="button" key={idx} onClick={() => router.push(`/team/${specialty.id}`)}>
                        { specialty.name }
                      </button>
                    );
                  }) }
                  <button className="home--dropdown-menu-item" type="button" onClick={() => router.push("/team")}>
                    { data("Home.S0204") }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home--info-block d-none d-md-block">
          <h3 className="size--sm home--info-block-title">{ data("Home.S0205") }</h3>
          <DownloadAppBadge noWrap qrcode="/images/HomeS0211.png" align={ width >= 560 ? "left" : "center" } />
        </div>
        <div className="home--info-block d-none d-lg-block">
          <h3 className="size--sm home--info-block-title">{ data("Home.S0206") }</h3>
          <div className="home--info-block-contact">
            <img src={Icon3} alt="phone" />
            <span>+852 3622 2361</span>
          </div>
          <div className="home--info-block-contact">
            <img src={Icon2} alt="Whatsapp" />
            <span>+852 6187 4270</span>
          </div>
          <div className="home--info-block-contact">
            <img src={Icon1} alt="email" />
            <span>enquiry@hkaimc.com</span>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  )
}
