import { useState, useEffect } from 'react';
import type { MenuItem } from '../types';
import { getMenuItems } from '../utils/storage';

const categoryNames = {
  coffee: '커피',
  dessert: '디저트',
  sandwich: '샌드위치',
  beverage: '음료'
};

export function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    setMenuItems(getMenuItems());
  }, []);
  
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">메뉴</h1>
      
      {/* 카테고리 필터 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full font-medium ${
            selectedCategory === 'all'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          전체
        </button>
        {Object.entries(categoryNames).map(([key, name]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedCategory === key
                ? 'bg-amber-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      
      {/* 메뉴 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xl font-bold text-amber-600">
                  ₩{item.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {categoryNames[item.category]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}