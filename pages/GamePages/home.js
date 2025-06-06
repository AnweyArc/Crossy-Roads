//home.js

import Link from "next/link";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#6ec4e8] text-center p-4 relative">
      {/* Logo */}
      <div className="mb-8 animate-bounce">
        <Image
          src="/assets/logoFiles/logo.png"
          alt="Pixel Crossing Logo"
          width={180}
          height={90}
        />
      </div>

      {/* Title */}
      <h1 className={`${pressStart2P.className} text-2xl text-yellow-300 mb-10`}>
        MAIN MENU
      </h1>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Link href="/gamePages/game">
          <button
            className={`
              ${pressStart2P.className}
              bg-yellow-400 hover:bg-yellow-300
              text-black text-xs
              px-6 py-4
              border-4 
              border-t-yellow-200
              border-l-yellow-200
              border-b-yellow-600
              border-r-yellow-600
              hover:border-t-yellow-300
              hover:border-l-yellow-300
              hover:border-b-yellow-700
              hover:border-r-yellow-700
              transition-colors
              transform
              active:translate-y-1
              active:border-b-2
              active:border-r-2
              uppercase
            `}
          >
            Play Game
          </button>
        </Link>

        <Link href="/gamePages/leaderboards">
          <button
            className={`
              ${pressStart2P.className}
              bg-yellow-400 hover:bg-yellow-300
              text-black text-xs
              px-6 py-4
              border-4 
              border-t-yellow-200
              border-l-yellow-200
              border-b-yellow-600
              border-r-yellow-600
              hover:border-t-yellow-300
              hover:border-l-yellow-300
              hover:border-b-yellow-700
              hover:border-r-yellow-700
              transition-colors
              transform
              active:translate-y-1
              active:border-b-2
              active:border-r-2
              uppercase
            `}
          >
            Leaderboards
          </button>
        </Link>

        <Link href="/gamePages/settings">
          <button
            className={`
              ${pressStart2P.className}
              bg-yellow-400 hover:bg-yellow-300
              text-black text-xs
              px-6 py-4
              border-4 
              border-t-yellow-200
              border-l-yellow-200
              border-b-yellow-600
              border-r-yellow-600
              hover:border-t-yellow-300
              hover:border-l-yellow-300
              hover:border-b-yellow-700
              hover:border-r-yellow-700
              transition-colors
              transform
              active:translate-y-1
              active:border-b-2
              active:border-r-2
              uppercase
            `}
          >
            Settings
          </button>
        </Link>
      </div>

      {/* Ground bar */}
      <div className="w-full h-16 bg-[#5dbb46] absolute bottom-0 z-0" />
    </div>
  );
}
