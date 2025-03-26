"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { addProduct } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addProduct}
        />
      ))}
    </div>
  );
}
