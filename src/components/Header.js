import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-coffee"></i>
            <h1>카페 단체주문</h1>
          </div>
          <div className="header-info">
            <div className="contact-info">
              <span><i className="fas fa-phone"></i> 02-1234-5678</span>
              <span><i className="fas fa-clock"></i> 평일 9:00-18:00</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;