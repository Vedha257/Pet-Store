"use client";

import Image from "next/image";
import type { Pet } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface PetCardProps {
  pet: Pet;
  onAddToCart: (pet: Pet) => void;
}

export function PetCard({ pet, onAddToCart }: PetCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full">
      <div className="relative aspect-square overflow-hidden">
        {pet.imageUrl ? (
          <Image
            src={pet.imageUrl || "/placeholder.svg"}
            alt={`${pet.type} ${pet.breed}`}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <Badge className="absolute top-2 right-2">{pet.type}</Badge>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2">{pet.breed}</h3>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Age: {pet.age} {pet.age === 1 ? "year" : "years"}
            </p>
            <p className="font-medium text-lg mt-1">{formatPrice(pet.price)}</p>
          </div>
        </div>
        {pet.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {pet.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onAddToCart(pet)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
