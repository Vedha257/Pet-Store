/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { pets, products, removePet, removeProduct, clearCart } = useCart();
  const router = useRouter();
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
  });
  const [paymentMode, setPaymentMode] = useState("cash");
  const [error, setError] = useState("");

  const totalPrice =
    pets.reduce((sum, pet) => sum + pet.price, 0) +
    products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pets.length === 0 && products.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    const data = {
      customer,
      pets: pets.map((pet) => pet.id),
      products: products.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      mode: paymentMode,
    };

    try {
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
        const errorData = await response.json();
        setError(errorData.error || "Error creating purchase");
      }
    } catch (err: any) {
      setError(`An unexpected error occurred: ${err}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
        {pets.length === 0 && products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {pets.map((pet) => (
              <li key={pet.id}>
                {pet.type} - {pet.breed} - ${pet.price}
                <button
                  onClick={() => removePet(pet.id)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
            {products.map((item) => (
              <li key={item.product.id}>
                {item.product.name} - Quantity: {item.quantity} - $
                {(item.product.price * item.quantity).toFixed(2)}
                <button
                  onClick={() => removeProduct(item.product.id)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
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
            placeholder="Address (optional)"
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
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
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
