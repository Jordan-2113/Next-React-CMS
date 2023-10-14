import { useTranslation } from 'next-i18next';
import Link from 'next/link'
import DownloadAppBadge from './DownloadAppBadge'

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className="footer text-center text-dominant">
      <div className="main-container">
        <h2 className="footer--title size--xs">{ t("Footer.01") }</h2>
        <div className="footer--badge">
          <DownloadAppBadge qrcode="/images/FooterS0103.png" />
        </div>

        <div>
          { t("Footer.05") }
          <br />
          <Link href="/privacy">
            <a>{ t("General.06") }</a>
          </Link>
          <span style={{ padding: "0 5px" }}>|</span>
          <Link href="/terms">
            <a>{ t("General.05") }</a>
          </Link>
        </div>
        <p className="footer--cr">{ t("Footer.04") }</p>
      </div>
    </footer>
  )
}
