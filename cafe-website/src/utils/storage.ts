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
  
  // 초기 메뉴 데이터 - 카페 르플로 실제 메뉴
  const initialMenu: MenuItem[] = [
    {
      id: '1',
      name: '르뱅쿠키(미니)+쌀오란다',
      price: 3750,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDNfMjM4/MDAxNzM1ODg4NTg5MjA2.irQ39TLtcGChfSHVyNoFdGoZE1qeOPbkjaLXIoAtLkkg.zjs2JZQZ4tKUEKNzF0yJQszNefnpXUj_HXgXWvUufkIg.PNG/image.png?type=w400',
      images: [
        'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
      ],
      description: '미니 르뱅쿠키와 쌀오란다의 달콤한 조합',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 르플로의 모든 디저트는 사장님이 직접 만들어요!

✔️ 모든 디저트에는 엘르앤비르, 프레지덩 발효버터를 사용하고, 에그타르트에는 바닐라향 액체가 아닌 고급 바닐라빈을 사용합니다.

저렴한재료로 만든 저가디저트와 비교❌❌❌

고급재료들로만 만드는 타 디저트카페에 비해 굉장히 착한 가격으로 책정했답니다..🫶🏻

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 르뱅쿠키는 쌀가루로 만든 글루텐프리 쿠키입니다! 부드럽고 바삭한 식감이 특징이에요.

✔️ 쌀오란다는 쌀가루로 만든 전통 프랑스 과자입니다. 달콤하고 촉촉한 맛이 일품!

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
    {
      id: '2',
      name: '미니쿠키5pcs+쌀오란다',
      price: 3800,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDNfMjI4/MDAxNzM1ODg5MjM0Mzgx.HIBHv_AjVeyp8EetgJQ1tIh0OgJbWxDf_d7AuIEEKycg.sL0dUupC3gV_7e2jRhWSZaE4SKIqWruP3w07HM4Z0w4g.PNG/image.png?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDNfMjI4/MDAxNzM1ODg5MjM0Mzgx.HIBHv_AjVeyp8EetgJQ1tIh0OgJbWxDf_d7AuIEEKycg.sL0dUupC3gV_7e2jRhWSZaE4SKIqWruP3w07HM4Z0w4g.PNG/image.png?type=w800',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400'
      ],
      description: '3가지 맛의 미니쿠키 5개와 쌀오란다 - 4가지 맛을 즐기세요!',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 르플로의 모든 디저트는 사장님이 직접 만들어요!

✔️ 미니쿠키는 3가지 다른 맛으로 구성되어 있어 한 번에 여러 맛을 즐길 수 있어요!

✔️ 쌀오란다와 함께 드시면 더욱 풍부한 맛을 경험하실 수 있습니다.

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 개별 포장도 가능하니 선물용으로도 완벽합니다.

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1594506905406-7b8c8f0a3912?w=400',
          'https://images.unsplash.com/photo-1600359756330-9b9c73a6d817?w=400'
        ]
      }
    },
    {
      id: '3',
      name: '미니쿠키세트',
      price: 4500,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDNfMjgx/MDAxNzM1ODkyMDExNzI1.7p_D1QqJ8ThpJWkOUaU-YhsWUlM2UQwwOEkWVcMdyJ8g.MxMAPqMmCTGJW_7pfCaImKkQa6Xbxw1-klKmwq8WW3gg.PNG/image.png?type=w400',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDNfMjgx/MDAxNzM1ODkyMDExNzI1.7p_D1QqJ8ThpJWkOUaU-YhsWUlM2UQwwOEkWVcMdyJ8g.MxMAPqMmCTGJW_7pfCaImKkQa6Xbxw1-klKmwq8WW3gg.PNG/image.png?type=w400',
        'https://images.unsplash.com/photo-1594506905406-7b8c8f0a3912?w=400',
        'https://images.unsplash.com/photo-1600359756330-9b9c73a6d817?w=400'
      ],
      description: '4가지 맛 이상의 미니쿠키 세트 - 인기 메뉴!',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 르플로의 인기 1위 메뉴! 미니쿠키세트입니다.

