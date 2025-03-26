export interface Pet {
  id: string;
  type: string;
  breed: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  description?: string;
  imageUrl?: string;
}
