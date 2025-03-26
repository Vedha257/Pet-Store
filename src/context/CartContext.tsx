"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { Pet, Product } from "@/lib/types";

interface CartProduct {
  product: Product;
  quantity: number;
}

interface CartContextType {
  pets: Pet[];
  products: CartProduct[];
  addPet: (pet: Pet) => void;
  removePet: (petId: string) => void;
  addProduct: (product: Product, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pets, setPets] = useState<Pet[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartPets");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [products, setProducts] = useState<CartProduct[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartProducts");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cartPets", JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }, [products]);

  const addPet = (pet: Pet) => {
    if (!pets.some((p) => p.id === pet.id)) {
      setPets((prev) => [...prev, pet]);
    }
  };

  const removePet = (petId: string) => {
    setPets((prev) => prev.filter((p) => p.id !== petId));
  };

  const addProduct = (product: Product, quantity: number) => {
    const existing = products.find((item) => item.product.id === product.id);
    if (existing) {
      setProducts((prev) =>
        prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stockQuantity
                ),
              }
            : item
        )
      );
    } else {
      setProducts((prev) => [...prev, { product, quantity }]);
    }
  };

  const removeProduct = (productId: string) => {
    setProducts((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setPets([]);
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        pets,
        products,
        addPet,
        removePet,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
