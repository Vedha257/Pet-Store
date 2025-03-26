// src/app/api/purchase/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { customer, pets, products, mode } = body;

  // Create customer
  const newCustomer = await prisma.customer.create({
    data: {
      name: customer.name,
      address: customer.address,
      phoneNo: customer.phoneNo,
      email: customer.email,
    },
  });

  // Create purchase
  const newPurchase = await prisma.purchase.create({
    data: {
      customerId: newCustomer.id,
      mode,
    },
  });

  // Associate pets
  if (pets && pets.length > 0) {
    await prisma.pet.updateMany({
      where: {
        id: { in: pets },
        purchaseId: null, // Prevent double-selling
      },
      data: { purchaseId: newPurchase.id },
    });
  }

  // Associate products
  if (products && products.length > 0) {
    for (const item of products) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (product && product.stockQuantity >= item.quantity) {
        await prisma.productPurchase.create({
          data: {
            purchaseId: newPurchase.id,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
        await prisma.product.update({
          where: { id: item.productId },
          data: { stockQuantity: product.stockQuantity - item.quantity },
        });
      }
    }
  }

  return NextResponse.json({ message: "Purchase created", purchaseId: newPurchase.id });
}