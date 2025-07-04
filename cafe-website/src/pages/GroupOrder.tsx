import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import type { MenuItem, OrderItem } from '../types';
import { getMenuItems, saveOrder } from '../utils/storage';

export function GroupOrder() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Map<string, OrderItem>>(new Map());
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    setMenuItems(getMenuItems());
  }, []);
  
  const addToCart = (item: MenuItem) => {
    const newCart = new Map(cart);
    const existing = newCart.get(item.id);
    
    if (existing) {
      newCart.set(item.id, { ...existing, quantity: existing.quantity + 1 });
    } else {
      newCart.set(item.id, { ...item, quantity: 1 });
    }
    
    setCart(newCart);
  };
  
  const removeFromCart = (itemId: string) => {
    const newCart = new Map(cart);
    const existing = newCart.get(itemId);
    
    if (existing && existing.quantity > 1) {
      newCart.set(itemId, { ...existing, quantity: existing.quantity - 1 });
    } else {
      newCart.delete(itemId);
    }
    
    setCart(newCart);
  };
  
  const getCartItems = (): OrderItem[] => Array.from(cart.values());
  
  const getTotalPrice = (): number => {
    return getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.size === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: getCartItems(),
      totalPrice: getTotalPrice(),
      customerName,
      customerPhone,
      status: 'pending' as const,
      notes,
      isGroupOrder: true
    };
    
    saveOrder(order);
    alert('주문이 성공적으로 접수되었습니다!');
    navigate('/order-history');
  };
  
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* 메뉴 선택 영역 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">메뉴 선택</h2>
        <div className="space-y-4">
          {menuItems.map((item) => {
            const cartItem = cart.get(item.id);
            const quantity = cartItem?.quantity || 0;
            
            return (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-amber-600 font-bold">₩{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                    disabled={quantity === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-1 rounded-full bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 주문 정보 영역 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">주문 정보</h2>
        
        {/* 장바구니 */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            장바구니
          </h3>
          
          {cart.size === 0 ? (
            <p className="text-gray-500">장바구니가 비어있습니다.</p>
          ) : (
            <div className="space-y-2">
              {getCartItems().map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x {item.quantity}</span>
                  </div>
                  <span className="font-medium">
                    ₩{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>총 금액</span>
                  <span className="text-amber-600">₩{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 주문자 정보 */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">주문자 정보</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연락처 *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                요청사항
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="특별한 요청사항이 있으면 입력해주세요."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-md font-medium hover:bg-amber-600 transition-colors"
            >
              주문하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}