import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Cat, Fish, Bird } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient relative py-16 md:py-24">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              Your Destination for Pet Happiness.
            </h1>
            <p className="text-lg text-muted-foreground">
              At Petopia, we cater to the needs of your beloved furry friends.
              Whether you&apos;re a proud parent to a dog, cat, bird, fish, or any
              other pet, we have everything you need to keep your pets happy and
              healthy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/store">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="/images/dog.jpg"
              alt="Happy dog"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
          <Link
            href="/store/pets?type=cat"
            className="bg-white/90 p-3 rounded-full shadow-md hover:bg-primary/10 transition-colors"
          >
            <Cat className="h-6 w-6 text-primary" />
          </Link>
          <Link
            href="/store/pets?type=dog"
            className="bg-white/90 p-3 rounded-full shadow-md hover:bg-primary/10 transition-colors"
          >
            <Dog className="h-6 w-6 text-primary" />
          </Link>
          <Link
            href="/store/pets?type=fish"
            className="bg-white/90 p-3 rounded-full shadow-md hover:bg-primary/10 transition-colors"
          >
            <Fish className="h-6 w-6 text-primary" />
          </Link>
          <Link
            href="/store/pets?type=bird"
            className="bg-white/90 p-3 rounded-full shadow-md hover:bg-primary/10 transition-colors"
          >
            <Bird className="h-6 w-6 text-primary" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src="/images/dog-food.jpg"
                    alt="Pet Food"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Pet Food</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  From premium dog kibble to organic cat treats, we offer a wide
                  range of food options to suit every pet&apos;s dietary needs.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/store/products?category=food">Shop Food</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src="/images/cat-toy.jpg"
                    alt="Pet Toys"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Toys & Accessories
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Keep your pets entertained with our assortment of toys and
                  accessories designed to engage and stimulate their minds.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/store/products?category=toys">Shop Toys</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Pet Care"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Pet Care Essentials
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Everything you need to keep your pets healthy, from grooming
                  supplies to vitamins and supplements.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/store/products?category=care">Shop Care</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Pet Beds"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Cozy Beds & Furniture
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Explore comfortable beds and furniture options for your pets
                  to relax and unwind.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/store/products?category=furniture">
                    Shop Beds
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Happy pets"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Choose Petopia?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Quality Assurance</h3>
                    <p className="text-muted-foreground">
                      We source products from trusted brands to ensure the
                      well-being of your pets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Expert Advice</h3>
                    <p className="text-muted-foreground">
                      Our team consists of passionate pet lovers ready to offer
                      guidance to find the best products for your pet&apos;s needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Convenience</h3>
                    <p className="text-muted-foreground">
                      Shop online from the comfort of your home and have your
                      pet supplies delivered right to your doorstep.
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/store">Visit Our Store</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