✔️ 4가지 맛 이상의 다양한 미니쿠키 10개로 구성되어 있어요.

✔️ 초콜릿, 바닐라, 딸기, 녹차 등 계절에 따라 다른 맛으로 구성됩니다.

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 회사 답례품, 개업 답례품으로 가장 많이 선택되는 메뉴입니다.

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 단체주문 할인제도는 따로 없습니다!

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
          'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400'
        ]
      }
    },
    {
      id: '4',
      name: '인절미쿠키',
      price: 3900,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDNfMjc1/MDAxNzM1ODkyMDY4NTkw.u3TLBnS_V202O8CTNCsGP8Gm6uEZeBk7hOJSgkZnoQcg.6AsEr5HpfQzyKZ5u1PzEl27E0XH7rZoOfuMjs1E5pWIg.PNG/image.png?type=w400',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDNfMjc1/MDAxNzM1ODkyMDY4NTkw.u3TLBnS_V202O8CTNCsGP8Gm6uEZeBk7hOJSgkZnoQcg.6AsEr5HpfQzyKZ5u1PzEl27E0XH7rZoOfuMjs1E5pWIg.PNG/image.png?type=w400',
        'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
        'https://images.unsplash.com/photo-1583654910371-9e5b3e4a8b7e?w=400'
      ],
      description: '24년 하반기 신메뉴! 한국적 맛의 인절미쿠키',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 2024년 하반기 신메뉴! 한국적인 맛의 인절미쿠키입니다.

✔️ 국산 쌀가루와 인절미 파우더를 사용하여 만든 특별한 쿠키예요.

✔️ 쫄깃한 인절미의 맛과 바삭한 쿠키의 식감이 완벽하게 조화를 이룹니다.

✔️ 전통적인 한국의 맛을 현대적으로 재해석한 르플로만의 특별한 레시피!

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 외국인 선물로도 인기가 많은 한국적 디저트입니다.

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
          'https://images.unsplash.com/photo-1583654910371-9e5b3e4a8b7e?w=400'
        ]
      }
    },
    {
      id: '5',
      name: '구움과자+팩음료(구디백)',
      price: 4800,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDFfMTg3/MDAxNzM1NjYyMTg5OTQ2.UkionafXm2s1U_QWEuPz1oTJuvOrEInu8E7jEYiXRKMg.X1SuUTLwQNHbaEvRGJF2sUTut0f5rbuGj0gIp4LRj-Eg.PNG/image.png?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDFfMTg3/MDAxNzM1NjYyMTg5OTQ2.UkionafXm2s1U_QWEuPz1oTJuvOrEInu8E7jEYiXRKMg.X1SuUTLwQNHbaEvRGJF2sUTut0f5rbuGj0gIp4LRj-Eg.PNG/image.png?type=w800'
      ],
      description: '직접 담근 당근라페, 적채피클, 양상추, 토마토 포함 (하프 사이즈)',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 구움과자와 팩음료가 함께 들어간 구디백 세트입니다!

✔️ 예쁜 구디백에 포장되어 있어 선물용으로 완벽해요.

✔️ 구움과자는 당일 제작한 신선한 제품으로만 구성됩니다.

✔️ 팩음료는 오렌지, 사과, 포도 중 선택 가능합니다.

✔️ 아이들 간식용, 피크닉용으로도 인기가 많은 메뉴입니다.

✔️ 구디백은 재사용 가능한 친환경 소재로 제작됩니다.

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
//     {
//       id: '6',
//       name: '쌀휘낭시에+쌀오란다',
//       price: 4000,
//       image: 'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400',
//       images: [
//         'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400',
//         'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
//         'https://images.unsplash.com/photo-1566451426075-f4eb7e9a71ce?w=400'
//       ],
//       description: '쌀휘낭시에와 쌀오란다의 조합 (최소 4000원부터)',
//       category: 'dessert',
//       cafeInfo: {
//         text: `✔️ 쌀가루로 만든 글루텐프리 휘낭시에와 쌀오란다의 조합입니다!

// ✔️ 촉촉하고 부드러운 휘낭시에와 달콤한 쌀오란다가 완벽한 조화를 이룹니다.

