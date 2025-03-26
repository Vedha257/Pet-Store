/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import CartSummary from "@/components/CartSummary";
import { ProductList } from "@/components/ProductList";
import { Separator } from "@/components/ui/separator";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    pet?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category, pet } = searchParams;

  // Build filter based on search params
  const filter: any = { stockQuantity: { gt: 0 } };
  if (category) filter.category = category;

  // For pet filter, we'll need to do some string matching in the name or description
  // This is a simplified approach - in a real app you might have a more structured way to filter by pet type
  if (pet) {
    filter.OR = [
      { name: { contains: pet, mode: "insensitive" } },
      { description: { contains: pet, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where: filter,
  });

  // Get unique categories for filters
  const allProducts = await prisma.product.findMany({
    where: { stockQuantity: { gt: 0 } },
    select: { category: true },
  });

  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              available
            </p>
          </div>

          {/* Active filters */}
          {(category || pet) && (
            <div className="mb-6">
              <h2 className="text-sm font-medium mb-2">Active Filters:</h2>
              <div className="flex flex-wrap gap-2">
                {category && (
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">
                    Category: {category}
                  </div>
                )}
                {pet && (
                  <div className="bg-secondary px-3 py-1 rounded-full text-sm">
                    Pet: {pet}
                  </div>
                )}
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-muted-foreground">
                Try changing your filters or check back later for new arrivals.
              </p>
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </div>

        <div className="col-span-1">
          <div className="md:sticky top-20 space-y-6">
            <CartSummary />

            <div className="bg-card rounded-lg border p-4">
              <h2 className="font-medium mb-4">Filter Products</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <div className="space-y-2">
                    {categories.map((productCategory) => (
                      <div key={productCategory} className="flex items-center">
                        <a
                          href={`/store/products?category=${productCategory}${
                            pet ? `&pet=${pet}` : ""
                          }`}
                          className={`text-sm hover:text-primary ${
                            category === productCategory
                              ? "text-primary font-medium"
                              : ""
                          }`}
                        >
                          {productCategory}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Pet Type</h3>
                  <div className="space-y-2">
                    {["Dog", "Cat", "Fish", "Bird"].map((petType) => (
                      <div key={petType} className="flex items-center">
                        <a
                          href={`/store/products?pet=${petType.toLowerCase()}${
                            category ? `&category=${category}` : ""
                          }`}
                          className={`text-sm hover:text-primary ${
                            pet === petType.toLowerCase()
                              ? "text-primary font-medium"
                              : ""
                          }`}
                        >
                          {petType}
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
