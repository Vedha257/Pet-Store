import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

export default async function ReceiptPage({
  params,
}: {
  params: { purchaseId: string };
}) {
  // Fetch purchase details from the database
  const purchaseId = params.purchaseId;
  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
    include: {
      customer: true,
      pets: true,
      productPurchases: {
        include: {
          product: true,
        },
      },
    },
  });

  // If purchase is not found, trigger a 404 page
  if (!purchase) {
    notFound();
  }

  // Calculate totals
  const petsTotal = purchase.pets.reduce((sum, pet) => sum + pet.price, 0);
  const productsTotal = purchase.productPurchases.reduce(
    (sum, pp) => sum + pp.quantity * pp.product.price,
    0
  );
  const grandTotal = petsTotal + productsTotal;

  return (
    <div className="container max-w-3xl py-12">
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">
                Thank You for Your Purchase!
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Receipt #{purchase.id.slice(0, 8)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {new Date(purchase.date).toLocaleDateString()} at{" "}
                {new Date(purchase.date).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Customer Information</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {purchase.customer.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {purchase.customer.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {purchase.customer.phoneNo}
                </p>
                {purchase.customer.address && (
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {purchase.customer.address}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Payment Information</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Payment Method:</span>
                  {purchase.mode.charAt(0).toUpperCase() +
                    purchase.mode.slice(1)}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-green-600">Paid</span>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Purchase Summary</h3>

            {purchase.pets.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Pets</h4>
                <div className="bg-secondary/50 rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-3">Pet</th>
                        <th className="text-left p-3">Breed</th>
                        <th className="text-left p-3">Age</th>
                        <th className="text-right p-3">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchase.pets.map((pet) => (
                        <tr key={pet.id} className="border-t border-secondary">
                          <td className="p-3">{pet.type}</td>
                          <td className="p-3">{pet.breed}</td>
                          <td className="p-3">
                            {pet.age} {pet.age === 1 ? "year" : "years"}
                          </td>
                          <td className="p-3 text-right">
                            {formatPrice(pet.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-secondary/70">
                      <tr>
                        <td colSpan={3} className="p-3 font-medium">
                          Pets Subtotal
                        </td>
                        <td className="p-3 text-right font-medium">
                          {formatPrice(petsTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {purchase.productPurchases.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Products</h4>
                <div className="bg-secondary/50 rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-3">Product</th>
                        <th className="text-left p-3">Category</th>
                        <th className="text-right p-3">Quantity</th>
                        <th className="text-right p-3">Price</th>
                        <th className="text-right p-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchase.productPurchases.map((pp) => (
                        <tr key={pp.id} className="border-t border-secondary">
                          <td className="p-3">{pp.product.name}</td>
                          <td className="p-3">{pp.product.category}</td>
                          <td className="p-3 text-right">{pp.quantity}</td>
                          <td className="p-3 text-right">
                            {formatPrice(pp.product.price)}
                          </td>
                          <td className="p-3 text-right">
                            {formatPrice(pp.quantity * pp.product.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-secondary/70">
                      <tr>
                        <td colSpan={4} className="p-3 font-medium">
                          Products Subtotal
                        </td>
                        <td className="p-3 text-right font-medium">
                          {formatPrice(productsTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex-col p-6 border-t bg-secondary/20">
          <div className="w-full flex justify-between items-center mb-6">
            <span className="text-lg font-medium">Grand Total</span>
            <span className="text-lg font-bold">{formatPrice(grandTotal)}</span>
          </div>

          <Button asChild className="w-full sm:w-auto">
            <Link href="/store">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
