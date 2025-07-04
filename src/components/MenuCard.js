import React, { useState } from 'react';
import '../styles/MenuCard.css';

const MenuCard = ({ item }) => {
  const [quantity, setQuantity] = useState(item.minOrder);
  const [selectedOptions, setSelectedOptions] = useState(item.options[0]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleOrder = () => {
    const orderData = {
      ...item,
      quantity,
      selectedOptions,
      totalPrice: item.price * (quantity / item.minOrder),
      orderDate: new Date().toISOString()
    };
    
    // 기존 주문 내역 가져오기
    const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    
    // 새 주문 추가
    existingOrders.push(orderData);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('orderHistory', JSON.stringify(existingOrders));
    
    alert(`${item.name} ${quantity}인분이 주문되었습니다!`);
    setQuantity(item.minOrder);
  };

  return (
    <div className="menu-card">
      {item.popular && <div className="popular-badge">인기</div>}
      
      <div className="menu-image">
        <img src={item.image} alt={item.name} />
        <div className="category-tag">{item.category}</div>
      </div>

      <div className="menu-content">
        <h3>{item.name}</h3>
        <p className="description">{item.description}</p>

        <div className="price-info">
          <span className="price">{formatPrice(item.price)}원</span>
          <span className="min-order">최소 {item.minOrder}인분</span>
        </div>

        <div className="options">
          <label>옵션 선택:</label>
          <select 
            value={selectedOptions} 
            onChange={(e) => setSelectedOptions(e.target.value)}
          >
            {item.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="quantity-selector">
          <label>수량 (인분):</label>
          <div className="quantity-controls">
            <button 
              onClick={() => setQuantity(Math.max(item.minOrder, quantity - 5))}
              disabled={quantity <= item.minOrder}
            >
              -
            </button>
            <span>{quantity}인분</span>
            <button onClick={() => setQuantity(quantity + 5)}>+</button>
          </div>
        </div>

        <div className="total-price">
          총 가격: {formatPrice(item.price * (quantity / item.minOrder))}원
        </div>

        <button className="order-btn btn btn-primary" onClick={handleOrder}>
          <i className="fas fa-shopping-cart"></i>
          주문하기
        </button>
      </div>
    </div>
  );
};

export default MenuCard;