import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ArrowLeft, Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MenuItem } from '../types';
import { getMenuItems } from '../utils/storage';

export function MenuDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const menuItems = getMenuItems();
    const item = menuItems.find(item => item.id === id);
    if (item) {
      setMenuItem(item);
      setCurrentImageIndex(0);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleOrder = () => {
    if (menuItem) {
      // 주문 정보 입력 페이지로 이동
      navigate('/order-form', { 
        state: { 
          item: menuItem, 
          quantity: quantity 
        } 
      });
    }
  };

  const nextImage = () => {
    if (menuItem) {
      const images = menuItem.images || [menuItem.image];
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (menuItem) {
      const images = menuItem.images || [menuItem.image];
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const getCurrentImage = () => {
    if (!menuItem) return '';
    const images = menuItem.images || [menuItem.image];
    return images[currentImageIndex];
  };

  if (!menuItem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">메뉴를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            메뉴로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-300 mb-4 sm:mb-6 p-2 rounded-lg hover:bg-pink-50 touch-manipulation"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-sm sm:text-base">뒤로가기</span>
      </button>

      {/* 메뉴 상세 정보 */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
          {/* 이미지 영역 */}
          <div className="space-y-4">
            {/* 메인 이미지 */}
            <div className="relative">
              <img
                src={getCurrentImage()}
                alt={menuItem.name}
                className="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-2xl aspect-square"
              />
              
              {/* 이미지 슬라이더 화살표 */}
              {(menuItem.images && menuItem.images.length > 1) && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300 touch-manipulation"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300 touch-manipulation"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </button>
                  
                  {/* 이미지 개수 표시 */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 bg-black/50 text-white text-xs sm:text-sm rounded-full">
                    {currentImageIndex + 1} / {menuItem.images.length}
                  </div>
                </>
              )}
              
              {/* 하트 버튼 */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-2 sm:top-4 left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-300 touch-manipulation"
              >
                <Heart 
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
                />
              </button>
            </div>

            {/* 썸네일 이미지 네비게이션 */}
            {(menuItem.images && menuItem.images.length > 1) && (
              <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
                {menuItem.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation ${
                      currentImageIndex === index
                        ? 'border-pink-500 shadow-lg scale-110'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${menuItem.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 상세 정보 영역 */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {menuItem.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {menuItem.description}
              </p>
            </div>

            {/* 별점 */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm sm:text-base">4.8 (127 리뷰)</span>
            </div>

            {/* 가격 */}
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              ₩{menuItem.price.toLocaleString()}
            </div>

            {/* 수량 선택 */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">수량</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors touch-manipulation"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="text-lg sm:text-xl font-bold text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors touch-manipulation"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 총 가격 */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base font-semibold text-gray-900">총 가격</span>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                  ₩{(menuItem.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* 주문하기 버튼 */}
            <button
              onClick={handleOrder}
              className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-base sm:text-lg rounded-2xl hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl touch-manipulation"
            >
              <span className="flex items-center justify-center space-x-2">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>주문하기</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 르플로의 특징 섹션 */}
      <div className="space-y-6 sm:space-y-8">
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-3xl p-6 sm:p-8 shadow-lg">
          
          <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            {menuItem.cafeInfo ? (
              // 메뉴별 고유 정보 표시
              <>
                {/* 카페 정보 이미지들 */}
                {menuItem.cafeInfo.images && menuItem.cafeInfo.images.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {menuItem.cafeInfo.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`${menuItem.name} 관련 이미지 ${index + 1}`}
                            className="w-full h-24 sm:h-32 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 카페 정보 텍스트 */}
                {menuItem.cafeInfo.text.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </>
            ) : (
              // 기본 정보 (cafeInfo가 없는 경우)
              <>
                <p>
                  ✔️ <strong>르플로의 모든 디저트는 사장님이 직접 만들어요!</strong>
                </p>
                
                <p>
                  ✔️ <strong>모든 디저트에는 엘르앤비르, 프레지덩 발효버터를 사용하고, 에그타르트에는 바닐라향 액체가 아닌 고급 바닐라빈을 사용합니다.</strong>
                </p>
                
                <p>
                  저렴한재료로 만든 저가디저트와 비교❌❌❌
                </p>
                
                <p>
                  고급재료들로만 만드는 타 디저트카페에 비해 굉장히 착한 가격으로 책정했답니다..🫶🏻
                </p>
                
                <p>
                  마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤
                </p>
                
                <p>
                  ✔️ <strong>구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!</strong>
                </p>
                
                <p>
                  ✔️ <strong>샌드위치 하프가 포함된 구성의 경우 짝수주문 부탁드립니다.</strong> 샌드위치를 하나 만들면 반으로 잘라 2쪽이 나오고, 1쪽씩 포장해드리기 때문입니다!
                </p>
                
                <p>
                  ✔️ <strong>단체주문 할인제도는 따로 없습니다!</strong>
                </p>
                
                <p>
                  ✔️ <strong>카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)</strong>
                </p>
                
                <p>
                  ✔️ <strong>법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.</strong>
                </p>
                
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-2xl shadow-sm">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">❗️주문양식❗️</h3>
                  <p className="text-sm sm:text-base">
                    필요하신 수량과 구성or가격대/ 날짜와 시간/ 수령인 성함, 연락처/ 배달지 상세주소/ 결제방법/ 문구스티커 여부, 내용/를 작성해줘
                  </p>
                </div>
              </>
            )}
            
            {/* 주문양식은 모든 메뉴에 공통으로 표시 */}
            {menuItem.cafeInfo && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-2xl shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">❗️주문양식❗️</h3>
                <p className="text-sm sm:text-base">
                  필요하신 수량과 구성or가격대/ 날짜와 시간/ 수령인 성함, 연락처/ 배달지 상세주소/ 결제방법/ 문구스티커 여부, 내용/를 작성해줘
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 