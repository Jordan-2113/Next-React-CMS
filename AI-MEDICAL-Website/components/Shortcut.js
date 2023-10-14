import { useTranslation } from "next-i18next";
import React from "react";
import Download from "../public/images/download.png";
import Whatsapp from '../public/images/HomeS0203Icon02.svg';

export default function Shortcut() {
    const { t } = useTranslation(['common']);
    return (
        <div className="shortcut">
            <a className="shortcut--whatsapp" href="https://wa.me/85261874270" target="_blank" rel="noreferrer">
                <span>WhatsApp</span>
                <div className="shortcut--whatsapp-icon">
                    <img src={Whatsapp} alt="" />
                </div>
            </a>
            <a className="shortcut--download" href="/api/download" target="_blank">
                <div className="shortcut--download-icon">
                    <img src={Download} alt="" />
                </div>
                <div className="shortcut--download-wrapper">
                    { t('General.08') }<br />{ t('General.09') }
                </div>
            </a>
        </div>
    )
}