/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { customer, pets = [], products = [], mode } = body;

  // Input validation
  if (!customer || !customer.name || !customer.phoneNo || !customer.email) {
    return NextResponse.json(
      { error: "Missing required customer fields" },
      { status: 400 }
    );
  }
  if (!mode) {
    return NextResponse.json(
      { error: "Payment mode is required" },
      { status: 400 }
    );
  }
  if (!["cash", "credit", "paypal"].includes(mode)) {
    return NextResponse.json(
      { error: "Invalid payment mode" },
      { status: 400 }
    );
  }
  if (!Array.isArray(pets) || !Array.isArray(products)) {
    return NextResponse.json(
      { error: "Pets and products must be arrays" },
      { status: 400 }
    );
  }

  try {
    const purchaseData = await prisma.$transaction(async (tx) => {
      // Check pet availability
      if (pets.length > 0) {
        const availablePets = await tx.pet.findMany({
          where: { id: { in: pets }, purchaseId: null },
        });
        if (availablePets.length !== pets.length) {
          throw new Error("Some pets are no longer available");
        }
      }

      // Check product stock
      if (products.length > 0) {
        for (const item of products) {
          if (
            !item.productId ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1
          ) {
            throw new Error("Invalid product data");
          }
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });
          if (!product || product.stockQuantity < item.quantity) {
            throw new Error(
              `Insufficient stock for product ${
                product?.name || item.productId
              }`
            );
          }
        }
      }

      // Create customer
      const newCustomer = await tx.customer.create({
        data: {
          name: customer.name,
          address: customer.address || "",
          phoneNo: customer.phoneNo,
          email: customer.email,
        },
      });

      // Create purchase
      const newPurchase = await tx.purchase.create({
        data: { customerId: newCustomer.id, mode },
      });

      // Associate pets
      if (pets.length > 0) {
        await tx.pet.updateMany({
          where: { id: { in: pets }, purchaseId: null },
          data: { purchaseId: newPurchase.id },
        });
      }

      // Associate products and update stock
      if (products.length > 0) {
        for (const item of products) {
          await tx.productPurchase.create({
            data: {
              purchaseId: newPurchase.id,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQuantity: { decrement: item.quantity } },
          });
        }
      }

      return { purchaseId: newPurchase.id };
    });

    return NextResponse.json({
      message: "Purchase created",
      purchaseId: purchaseData.purchaseId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process purchase" },
      { status: 400 }
    );
  }
}
