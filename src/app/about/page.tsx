import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Petopia</h1>

        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to Petopia, your one-stop destination for all things pets!
            We are passionate about providing the highest quality pets and pet
            supplies to ensure the happiness and well-being of your furry,
            feathered, or finned friends.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p>
            Founded in 2023, Petopia began with a simple mission: to create a
            place where pet owners could find everything they need for their
            beloved companions. What started as a small local shop has grown
            into a comprehensive online platform serving pet lovers nationwide.
          </p>

          <div className="my-8 relative h-[300px] w-full rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Petopia store"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="space-y-2 mb-6">
            <li>
              <strong>Quality:</strong> We carefully select each product and pet
              to ensure they meet our high standards.
            </li>
            <li>
              <strong>Education:</strong> We believe in helping pet owners make
              informed decisions about their pets&apos; care.
            </li>
            <li>
              <strong>Community:</strong> We foster a community of pet lovers
              who share knowledge and experiences.
            </li>
            <li>
              <strong>Responsibility:</strong> We promote responsible pet
              ownership and ethical treatment of animals.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p>
            Our team consists of passionate pet lovers, experienced
            veterinarians, and knowledgeable pet care specialists. Together, we
            work to provide you with the best products and advice for your pets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="text-center">
              <div className="relative h-[150px] w-[150px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">Dr. Jane Smith</h3>
              <p className="text-sm text-muted-foreground">Veterinarian</p>
            </div>

            <div className="text-center">
              <div className="relative h-[150px] w-[150px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">John Davis</h3>
              <p className="text-sm text-muted-foreground">Pet Nutritionist</p>
            </div>

            <div className="text-center">
              <div className="relative h-[150px] w-[150px] mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">
                Animal Behaviorist
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Visit Our Store</h2>
          <p>
            We invite you to explore our wide selection of pets and products.
            Whether you&apos;re looking for a new furry friend or supplies for
            your current pet, we have everything you need to ensure your
            pet&apos;s happiness and health.
          </p>

          <div className="flex justify-center my-8">
            <Button asChild size="lg">
              <Link href="/store">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
