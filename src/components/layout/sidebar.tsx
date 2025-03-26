"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Cat,
  Dog,
  Fish,
  Bird,
  ShoppingBag,
  Bone,
  Utensils,
  HomeIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface Category {
  name: string;
  href: string;
  icon: React.ElementType;
  subcategories?: { name: string; href: string }[];
}

const petCategories: Category[] = [
  {
    name: "Dogs",
    href: "/store/pets?type=dog",
    icon: Dog,
    subcategories: [
      { name: "Labrador", href: "/store/pets?type=dog&breed=labrador" },
      { name: "Poodle", href: "/store/pets?type=dog&breed=poodle" },
      { name: "Bulldog", href: "/store/pets?type=dog&breed=bulldog" },
    ],
  },
  {
    name: "Cats",
    href: "/store/pets?type=cat",
    icon: Cat,
    subcategories: [
      { name: "Siamese", href: "/store/pets?type=cat&breed=siamese" },
      { name: "Persian", href: "/store/pets?type=cat&breed=persian" },
      { name: "Maine Coon", href: "/store/pets?type=cat&breed=maine-coon" },
    ],
  },
  { name: "Fish", href: "/store/pets?type=fish", icon: Fish },
  { name: "Birds", href: "/store/pets?type=bird", icon: Bird },
];

const productCategories: Category[] = [
  {
    name: "Food",
    href: "/store/products?category=food",
    icon: Utensils,
    subcategories: [
      { name: "Dog Food", href: "/store/products?category=food&pet=dog" },
      { name: "Cat Food", href: "/store/products?category=food&pet=cat" },
    ],
  },
  {
    name: "Toys",
    href: "/store/products?category=toys",
    icon: Bone,
    subcategories: [
      { name: "Dog Toys", href: "/store/products?category=toys&pet=dog" },
      { name: "Cat Toys", href: "/store/products?category=toys&pet=cat" },
    ],
  },
  {
    name: "Accessories",
    href: "/store/products?category=accessories",
    icon: ShoppingBag,
  },
];

interface CategoryItemProps {
  category: Category;
  isActive?: boolean;
}

function CategoryItem({ category, isActive }: CategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={category.href}
          className={cn(
            "flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium flex-1",
            isActive
              ? "bg-primary/10 text-primary"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <category.icon className="h-4 w-4" />
          <span>{category.name}</span>
        </Link>

        {hasSubcategories && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {hasSubcategories && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {category.subcategories?.map((subcategory) => (
            <Link
              key={subcategory.name}
              href={subcategory.href}
              className="flex items-center gap-2 py-1 px-3 rounded-md text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="w-64 h-full border-r bg-card">
      <div className="p-4 space-y-6">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <HomeIcon className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </div>

        <div>
          <h3 className="font-medium px-3 mb-3">Pets</h3>
          <div className="space-y-1">
            {petCategories.map((category) => (
              <CategoryItem key={category.name} category={category} />
            ))}
          </div>
        </div>

        <Separator className="my-2" />

        <div>
          <h3 className="font-medium px-3 mb-3">Products</h3>
          <div className="space-y-1">
            {productCategories.map((category) => (
              <CategoryItem key={category.name} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
