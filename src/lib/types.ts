export interface Pet {
  id: string;
  type: string;
  breed: string;
  price: number;
  age: number;
  description?: string | null;
  imageUrl?: string | null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  description?: string | null;
  imageUrl?: string | null;
}
