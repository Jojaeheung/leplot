import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, DollarSign, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MenuItem } from '../types';
import { getMenuItems } from '../utils/storage';

const priceRanges = {
  under5000: '~5,000원',
  under10000: '~10,000원',
  under20000: '~20,000원'
};

const priceColors = {
  under5000: 'from-green-500 to-emerald-500',
  under10000: 'from-pink-500 to-rose-500',
  under20000: 'from-purple-500 to-indigo-500'
};

// 포스터 이미지 데이터
const posterImages = [
  {
    id: 1,
    title: '신년 특별 답례품 세트',
    image: 'sand.jpg',
    description: '새해를 맞아 특별히 준비한 답례품 세트'
  },
  {
    id: 2,
    title: '단체 주문 할인 이벤트',
    image: 'cookie.jpg',
    description: '50개 이상 주문 시 10% 할인'
  },
  {
    id: 3,
    title: '인기 미니쿠키 세트',
    image: 'sand.jpg',
    description: '가장 인기 있는 미니쿠키 조합'
  },
  {
    id: 4,
    title: '프리미엄 샌드위치 세트',
    image: 'cookie.jpg',
    description: '신선한 재료로 만든 프리미엄 샌드위치'
  }
];

export function Sandwich() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  
  useEffect(() => {
    const allItems = getMenuItems();
    // 샌드위치 카테고리만 필터링
    const sandwichItems = allItems.filter(item => item.category === 'sandwich');
    setMenuItems(sandwichItems);
  }, []);

  // 포스터 자동 슬라이더
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosterIndex((prev) => (prev + 1) % posterImages.length);
    }, 4000); // 4초마다 변경

    return () => clearInterval(interval);
  }, []);
  
  const getFilteredItems = () => {
    if (selectedPriceRange === 'all') {
      return menuItems;
    }
    
    return menuItems.filter(item => {
      switch (selectedPriceRange) {
        case 'under5000':
          return item.price <= 5000;
        case 'under10000':
          return item.price > 5000 && item.price <= 10000;
        case 'under20000':
          return item.price > 10000 && item.price <= 20000;
        default:
          return true;
      }
    });
  };

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const nextPoster = () => {
    setCurrentPosterIndex((prev) => (prev + 1) % posterImages.length);
  };

  const prevPoster = () => {
    setCurrentPosterIndex((prev) => (prev - 1 + posterImages.length) % posterImages.length);
  };

  const filteredItems = getFilteredItems();
  
  return (
    <div className="space-y-8">
      {/* 포스터 슬라이더 */}
      <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-3xl overflow-hidden shadow-2xl group">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentPosterIndex * 100}%)`}}
        >
          {posterImages.map((poster) => (
            <div key={poster.id} className="min-w-full h-full relative">
              <img 
                src={poster.image} 
                alt={poster.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white">
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">{poster.title}</h2>
                <p className="text-sm sm:text-lg lg:text-xl opacity-90">{poster.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 슬라이더 화살표 */}
        <button
          onClick={prevPoster}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300 opacity-0 group-hover:opacity-100 touch-manipulation"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>
        
        <button
          onClick={nextPoster}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300 opacity-0 group-hover:opacity-100 touch-manipulation"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>

        {/* 인디케이터 */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {posterImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPosterIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                currentPosterIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 가격대 필터 */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        <button
          onClick={() => setSelectedPriceRange('all')}
          className={`group relative px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 touch-manipulation ${
            selectedPriceRange === 'all'
              ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-2xl shadow-pink-500/30'
              : 'bg-white text-gray-700 hover:bg-pink-50 border-2 border-pink-200'
          }`}
        >
          <span className="flex items-center space-x-2">
            <Star className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>전체</span>
          </span>
        </button>
        
        {Object.entries(priceRanges).map(([key, name]) => {
          const gradient = priceColors[key as keyof typeof priceColors];
          
          return (
            <button
              key={key}
              onClick={() => setSelectedPriceRange(key)}
              className={`group relative px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 touch-manipulation ${
                selectedPriceRange === key
                  ? `bg-gradient-to-r ${gradient} text-white shadow-2xl`
                  : 'bg-white text-gray-700 hover:bg-pink-50 border-2 border-pink-200'
              }`}
            >
              <span>{name}</span>
            </button>
          );
        })}
      </div>
      
      {/* 메뉴 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-pink-100"
          >
            {/* 이미지 영역 */}
            <div className="relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* 하트 버튼 */}
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-300 touch-manipulation"
              >
                <Heart 
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${favorites.has(item.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
                />
              </button>
              
              {/* 가격대 배지 */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white ${
                  item.price <= 10000 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  item.price <= 15000 ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                  'bg-gradient-to-r from-purple-500 to-indigo-500'
                }`}>
                  {item.price <= 10000 ? '~10,000원' :
                   item.price <= 15000 ? '~15,000원' : '~20,000원'}
                </span>
              </div>
              
              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* 컨텐츠 영역 */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    ₩{item.price.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs sm:text-sm text-gray-500 ml-1">4.8</span>
                </div>
              </div>
              
              {/* 주문 버튼 */}
              <button 
                onClick={() => navigate(`/menu/${item.id}`)}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl touch-manipulation"
              >
                <span className="flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>주문하기</span>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* 빈 상태 */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <DollarSign className="h-12 w-12 sm:h-16 sm:w-16 text-pink-300 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-500 mb-2">해당 가격대의 샌드위치가 없습니다</h3>
          <p className="text-gray-400">다른 가격대를 선택해보세요</p>
        </div>
      )}
    </div>
  );
} 