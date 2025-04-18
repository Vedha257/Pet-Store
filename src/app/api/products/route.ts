// src/app/api/products/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { stockQuantity: { gt: 0 } },
  });
  return NextResponse.json(products);
}
