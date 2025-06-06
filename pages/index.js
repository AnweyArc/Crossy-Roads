import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center`}
    >
      <Image
        src="/crossylogo.png"
        alt="Crossy Game Logo"
        width={200}
        height={100}
        className="mb-8"
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6">
        Welcome to Pixel Crossing
      </h1>
      <Link href="/login">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-full shadow-md transition-all duration-200">
          Start Game
        </button>
      </Link>
    </div>
  );
}
