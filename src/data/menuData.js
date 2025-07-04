export const groupMenuData = [
  {
    id: 1,
    name: '아메리카노 세트',
    description: '진한 에스프레소와 물의 완벽한 조화',
    price: 35000,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '커피',
    options: ['일반', '디카페인'],
    popular: true
  },
  {
    id: 2,
    name: '카페라떼 세트',
    description: '부드러운 우유거품과 에스프레소의 환상적인 만남',
    price: 42000,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '커피',
    options: ['일반', '오트밀크', '두유'],
    popular: false
  },
  {
    id: 3,
    name: '카푸치노 세트',
    description: '진한 에스프레소와 부드러운 우유거품의 조화',
    price: 45000,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '커피',
    options: ['일반', '바닐라시럽 추가'],
    popular: true
  },
  {
    id: 4,
    name: '샌드위치 플래터',
    description: '신선한 재료로 만든 다양한 샌드위치 모음',
    price: 65000,
    minOrder: 15,
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '푸드',
    options: ['참치', '햄', '치킨', '베지'],
    popular: false
  },
  {
    id: 5,
    name: '베이커리 세트',
    description: '갓 구운 신선한 빵과 페이스트리 모음',
    price: 55000,
    minOrder: 12,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '베이커리',
    options: ['크루아상', '머핀', '스콘', '도넛'],
    popular: true
  },
  {
    id: 6,
    name: '티 컬렉션',
    description: '프리미엄 티백과 허브티 모음',
    price: 38000,
    minOrder: 10,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: '차',
    options: ['얼그레이', '자스민', '페퍼민트', '캐모마일'],
    popular: false
  }
];

export const categories = [
  { id: 'all', name: '전체' },
  { id: '커피', name: '커피' },
  { id: '푸드', name: '푸드' },
  { id: '베이커리', name: '베이커리' },
  { id: '차', name: '차' }
];