import { prisma } from "@/lib/prisma";
import CartSummary from "@/components/CartSummary";
import { PetList } from "@/components/PetList";
import { ProductList } from "@/components/ProductList";
import { Separator } from "@/components/ui/separator";

export default async function StorePage() {
  const pets = await prisma.pet.findMany({
    where: { purchaseId: null },
    take: 4,
  });

  const products = await prisma.product.findMany({
    where: { stockQuantity: { gt: 0 } },
    take: 4,
  });

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h1 className="text-3xl font-bold mb-6">Featured Pets</h1>
          <PetList pets={pets} />

          <Separator className="my-12" />

          <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
          <ProductList products={products} />
        </div>

        <div className="col-span-1 md:sticky top-20 self-start">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
