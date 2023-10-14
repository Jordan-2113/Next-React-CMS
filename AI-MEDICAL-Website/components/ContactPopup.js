import React from 'react';
import PhoneBlue from '../public/images/phone-blue.svg';
import WhatsApp from '../public/images/whatsapp.png';
import WhatsAppBlue from '../public/images/whatsapp-blue.svg';
import DownloadBlue from '../public/images/download-blue.svg';
import Close from '../public/images/close.svg';

export default function ContactPopup({ onClose }) {
  return (
    <div className="popup">
      <div className="popup--wrapper">
        <button className="popup--close" onClick={onClose}><img src={Close} alt="" /></button>
        <img src="/images/popup-picture.png" className="popup--picture" alt="" />
        <div className="popup--contents">
          本中心辦公時間為<br />
          <span>
            星期一至五10:00-18:00<br />
            星期六10:00-14:00<br />
          </span>
          如在非辦公時間接獲預約，將於下一個工作天處理及回覆。
        </div>
        <div className="popup--hr"></div>
        <div className="popup--actions">
          <div className="popup--actions-item">
            <a className="popup--actions-item-btn" href="tel:+85236222361">
              <img src={PhoneBlue} alt="" />
            </a>
            <div className="popup--actions-item-label">電話<br />預約</div>
          </div>
          <div className="popup--actions-item">
            <a className="popup--actions-item-btn" href="https://wa.me/85261874270" target="_blank" rel="noreferrer">
              <img src={WhatsApp} alt="" />
            </a>
            <div className="popup--actions-item-label">WhatsApp預約</div>
          </div>
          <div className="popup--actions-item">
            <a className="popup--actions-item-btn" href="/api/download" target="_blank">
              <img src={DownloadBlue} alt="" />
            </a>
            <div className="popup--actions-item-label">下載程式線上問診</div>
          </div>
        </div>
      </div>
    </div>
  );
}