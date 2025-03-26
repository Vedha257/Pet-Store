// src/context/CartContext.tsx
"use client";

import React, { createContext, useState, useContext } from "react";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  pets: string[];
  products: CartItem[];
  addPet: (petId: string) => void;
  removePet: (petId: string) => void;
  addProduct: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<string[]>([]);
  const [products, setProducts] = useState<CartItem[]>([]);

  const addPet = (petId: string) => {
    if (!pets.includes(petId)) {
      setPets([...pets, petId]);
    }
  };

  const removePet = (petId: string) => {
    setPets(pets.filter((id) => id !== petId));
  };

  const addProduct = (productId: string, quantity: number) => {
    const existing = products.find((item) => item.productId === productId);
    if (existing) {
      setProducts(
        products.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setProducts([...products, { productId, quantity }]);
    }
  };

  const removeProduct = (productId: string) => {
    setProducts(products.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setPets([]);
    setProducts([]);
  };

  return (
    <CartContext.Provider value={{ pets, products, addPet, removePet, addProduct, removeProduct, clearCart }}>
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