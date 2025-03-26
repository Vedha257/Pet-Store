// src/app/api/pets/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const pets = await prisma.pet.findMany({
    where: { purchaseId: null },
  });
  return NextResponse.json(pets);
}