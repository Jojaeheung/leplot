import type { Order, MenuItem } from '../types';

const ORDERS_KEY = 'cafe_orders';
const MENU_KEY = 'cafe_menu';

// 주문 관련 함수들
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const updateOrder = (orderId: string, updates: Partial<Order>): void => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
};

// 메뉴 관련 함수들
export const getMenuItems = (): MenuItem[] => {
  const menu = localStorage.getItem(MENU_KEY);
  if (menu) {
    return JSON.parse(menu);
  }
  
  // 초기 메뉴 데이터
  const initialMenu: MenuItem[] = [
    {
      id: '1',
      name: '아메리카노',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
      description: '진한 에스프레소와 물의 조화',
      category: 'coffee'
    },
    {
      id: '2',
      name: '카페라떼',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400',
      description: '부드러운 우유와 에스프레소의 만남',
      category: 'coffee'
    },
    {
      id: '3',
      name: '티라미수',
      price: 6000,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
      description: '이탈리아 정통 디저트',
      category: 'dessert'
    },
    {
      id: '4',
      name: '크로와상',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      description: '버터향 가득한 프랑스 빵',
      category: 'dessert'
    },
    {
      id: '5',
      name: '클럽 샌드위치',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      description: '신선한 야채와 햄, 치즈가 들어간 샌드위치',
      category: 'sandwich'
    },
    {
      id: '6',
      name: '아이스티',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
      description: '시원한 복숭아 아이스티',
      category: 'beverage'
    }
  ];
  
  localStorage.setItem(MENU_KEY, JSON.stringify(initialMenu));
  return initialMenu;
};

export const addMenuItem = (item: MenuItem): void => {
  const menu = getMenuItems();
  menu.push(item);
  localStorage.setItem(MENU_KEY, JSON.stringify(menu));
};