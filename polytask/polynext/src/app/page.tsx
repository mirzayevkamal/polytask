import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Click the button below to see the posts</h1>
      <Link href="/post" className="bg-blue-500 rounded-full px-20 py-10">Click me, Master!</Link>
    </main>
  );
}
