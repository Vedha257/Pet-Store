// src/components/PetItem.tsx
"use client";

import { useCart } from "@/context/CartContext";

interface Pet {
  id: string;
  type: string;
  breed: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export default function PetItem({ pet }: { pet: Pet }) {
  const { addPet } = useCart();

  return (
    <li className="border p-4 rounded shadow">
      <p>
        {pet.type} - {pet.breed} - ${pet.price}
      </p>
      {pet.description && <p className="text-sm text-gray-600">{pet.description}</p>}
      <button
        onClick={() => addPet(pet.id)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </li>
  );
}