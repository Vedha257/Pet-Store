import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout | Petopia",
    description: "Buy pets and pet supplies",
  };

export default function StoreLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
            {children}
        </body>
        </html>
    )
}