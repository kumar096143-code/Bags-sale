
export interface Product {
  id: string;
  name: string;
  category: 'Handbags' | 'Backpacks' | 'Travel' | 'Clutches';
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface AIRecommendationRequest {
  occasion: string;
  style: string;
  budget: string;
}
