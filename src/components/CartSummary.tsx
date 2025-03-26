"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export default function CartSummary() {
  const { pets, products } = useCart();
  const totalItems =
    pets.length + products.reduce((sum, item) => sum + item.quantity, 0);
  const petsTotal = pets.reduce((sum, pet) => sum + pet.price, 0);
  const productsTotal = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalPrice = petsTotal + productsTotal;

  if (totalItems === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add items to get started
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" disabled>
            <Link href="/checkout">Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Your Cart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pets.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Pets</h3>
            <ul className="space-y-2">
              {pets.map((pet) => (
                <li key={pet.id} className="flex justify-between">
                  <span>
                    {pet.type} - {pet.breed}
                  </span>
                  <span>{formatPrice(pet.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {products.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Products</h3>
            <ul className="space-y-2">
              {products.map((item) => (
                <li key={item.product.id} className="flex justify-between">
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Separator className="my-2" />

        <div className="flex justify-between font-medium">
          <span>
            Total ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
