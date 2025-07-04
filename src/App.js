import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import GroupOrderMenu from './components/GroupOrderMenu';
import OrderHistory from './components/OrderHistory';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('menu');

  return (
    <div className="App">
      <Header />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="main-content">
        {currentView === 'menu' && <GroupOrderMenu />}
        {currentView === 'history' && <OrderHistory />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;