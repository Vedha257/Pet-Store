"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartSummary() {
  const { pets, products } = useCart();
  const totalItems =
    pets.length + products.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice =
    pets.reduce((sum, pet) => sum + pet.price, 0) +
    products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="p-4 bg-gray-100 rounded mb-4">
      <p>Cart: {totalItems} items</p>
      <p>Total: ${totalPrice.toFixed(2)}</p>
      <Link href="/checkout" className="text-blue-500 hover:underline">
        Go to Checkout
      </Link>
    </div>
  );
}
