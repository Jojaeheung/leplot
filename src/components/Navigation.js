import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-buttons">
          <button 
            className={`nav-btn ${currentView === 'menu' ? 'active' : ''}`}
            onClick={() => setCurrentView('menu')}
          >
            <i className="fas fa-utensils"></i>
            단체주문 메뉴
          </button>
          <button 
            className={`nav-btn ${currentView === 'history' ? 'active' : ''}`}
            onClick={() => setCurrentView('history')}
          >
            <i className="fas fa-history"></i>
            주문 내역
          </button>
          <button 
            className={`nav-btn ${currentView === 'designer' ? 'active' : ''}`}
            onClick={() => setCurrentView('designer')}
          >
            <i className="fas fa-cube"></i>
            커스텀 박스
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;