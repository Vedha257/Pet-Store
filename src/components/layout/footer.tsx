import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Petopia</h3>
          <p className="text-sm text-muted-foreground">
            Your one-stop shop for all pet needs. Quality products and adorable
            pets.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/store/pets"
                className="text-muted-foreground hover:text-primary"
              >
                Pets
              </Link>
            </li>
            <li>
              <Link
                href="/store/products"
                className="text-muted-foreground hover:text-primary"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/store"
                className="text-muted-foreground hover:text-primary"
              >
                All Items
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-muted-foreground hover:text-primary"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-primary"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-muted-foreground hover:text-primary"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Petopia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
