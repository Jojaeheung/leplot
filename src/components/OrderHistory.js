import React, { useState, useEffect } from 'react';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // all, recent, old

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    // 최신 주문이 먼저 오도록 정렬
    const sortedOrders = savedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    setOrders(sortedOrders);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    const now = new Date();
    const daysDiff = (now - orderDate) / (1000 * 60 * 60 * 24);

    switch (filter) {
      case 'recent':
        return daysDiff <= 7; // 최근 7일
      case 'old':
        return daysDiff > 7;
      default:
        return true;
    }
  });

  const clearHistory = () => {
    if (window.confirm('모든 주문 내역을 삭제하시겠습니까?')) {
      localStorage.removeItem('orderHistory');
      setOrders([]);
    }
  };

  const reorder = (order) => {
    const reorderData = {
      ...order,
      orderDate: new Date().toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    existingOrders.push(reorderData);
    localStorage.setItem('orderHistory', JSON.stringify(existingOrders));
    
    // 주문 목록 업데이트
    const sortedOrders = existingOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    setOrders(sortedOrders);
    
    alert(`${order.name}을(를) 다시 주문했습니다!`);
  };

  return (
    <div className="order-history">
      <div className="container">
        <div className="history-header">
          <h2>주문 내역</h2>
          <p>이전에 주문했던 메뉴들을 확인하고 재주문할 수 있습니다</p>
        </div>

        <div className="history-controls">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              전체
            </button>
            <button 
              className={`filter-btn ${filter === 'recent' ? 'active' : ''}`}
              onClick={() => setFilter('recent')}
            >
              최근 7일
            </button>
            <button 
              className={`filter-btn ${filter === 'old' ? 'active' : ''}`}
              onClick={() => setFilter('old')}
            >
              이전 주문
            </button>
          </div>
          
          {orders.length > 0 && (
            <button className="clear-btn btn btn-secondary" onClick={clearHistory}>
              <i className="fas fa-trash"></i>
              전체 삭제
            </button>
          )}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <i className="fas fa-clipboard-list"></i>
            <h3>
              {orders.length === 0 
                ? '주문 내역이 없습니다' 
                : '해당 기간의 주문 내역이 없습니다'
              }
            </h3>
            <p>
              {orders.length === 0 
                ? '첫 주문을 시작해보세요!' 
                : '다른 기간을 선택해보세요'
              }
            </p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-image">
                  <img src={order.image} alt={order.name} />
                  <div className="order-date">
                    {formatDate(order.orderDate)}
                  </div>
                </div>

                <div className="order-details">
                  <div className="order-main-info">
                    <h3>{order.name}</h3>
                    <span className="category-badge">{order.category}</span>
                  </div>
                  
                  <p className="order-description">{order.description}</p>
                  
                  <div className="order-specs">
                    <div className="spec-item">
                      <span className="spec-label">수량:</span>
                      <span className="spec-value">{order.quantity}인분</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">옵션:</span>
                      <span className="spec-value">{order.selectedOptions}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">총 가격:</span>
                      <span className="spec-value price">{formatPrice(order.totalPrice)}원</span>
                    </div>
                  </div>

                  <button 
                    className="reorder-btn btn btn-primary"
                    onClick={() => reorder(order)}
                  >
                    <i className="fas fa-redo"></i>
                    재주문
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;