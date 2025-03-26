"use client";

import Link from "next/link";
import { Search, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function MobileNav() {
  return (
    <div className="flex flex-col h-full gap-6 pt-6">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-primary">Petopia</span>
      </Link>
      <Separator />
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="text-base font-medium transition-colors hover:text-primary"
        >
          Home
        </Link>
        <Link
          href="/store"
          className="text-base font-medium transition-colors hover:text-primary"
        >
          Store
        </Link>
        <Link
          href="/store/pets"
          className="text-base font-medium transition-colors hover:text-primary"
        >
          Pets
        </Link>
        <Link
          href="/store/products"
          className="text-base font-medium transition-colors hover:text-primary"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="text-base font-medium transition-colors hover:text-primary"
        >
          About
        </Link>
      </nav>
      <Separator />
      <div className="flex flex-col gap-4">
        <Button variant="outline" className="w-full justify-start">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Account
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart
        </Button>
      </div>
    </div>
  );
}
