// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Pet Store</h1>
      <Link href="/store" className="text-blue-500 hover:underline">
        Go to Store
      </Link>
    </div>
  );
}