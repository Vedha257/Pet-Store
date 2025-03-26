// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { pets, products, clearCart } = useCart();
  const router = useRouter();
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pets.length === 0 && products.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const data = {
      customer,
      pets,
      products,
      mode: "cash",
    };

    const response = await fetch("/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      clearCart();
      router.push(`/receipt/${result.purchaseId}`);
    } else {
      alert("Error creating purchase");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
        {pets.length === 0 && products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {pets.map((petId) => (
              <li key={petId}>Pet ID: {petId}</li>
            ))}
            {products.map((item) => (
              <li key={item.productId}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={customer.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="phoneNo"
            placeholder="Phone Number"
            value={customer.phoneNo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={customer.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Confirm Purchase
          </button>
        </form>
      </section>
    </div>
  );
}