import { useState, useEffect } from 'react';
import { Calendar, Phone, Package, ChevronDown, ChevronUp } from 'lucide-react';
import type { Order } from '../types';
import { getOrders } from '../utils/storage';

const statusLabels = {
  pending: '대기중',
  confirmed: '확인됨',
  completed: '완료',
  cancelled: '취소됨'
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  useEffect(() => {
    const allOrders = getOrders();
    // 최신 주문이 먼저 오도록 정렬
    setOrders(allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []);
  
  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };
  
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">주문 내역</h1>
      
      {/* 필터 */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-md font-medium ${
            filterStatus === 'all'
              ? 'bg-amber-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          전체
        </button>
        {Object.entries(statusLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`px-4 py-2 rounded-md font-medium ${
              filterStatus === key
                ? 'bg-amber-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* 주문 목록 */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">주문 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow">
              {/* 주문 헤더 */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold">주문번호: {order.id}</h3>
                      {order.isGroupOrder && (
                        <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
                          단체주문
                        </span>
                      )}
                      <span className={`text-sm px-2 py-1 rounded ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(order.date)}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {order.customerName} ({order.customerPhone})
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        총 {order.items.reduce((sum, item) => sum + item.quantity, 0)}개 품목
                      </p>
                      <p className="text-lg font-bold text-amber-600">
                        ₩{order.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {expandedOrders.has(order.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* 주문 상세 정보 */}
              {expandedOrders.has(order.id) && (
                <div className="border-t px-6 py-4">
                  <h4 className="font-medium mb-3">주문 품목</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded mr-3"
                          />
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-500 ml-2">x {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-medium">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {order.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm font-medium text-gray-700">요청사항:</p>
                      <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}