// ✔️ 글루텐프리 제품으로 알레르기 걱정 없이 드실 수 있어요.

// ✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

// 마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

// ✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

// ✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
//         images: [
//           'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
//           'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
//           'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
//         ]
//       }
//     },
    {
      id: '7',
      name: '하프팩주스',
      price: 4200,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNDExMDVfMjk2/MDAxNzMwNzgwODg4MzU0.zTXj6En1nV7uQszv8Ff8zUDxPNIYcRAg-C_C_AB795sg.SUosS8PQXpl-oQ5wSEdifauFr8C_sYK0xN6D39Kjgo8g.JPEG/IMG_2048.jpg?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNDExMDVfMjk2/MDAxNzMwNzgwODg4MzU0.zTXj6En1nV7uQszv8Ff8zUDxPNIYcRAg-C_C_AB795sg.SUosS8PQXpl-oQ5wSEdifauFr8C_sYK0xN6D39Kjgo8g.JPEG/IMG_2048.jpg?type=w800',
        'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ],
      description: '샌드위치 반절 + 팩주스',
      category: 'sandwich',
      cafeInfo: {
        text: `✔️ 샌드위치 하프 사이즈와 팩주스의 조합으로 간편한 한 끼 식사로 완벽해요!

✔️ 샌드위치 하프가 포함된 구성의 경우 짝수주문 부탁드립니다. 샌드위치를 하나 만들면 반으로 잘라 2쪽이 나오고, 1쪽씩 포장해드리기 때문입니다!

✔️ 직접 담근 당근라페, 적채피클, 양상추, 토마토 포함으로 신선한 야채를 함께 드실 수 있어요.

✔️ 팩주스는 오렌지, 사과, 토마토 중 선택 가능합니다.

✔️ 아이들 간식용, 가벼운 식사용으로 인기가 많은 메뉴입니다.

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
    {
      id: '9',
      name: '플레인스콘+르뱅쿠키+쌀휘낭시에',
      price: 8500,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTA2MjhfMTA4/MDAxNzUxMDg4NzgyMjAw.COTKOGA5D2FzxXJyFVm1m9V3bO7aZg0oYJGfRohOxA0g.tPw1KxfQEA7LSSF28Yy6Zp2RqoejsiO5for3xpCUx5Yg.JPEG/IMG%EF%BC%BF9972.jpg?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNTA2MjhfMTA4/MDAxNzUxMDg4NzgyMjAw.COTKOGA5D2FzxXJyFVm1m9V3bO7aZg0oYJGfRohOxA0g.tPw1KxfQEA7LSSF28Yy6Zp2RqoejsiO5for3xpCUx5Yg.JPEG/IMG%EF%BC%BF9972.jpg?type=w800',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400',
        'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400',
        'https://images.unsplash.com/photo-1594506905406-7b8c8f0a3912?w=400'
      ],
      description: '다양한 디저트가 들어간 프리미엄 박스 (6개 구성)',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 플레인스콘, 르뱅쿠키, 쌀휘낭시에가 함께 들어간 프리미엄 세트입니다!

✔️ 6개 구성으로 다양한 디저트를 한 번에 즐기실 수 있어요.

✔️ 모든 제품이 쌀가루로 만들어진 글루텐프리 디저트입니다.

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 회사 미팅, 답례품용으로 인기가 많은 구성입니다.

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
    {
      id: '10',
      name: '미니쿠키+쌀휘낭시에',
      price: 15000,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDFfMjQw/MDAxNzM1NjYxNTM2ODE4.nQCJ56CX6WNZszq8OSIIggw2b4UfEGw5Z7dtbzyxjm8g.hjHbWGaltYINLeRG2oPEahF1djim8L_dmnarj_pqlY4g.PNG/image.png?type=w400',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDFfMjQw/MDAxNzM1NjYxNTM2ODE4.nQCJ56CX6WNZszq8OSIIggw2b4UfEGw5Z7dtbzyxjm8g.hjHbWGaltYINLeRG2oPEahF1djim8L_dmnarj_pqlY4g.PNG/image.png?type=w400',
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
        'https://images.unsplash.com/photo-1562440499-64c9a74f0569?w=400',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400'
      ],
      description: '10개 이상 구성 가능한 단체 답례품 세트 (문구 스티커 포함)',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 10개 이상 구성 가능한 단체 답례품 전용 세트입니다!

✔️ 미니쿠키와 쌀휘낭시에의 조합으로 다양한 맛을 경험하실 수 있어요.

✔️ 문구 스티커 제작 가능하여 회사 로고나 인사말을 넣을 수 있습니다.

✔️ 인사이동, 승진 답례품으로 가장 많이 선택되는 메뉴입니다.

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 단체주문 할인제도는 따로 없습니다!

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
    {
      id: '11',
      name: '하프샌드위치+디저트+주스',
      price: 15000,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNDA3MDhfMjYz/MDAxNzIwNDQzOTA5NjE3.aCOJ9vHe-CbVOE05p-ZULYpGYHwNwPbFcxH4KrGbMr0g.Ouh8BQkhT5caDFAm7oBvcVvJuKpFRwntDLrCTyshAEkg.JPEG/IMG_8661.jpg?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNDA3MDhfMjYz/MDAxNzIwNDQzOTA5NjE3.aCOJ9vHe-CbVOE05p-ZULYpGYHwNwPbFcxH4KrGbMr0g.Ouh8BQkhT5caDFAm7oBvcVvJuKpFRwntDLrCTyshAEkg.JPEG/IMG_8661.jpg?type=w800',
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
        'https://images.unsplash.com/photo-1562440499-64c9a74f0569?w=400',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400'
      ],
      description: '에그햄치즈샌드위치(하프), 토마토주스, 무화과크림치즈휘낭시에(쌀), 미니쿠키2알',
      category: 'sandwich',
      cafeInfo: {
        text: `✔️ 에그햄치즈샌드위치(하프), 토마토주스, 무화과크림치즈휘낭시에(쌀), 미니쿠키2알의 완벽한 조합!

✔️ 샌드위치 하프가 포함된 구성의 경우 짝수주문 부탁드립니다.

✔️ 직접 담근 당근라페, 적채피클, 양상추, 토마토가 샌드위치에 포함됩니다.

✔️ 무화과크림치즈휘낭시에는 쌀가루로 만든 글루텐프리 제품입니다.

✔️ 든든한 한 끼 식사와 디저트를 모두 즐길 수 있는 프리미엄 세트!

✔️ 회사 점심 도시락, 개인 선물용으로 인기가 많아요.

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
    {
      id: '12',
      name: '쿠키5종세트',
      price: 15000,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNDAyMjJfMzcg/MDAxNzA4NTc4NTc3Mzcx.VWzA85PebZzBnQxIbme_oi-f7AmYBeyUA29emwAJK4gg.nlyp8wV3YhuCADMjVfYWP2L5h82opvMD6PJ2mW4zK2Qg.PNG/image.png?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNDAyMjJfMzcg/MDAxNzA4NTc4NTc3Mzcx.VWzA85PebZzBnQxIbme_oi-f7AmYBeyUA29emwAJK4gg.nlyp8wV3YhuCADMjVfYWP2L5h82opvMD6PJ2mW4zK2Qg.PNG/image.png?type=w800',
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
        'https://images.unsplash.com/photo-1562440499-64c9a74f0569?w=400',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400'
      ],
      description: '10개 이상 구성 가능한 단체 답례품 세트 (문구 스티커 포함)',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 5가지 다른 맛의 쿠키로 구성된 프리미엄 세트입니다!

✔️ 10개 이상 구성 가능하며 문구 스티커 제작도 가능해요.

✔️ 초콜릿, 바닐라, 딸기, 녹차, 인절미 등 다양한 맛으로 구성됩니다.

✔️ 회사 답례품, 개업 선물로 가장 인기 있는 메뉴입니다.

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 단체주문 할인제도는 따로 없습니다!

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
    {
      id: '13',
      name: '에그타르트+휘낭시에 2종',
      price: 15000,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNDAyMjJfMTgz/MDAxNzA4NTc5MzI0MDUw.70V8baR1HaaYBuHZQzjD_EPo7JTrPhKyBP9lPVlSR_Ag.rWjTqNwsv7GIjB0oxcWNXfZKfx3ZN25_Sxs_BTMFA1kg.PNG/image.png?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNDAyMjJfMTgz/MDAxNzA4NTc5MzI0MDUw.70V8baR1HaaYBuHZQzjD_EPo7JTrPhKyBP9lPVlSR_Ag.rWjTqNwsv7GIjB0oxcWNXfZKfx3ZN25_Sxs_BTMFA1kg.PNG/image.png?type=w800',
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
        'https://images.unsplash.com/photo-1562440499-64c9a74f0569?w=400',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400'
      ],
      description: '10개 이상 구성 가능한 단체 답례품 세트 (문구 스티커 포함)',
      category: 'dessert',
      cafeInfo: {
        text: `✔️ 에그타르트와 휘낭시에 2종으로 구성된 프리미엄 세트입니다!

✔️ 에그타르트에는 바닐라향 액체가 아닌 고급 바닐라빈을 사용합니다.

✔️ 휘낭시에는 2가지 다른 맛으로 구성되어 있어 더욱 풍부한 맛을 즐기실 수 있어요.

✔️ 10개 이상 구성 가능하며 문구 스티커 제작도 가능합니다.

✔️ 구움과자류 구성의 경우 펄프도시락을 기본무료포장으로 해드립니다!

✔️ 단체주문 할인제도는 따로 없습니다!

마다가스카르산 바닐라빈, 마스코바도 비정제당, 국산쌀가루, 발로나코코아가루, 칼리바우트 커버춰 등 좋은재료 때려넣어 만드는 구움과자입니다🖤

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
    },
    {
      id: '14',
      name: '샌드위치',
      price: 15000,
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDFfMTgg/MDAxNzM1NjU3NDgxODkx.iYYN299Dc3G1Ml9p73Ezp74ZnynUDPVKcnn3nL9v4yYg.DzI18IsR6Bz697VvBJR5jv9lMZg3jE5VbYWW2sByeHcg.PNG/image.png?type=w800',
      images: [
        'https://mblogthumb-phinf.pstatic.net/MjAyNTAxMDFfMTgg/MDAxNzM1NjU3NDgxODkx.iYYN299Dc3G1Ml9p73Ezp74ZnynUDPVKcnn3nL9v4yYg.DzI18IsR6Bz697VvBJR5jv9lMZg3jE5VbYWW2sByeHcg.PNG/image.png?type=w800',
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
        'https://images.unsplash.com/photo-1562440499-64c9a74f0569?w=400',
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400'
      ],
      description: '10개 이상 구성 가능한 단체 답례품 세트 (문구 스티커 포함)',
      category: 'sandwich',
      cafeInfo: {
        text: `✔️ 신선한 재료로 만든 프리미엄 샌드위치입니다!

✔️ 직접 담근 당근라페, 적채피클, 양상추, 토마토가 포함되어 있어요.

✔️ 엘르앤비르 프레지덩 발효버터를 사용한 고급스러운 맛!

✔️ 샌드위치 하프가 포함된 구성의 경우 짝수주문 부탁드립니다.

✔️ 10개 이상 구성 가능하며 문구 스티커 제작도 가능합니다.

✔️ 회사 단체 도시락, 피크닉용으로 인기가 많은 메뉴입니다.

✔️ 단체주문 할인제도는 따로 없습니다!

✔️ 카톡상담 주실때 블로그에서 원하는 구성들을 캡쳐해서 보내주시면 상담이 더욱 원활합니다 :)

✔️ 법인카드 결제 외에는 모두 100% 선결제로 진행되며, 날짜변경 및 취소, 환불은 수령일로부터 3일전 낮12시까지 가능합니다.`,
        images: [
          'https://images.unsplash.com/photo-1549312524-d3dbfe3085a3?w=400',
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
          'https://images.unsplash.com/photo-1571506165871-ee72a35836d4?w=400'
        ]
      }
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

export const resetMenuToDefault = (): void => {
  localStorage.removeItem(MENU_KEY);
};