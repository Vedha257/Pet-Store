import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.pet.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.productPurchase.deleteMany();

  await prisma.pet.createMany({
    data: [
      {
        type: "Dog",
        breed: "Labrador",
        age: 2,
        price: 500,
        description: "Friendly dog",
        imageUrl: "/images/dog.jpg",
      },
      {
        type: "Cat",
        breed: "Siamese",
        age: 1,
        price: 300,
        description: "Elegant cat",
        imageUrl: "/images/cat.jpg",
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Dog Food",
        category: "Food",
        price: 20,
        stockQuantity: 100,
        description: "Nutritious dog food",
        imageUrl: "/images/dog-food.jpg",
      },
      {
        name: "Cat Toy",
        category: "Toys",
        price: 10,
        stockQuantity: 50,
        description: "Fun toy for cats",
        imageUrl: "/images/cat-toy.jpg",
      },
    ],
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
