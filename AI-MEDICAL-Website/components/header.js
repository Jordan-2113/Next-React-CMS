import Link from 'next/link'
import Image from 'next/image'
import { motion, useCycle } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import { useTranslation } from 'next-i18next'
import Menu from '../public/images/menu.svg';
import Phone from '../public/images/head-phone-btn.png';
import Whatsapp from '../public/images/head-whatsapp-btn.png';

function Item( { link, text } ) {
  return (
    <div className="col-auto">
      <Link href={ link }>
        <a>
        <div className="touch-Header touch py-3">
          <span>{ text }</span>
        </div>
        </a>
      </Link>
    </div>
  )
}

function CollapseItem( { link, text } ) {
  return (
    <Link href={ link }>
      <a>
      <div className="py-1 my-2">
        <div>{ text }</div>
      </div>
      </a>
    </Link>
  )
}

const navVariants = {
  open: {
    height: "auto"
  },
  closed: {
    height: 0
  }
}

const navWrapperVariants = {
  open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const navItemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    x: 50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    }
  }
}

export default function Header() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [ isOpen, toggleOpen ] = useCycle(false, true);

  return (
    <header>

      <nav className="d-none d-lg-block">

        <div className="main-container">
          <div className="row text-center align-items-center">
            <div className="col-auto">
              <div className="logo">
                <Link href="/">
                  <a>
                    <img src={ t("Header.00") } alt={process.env.NEXT_PUBLIC_PAGE_TITLE} />
                  </a>
                </Link>
              </div>
            </div>

            <div className="col"></div>

            <div className="col-auto align-self-stretch" style={{ overflow: "hidden", display: 'flex' }}>

              <div className="row align-items-stretch">

                <Item link='/' text={ t("Header.01") } />

                <Item link='/about' text={ t("Header.02") } />

                <Item link='/service' text={ t("Header.03") } />

                <Item link='/team' text={ t("Header.04") } />

                <Item link='/app' text={ t("Header.05") } />

                <Item link='/contact' text={ t("Header.06") } />

              </div>

            </div>

            <div className="col-auto">
              <div className="dropdown">
                <button className="dropbtn">{ t("Header.07") }</button>
                <div className="dropdown-content">
                  <Link href={{ pathname: router.pathname, query: router.query }} locale="tc">
                    <a>繁</a>
                  </Link>
                  <Link href={{ pathname: router.pathname, query: router.query }} locale="sc">
                    <a>简</a>
                  </Link>
                  {/* <Link href={{ pathname: router.pathname, query: router.query }} locale="en">
                    <a>Eng</a>
                  </Link> */}
                </div>
              </div>
            </div>

          </div>
        </div>

      </nav>

      <div className="d-lg-none">
        
        <div className="main-container" style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}>
          <div className="row align-items-center flex-nowrap">

            <div className="col-auto">
              <div className="logo">
                <Link href="/">
                  <a>
                    <img src={ t("Header.00") } alt={process.env.NEXT_PUBLIC_PAGE_TITLE} />
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex-grow-1 flex-fill"></div>

            <div className="col-auto">
              <div className="header--contact-btn">
                <a href="tel:+85236222361"><img src={Phone} alt="" /></a>
              </div>
              <div className="header--contact-btn">
                <a href="https://wa.me/85261874270" target="_blank" rel="noreferrer"><img src={Whatsapp} alt="" /></a>
              </div>
            </div>

            <div className="col-auto">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="button-collapse" onClick={toggleOpen} style={{ padding: 0, margin: 0, background: 'transparent', border: 0 }}>
                <img src={Menu} style={{ width: 30 }} alt="" />
              </motion.button>
            </div>

          </div>
        </div>

        <div className="header--mb">
          <div className="main-container">
            <div className="row align-items-center flex-nowrap">

              <div className="col-auto">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img src={ t("Header.00") } alt={process.env.NEXT_PUBLIC_PAGE_TITLE} />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="flex-grow-1 flex-fill"></div>

              <div className="col-auto">
                <div className="header--contact-btn">
                  <a href="tel:+85236222361"><img src={Phone} alt="" /></a>
                </div>
                <div className="header--contact-btn">
                  <a href="https://wa.me/85261874270" target="_blank" rel="noreferrer"><img src={Whatsapp} alt="" /></a>
                </div>
              </div>

              <div className="col-auto">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="button-collapse" onClick={toggleOpen} style={{ padding: 0, margin: 0, background: 'transparent', border: 0 }}>
                  <img src={Menu} style={{ width: 30 }} alt="" />
                </motion.button>
              </div>

            </div>

            <motion.nav id="collapseNavBar" style={{ height: 0, overflow: "hidden" }} animate={isOpen ? "open" : "closed"} variants={navVariants}>

              <motion.div variants={navWrapperVariants}>

                <motion.div variants={navItemVariants}>
                  <CollapseItem link='/' text={ t("Header.01") } />
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <CollapseItem link='/about' text={ t("Header.02") } />
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <CollapseItem link='/service' text={ t("Header.03") } />
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <CollapseItem link='/team' text={ t("Header.04") } />
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <CollapseItem link='/app' text={ t("Header.05") } />
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <CollapseItem link='/contact' text={ t("Header.06") } />
                </motion.div>

                <motion.div variants={navItemVariants}>
                  <Link href={{ pathname: router.pathname, query: router.query }} locale="tc">
                    <a style={{ display: "inline-block", marginRight: 15, marginBottom: 10 }}>繁</a>
                  </Link>
                  <Link href={{ pathname: router.pathname, query: router.query }} locale="sc">
                    <a style={{ display: "inline-block", marginRight: 15, marginBottom: 10 }}>简</a>
                  </Link>
                  <Link href={{ pathname: router.pathname, query: router.query }} locale="en">
                    <a style={{ display: "inline-block", marginRight: 15, marginBottom: 10 }}>Eng</a>
                  </Link>
                </motion.div>

              </motion.div>

            </motion.nav>
          </div>
        </div>

      </div>

    </header>
  )
}
