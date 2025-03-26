// src/components/ProductItem.tsx
"use client";

import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  description?: string;
  imageUrl?: string;
}

export default function ProductItem({ product }: { product: Product }) {
  const { addProduct } = useCart();

  return (
    <li className="border p-4 rounded shadow">
      <p>
        {product.name} ({product.category}) - ${product.price}
      </p>
      <p className="text-sm text-gray-600">Stock: {product.stockQuantity}</p>
      {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
      <button
        onClick={() => addProduct(product.id, 1)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </li>
  );
}