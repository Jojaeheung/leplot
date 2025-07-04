export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'coffee' | 'dessert' | 'sandwich' | 'beverage';
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  isGroupOrder: boolean;
}