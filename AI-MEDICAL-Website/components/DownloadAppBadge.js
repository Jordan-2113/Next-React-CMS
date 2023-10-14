import { motion } from "framer-motion";
import AsyncImage from "./AsyncImage";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';
import { useTranslation } from "next-i18next";

export default function DownloadAppBadge( { qrcode, align, noWrap, showQrInMobile } ) {

  const { t } = useTranslation(['common']);

  return (
    <div className={`dab${align==="left"?" dab--left":""}`}>
      <div className={`row text-center align-items-stretch`}>

        <div className={`col-${noWrap&&showQrInMobile?"6":"12"} col-sm-6`}>

          <div className="dab--badges">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="dab--app-store" href={process.env.NEXT_PUBLIC_APK_DOWNLOAD}>
              <AsyncImage src="/images/apk-download.png" alt="APK Download" />
            </motion.a>

            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="dab--play" href={`https://play.google.com/store/apps/details?id=${process.env.NEXT_PUBLIC_PLAY_STORE}`}>
              <AsyncImage src="/images/play-store.png" alt="Google play" />
            </motion.a>
            
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="dab--app-store" href={`https://apps.apple.com/us/app/${process.env.NEXT_PUBLIC_APP_STORE}`}>
              <AsyncImage src="/images/app-store.png" alt="App Store" />
            </motion.a>
          </div>

        </div>

        <div className={`col-${noWrap?"6":"12"}${!showQrInMobile?" d-none d-sm-block":""} col-sm-6`}>
          <div className="dab--qr-code">
            <AsyncImage src={qrcode} alt="Qr Code" />
          </div>
        </div>

      </div>
    </div>
  )
}
