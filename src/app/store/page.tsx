/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import PetItem from "@/components/PetItem";
import ProductItem from "@/components/ProductItem";
import CartSummary from "@/components/CartSummary";

export default async function StorePage() {
  const pets = await prisma.pet.findMany({
    where: { purchaseId: null },
  });

  const products = await prisma.product.findMany({
    where: { stockQuantity: { gt: 0 } },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pet Store</h1>
      <CartSummary />
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Available Pets</h2>
        {pets.length === 0 ? (
          <p>No pets available.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pets.map((pet: any) => (
              <PetItem key={pet.id} pet={pet} />
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product: any) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
