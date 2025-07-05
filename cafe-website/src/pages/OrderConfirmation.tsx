import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, Home, CreditCard, Phone, MapPin, Gift, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, quantity, orderInfo } = location.state || {};
  const [copied, setCopied] = useState(false);

  // 계좌 정보
  const bankInfo = {
    bank: '농협',
    accountNumber: '123-456-789012',
    accountHolder: '르플로(LePLOT)'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!item || !quantity || !orderInfo) {
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
        {/* 주문 완료 헤더 */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8 text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            주문이 완료되었습니다!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            주문 정보를 확인 후 계좌이체로 결제를 완료해 주세요.
          </p>
        </div>

        {/* 주문 정보 요약 */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
            <span>주문 정보</span>
          </h2>
          
          {/* 상품 정보 */}
          <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{item.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">수량: {quantity}개</p>
                <p className="text-xl sm:text-2xl font-bold text-pink-600">
                  총 금액: ₩{(item.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 주문 상세 정보 */}
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">수령 일시</h4>
                <p className="text-gray-600 text-sm sm:text-base">{orderInfo.date} {orderInfo.time}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 flex items-center space-x-1 text-sm sm:text-base">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>주문인</span>
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">{orderInfo.ordererName}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{orderInfo.ordererPhone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">수령인</h4>
                <p className="text-gray-600 text-sm sm:text-base">{orderInfo.recipientName}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{orderInfo.recipientPhone}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 flex items-center space-x-1 text-sm sm:text-base">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>배달지</span>
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm break-words">{orderInfo.address}</p>
              </div>
            </div>

            {orderInfo.stickerRequired && (
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 flex items-center space-x-1 text-sm sm:text-base">
                  <Gift className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>문구스티커</span>
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">{orderInfo.stickerContent}</p>
              </div>
            )}

            {orderInfo.requests && (
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 flex items-center space-x-1 text-sm sm:text-base">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>기타 요청사항</span>
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">{orderInfo.requests}</p>
              </div>
            )}
          </div>
        </div>

        {/* 계좌 정보 */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center space-x-2">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
            <span>입금 계좌 정보</span>
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-200">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <p className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">무통장 입금</p>
                <p className="text-sm text-gray-600">아래 계좌로 입금해 주세요</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">은행</span>
                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{bankInfo.bank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">계좌번호</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-base sm:text-lg text-gray-800">{bankInfo.accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(bankInfo.accountNumber)}
                        className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors touch-manipulation"
                        title="계좌번호 복사"
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm sm:text-base">예금주</span>
                    <span className="font-semibold text-gray-800 text-sm sm:text-base">{bankInfo.accountHolder}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-600 text-sm sm:text-base">입금액</span>
                    <span className="font-bold text-lg sm:text-xl text-pink-600">
                      ₩{(item.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {copied && (
                <div className="text-center">
                  <p className="text-green-600 font-semibold text-sm sm:text-base">계좌번호가 복사되었습니다!</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-xs sm:text-sm text-yellow-800">
              <strong>입금 시 주의사항:</strong><br/>
              • 입금자명은 주문인명과 동일하게 해주세요<br/>
              • 입금 확인 후 제작에 들어가며, 수령일 3일 전까지 취소/변경 가능합니다<br/>
              • 문의사항이 있으시면 카카오톡으로 연락주세요
            </p>
          </div>
        </div>

        {/* 홈으로 가기 버튼 */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg touch-manipulation"
          >
            <span className="flex items-center justify-center space-x-2">
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>홈으로 가기</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 