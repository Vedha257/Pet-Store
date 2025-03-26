/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/context/CartContext";
import { Pet } from "@/lib/types";

export default function PetItem({ pet }: { pet: Pet }) {
  const { addPet } = useCart();

  return (
    <li className="border p-4 rounded shadow">
      {pet.imageUrl && (
        <img
          src={pet.imageUrl}
          alt={`${pet.type} ${pet.breed}`}
          className="w-full h-48 object-cover mb-2"
        />
      )}
      <p>
        {pet.type} - {pet.breed} - ${pet.price}
      </p>
      {pet.description && (
        <p className="text-sm text-gray-600">{pet.description}</p>
      )}
      <button
        onClick={() => addPet(pet)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </li>
  );
}
