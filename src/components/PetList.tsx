"use client";

import type { Pet } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { PetCard } from "@/components/PetCard";

interface PetListProps {
  pets: Pet[];
}

export function PetList({ pets }: PetListProps) {
  const { addPet } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onAddToCart={addPet} />
      ))}
    </div>
  );
}
