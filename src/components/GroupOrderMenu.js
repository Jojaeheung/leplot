import React, { useState } from 'react';
import { groupMenuData, categories } from '../data/menuData';
import MenuCard from './MenuCard';
import '../styles/GroupOrderMenu.css';

const GroupOrderMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = groupMenuData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="group-order-menu">
      <div className="container">
        <div className="menu-header">
          <h2>단체주문 메뉴</h2>
          <p>최소 주문량 이상부터 주문 가능합니다</p>
        </div>

        <div className="menu-controls">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="메뉴 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {filteredMenu.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>검색 결과가 없습니다</h3>
            <p>다른 키워드로 검색해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupOrderMenu;