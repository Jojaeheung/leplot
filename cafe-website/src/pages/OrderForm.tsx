import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Phone, MapPin, MessageCircle, Gift, ShoppingCart } from 'lucide-react';

interface OrderFormData {
  date: string;
  time: string;
  ordererName: string;
  ordererPhone: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  stickerRequired: boolean;
  stickerContent: string;
  requests: string;
}

export function OrderForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, quantity } = location.state || {};

  const [formData, setFormData] = useState<OrderFormData>({
    date: '',
    time: '',
    ordererName: '',
    ordererPhone: '',
    recipientName: '',
    recipientPhone: '',
    address: '',
    stickerRequired: false,
    stickerContent: '',
    requests: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 항목 검증
    if (!formData.date || !formData.time || !formData.ordererName || !formData.ordererPhone || 
        !formData.recipientName || !formData.recipientPhone || !formData.address) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 주문 완료 페이지로 이동
    navigate('/order-confirmation', { 
      state: { 
        item, 
        quantity, 
        orderInfo: formData 
      } 
    });
  };

  if (!item || !quantity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">잘못된 접근입니다</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 헤더 */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              주문 정보 입력
            </h1>
          </div>
          
          {/* 주문 요약 */}
          <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">수량: {quantity}개</p>
                <p className="text-base sm:text-lg font-bold text-pink-600">
                  총 금액: ₩{(item.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 주문 정보 입력 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="space-y-6 sm:space-y-8">
            {/* 날짜와 시간 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-pink-500" />
                  <span>수령 날짜 *</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation"
                  required
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 text-pink-500" />
                  <span>수령 시간 *</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation"
                  required
                />
              </div>
            </div>

            {/* 주문인 정보 */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center space-x-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                <span>주문인 정보</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">성함 *</label>
                  <input
                    type="text"
                    name="ordererName"
                    value={formData.ordererName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation"
                    placeholder="주문인 성함을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">연락처 *</label>
                  <input
                    type="tel"
                    name="ordererPhone"
                    value={formData.ordererPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation"
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 수령인 정보 */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center space-x-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                <span>수령인 정보</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">성함 *</label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation"
                    placeholder="수령인 성함을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">연락처 *</label>
                  <input
                    type="tel"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation"
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 배달지 정보 */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 text-pink-500" />
                <span>배달지 상세주소 *</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation resize-none"
                placeholder="상세 주소를 입력하세요 (예: 전북 전주시 완산구 효자동 123-45 아파트 101동 1001호)"
                required
              />
            </div>

            {/* 문구스티커 */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                <Gift className="h-4 w-4 text-pink-500" />
                <span>문구스티커</span>
              </label>
              <div className="flex items-center space-x-4 mb-3 sm:mb-4">
                <label className="flex items-center space-x-2 touch-manipulation">
                  <input
                    type="checkbox"
                    name="stickerRequired"
                    checked={formData.stickerRequired}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">문구스티커 필요</span>
                </label>
              </div>
              {formData.stickerRequired && (
                <textarea
                  name="stickerContent"
                  value={formData.stickerContent}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation resize-none"
                  placeholder="스티커에 들어갈 문구를 입력하세요"
                />
              )}
            </div>

            {/* 기타 요청사항 */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <MessageCircle className="h-4 w-4 text-pink-500" />
                <span>기타 요청사항 & 전달사항</span>
              </label>
              <textarea
                name="requests"
                value={formData.requests}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base touch-manipulation resize-none"
                placeholder="추가 요청사항이나 전달하고 싶은 내용을 입력하세요"
              />
            </div>
          </div>

          {/* 주문 완료 버튼 */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg touch-manipulation"
            >
              주문 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 