/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import CartSummary from "@/components/CartSummary";
import { PetList } from "@/components/PetList";
import { Separator } from "@/components/ui/separator";

interface PetsPageProps {
  searchParams: {
    type?: string;
    breed?: string;
  };
}

export default async function PetsPage({ searchParams }: PetsPageProps) {
  const { type, breed } = searchParams;

  // Build filter based on search params
  const filter: any = { purchaseId: null };
  if (type) filter.type = type;
  if (breed) filter.breed = breed;

  const pets = await prisma.pet.findMany({
    where: filter,
  });

  // Get unique types and breeds for filters
  const allPets = await prisma.pet.findMany({
    where: { purchaseId: null },
    select: { type: true, breed: true },
  });

  const types = [...new Set(allPets.map((pet) => pet.type))];
  const breeds = [...new Set(allPets.map((pet) => pet.breed))];

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold mb-2 md:mb-0">Pets</h1>
            <p className="text-muted-foreground">
              {pets.length} {pets.length === 1 ? "pet" : "pets"} available
            </p>
          </div>

          {/* Active filters */}
          {(type || breed) && (
            <div className="mb-6">
              <h2 className="text-sm font-medium mb-2">Active Filters:</h2>
              <div className="flex flex-wrap gap-2">
                {type && (
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">
                    Type: {type}
                  </div>
                )}
                {breed && (
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">
                    Breed: {breed}
                  </div>
                )}
              </div>
            </div>
          )}

          {pets.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No pets found</h2>
              <p className="text-muted-foreground">
                Try changing your filters or check back later for new arrivals.
              </p>
            </div>
          ) : (
            <PetList pets={pets} />
          )}
        </div>

        <div className="col-span-1">
          <div className="md:sticky top-20 space-y-6">
            <CartSummary />

            <div className="bg-card rounded-lg border p-4">
              <h2 className="font-medium mb-4">Filter Pets</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Type</h3>
                  <div className="space-y-2">
                    {types.map((petType) => (
                      <div key={petType} className="flex items-center">
                        <a
                          href={`/store/pets?type=${petType}${
                            breed ? `&breed=${breed}` : ""
                          }`}
                          className={`text-sm hover:text-primary ${
                            type === petType ? "text-primary font-medium" : ""
                          }`}
                        >
                          {petType}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-2" />

                <div>
                  <h3 className="text-sm font-medium mb-2">Breed</h3>
                  <div className="space-y-2">
                    {breeds.map((petBreed) => (
                      <div key={petBreed} className="flex items-center">
                        <a
                          href={`/store/pets?breed=${petBreed}${
                            type ? `&type=${type}` : ""
                          }`}
                          className={`text-sm hover:text-primary ${
                            breed === petBreed ? "text-primary font-medium" : ""
                          }`}
                        >
                          {petBreed}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
