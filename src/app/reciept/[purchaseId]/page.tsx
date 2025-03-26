// src/app/receipt/[purchaseId]/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

interface Props {
  params: { purchaseId: string };
}

export default async function ReceiptPage({ params }: Props) {
  const purchase = await prisma.purchase.findUnique({
    where: { id: params.purchaseId },
    include: {
      customer: true,
      pets: true,
      productPurchases: { include: { product: true } },
    },
  });

  if (!purchase) {
    return <p>Purchase not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Receipt</h1>
      <p>Purchase ID: {purchase.id}</p>
      <p>Date: {purchase.date.toLocaleString()}</p>
      <p>Customer: {purchase.customer.name}</p>
      <p>Email: {purchase.customer.email}</p>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Items Purchased:</h2>
      <ul>
        {purchase.pets.map((pet) => (
          <li key={pet.id}>
            {pet.type} - {pet.breed} - ${pet.price}
          </li>
        ))}
        {purchase.productPurchases.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity} - ${item.product.price * item.quantity}
          </li>
        ))}
      </ul>
      <Link href="/store" className="text-blue-500 hover:underline mt-4 inline-block">
        Back to Store
      </Link>
    </div>
  );
}