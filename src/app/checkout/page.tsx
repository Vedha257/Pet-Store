/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Trash2 } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const petsTotal = pets.reduce((sum, pet) => sum + pet.price, 0);
  const productsTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalPrice = petsTotal + productsTotal;

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

    setIsSubmitting(true);

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
      setError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Your Cart</CardTitle>
              <CardDescription>
                Review your items before checkout
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pets.length === 0 && products.length === 0 ? (
                <p className="text-muted-foreground py-4">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-6">
                  {pets.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">Pets</h3>
                      <ul className="space-y-3">
                        {pets.map((pet) => (
                          <li
                            key={pet.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">
                                {pet.type} - {pet.breed}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Age: {pet.age}{" "}
                                {pet.age === 1 ? "year" : "years"}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="font-medium">
                                {formatPrice(pet.price)}
                              </p>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removePet(pet.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {products.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">Products</h3>
                      <ul className="space-y-3">
                        {products.map((item) => (
                          <li
                            key={item.product.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="font-medium">
                                {formatPrice(
                                  item.product.price * item.quantity
                                )}
                              </p>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeProduct(item.product.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-6">
              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <span>Pets Subtotal</span>
                  <span>{formatPrice(petsTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Products Subtotal</span>
                  <span>{formatPrice(productsTotal)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Enter your details to complete the purchase
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNo" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNo"
                    name="phoneNo"
                    value={customer.phoneNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <Input
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="paymentMode" className="text-sm font-medium">
                    Payment Method
                  </label>
                  <Select
                    value={paymentMode}
                    onValueChange={(value) => setPaymentMode(value)}
                  >
                    <SelectTrigger id="paymentMode">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isSubmitting || (pets.length === 0 && products.length === 0)
                  }
                >
                  {isSubmitting ? "Processing..." : "Confirm Purchase"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
