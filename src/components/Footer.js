import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-coffee"></i>
              <h3>카페 단체주문</h3>
            </div>
            <p>최고의 품질과 서비스로 여러분의 특별한 순간을 함께합니다.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>연락처</h4>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>02-1234-5678</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>order@cafe.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>서울시 강남구 카페거리 123</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>영업시간</h4>
            <div className="hours-item">
              <span>평일</span>
              <span>9:00 - 18:00</span>
            </div>
            <div className="hours-item">
              <span>토요일</span>
              <span>10:00 - 16:00</span>
            </div>
            <div className="hours-item">
              <span>일요일</span>
              <span>휴무</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>주문 안내</h4>
            <ul>
              <li>최소 주문량을 확인해주세요</li>
              <li>주문은 1일 전까지 가능합니다</li>
              <li>배송비는 지역에 따라 다릅니다</li>
              <li>대량 주문시 할인 혜택이 있습니다</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 카페 단체주문. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">고객센터</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;