/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

export default function ProductItem({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <li className="border p-4 rounded shadow">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover mb-2"
        />
      )}
      <p>
        {product.name} ({product.category}) - ${product.price}
      </p>
      <p className="text-sm text-gray-600">Stock: {product.stockQuantity}</p>
      {product.description && (
        <p className="text-sm text-gray-600">{product.description}</p>
      )}
      <input
        type="number"
        min="1"
        max={product.stockQuantity}
        value={quantity}
        onChange={(e) =>
          setQuantity(
            Math.min(parseInt(e.target.value) || 1, product.stockQuantity)
          )
        }
        className="w-16 p-1 border rounded mr-2"
      />
      <button
        onClick={() => addProduct(product, quantity)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </li>
  );
}
