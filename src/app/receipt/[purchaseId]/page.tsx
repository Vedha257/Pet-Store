import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ purchaseId: string }>;
}) {
  // Fetch purchase details from the database
  const purchaseId = (await params).purchaseId;
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Receipt</h1>

      {/* Purchase Information */}
      <div className="mb-4">
        <p>
          <strong>Purchase ID:</strong> {purchase.id}
        </p>
        <p>
          <strong>Date:</strong> {new Date(purchase.date).toLocaleString()}
        </p>
        <p>
          <strong>Payment Mode:</strong>{" "}
          {purchase.mode.charAt(0).toUpperCase() + purchase.mode.slice(1)}
        </p>
      </div>

      {/* Customer Information */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Customer Information</h2>
        <p>
          <strong>Name:</strong> {purchase.customer.name}
        </p>
        <p>
          <strong>Email:</strong> {purchase.customer.email}
        </p>
      </div>

      {/* Items Purchased */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Items Purchased</h2>

        {/* Pets Section */}
        {purchase.pets.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Pets</h3>
            <ul className="list-disc pl-5">
              {purchase.pets.map((pet) => (
                <li key={pet.id}>
                  {pet.type} - {pet.breed} - ${pet.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Products Section */}
        {purchase.productPurchases.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Products</h3>
            <ul className="list-disc pl-5">
              {purchase.productPurchases.map((pp) => (
                <li key={pp.id}>
                  {pp.product.name} - Quantity: {pp.quantity} - Total: $
                  {(pp.quantity * pp.product.price).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="mb-4">
        <p>
          <strong>Pets Total:</strong> ${petsTotal.toFixed(2)}
        </p>
        <p>
          <strong>Products Total:</strong> ${productsTotal.toFixed(2)}
        </p>
        <p>
          <strong>Grand Total:</strong> ${grandTotal.toFixed(2)}
        </p>
      </div>

      {/* Thank You Message */}
      <div className="text-center">
        <p className="text-xl font-semibold">Thank you for your purchase!</p>
      </div>
    </div>
  );
}
