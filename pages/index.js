import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-[#4aa0d0] text-center p-4 overflow-hidden relative">
      {/* Responsive cloud container */}
      <div className="absolute top-10 inset-x-0 h-[100px] overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-2 left-0 animate-float-slow">
          <div className="bg-white/80 w-16 h-8 rounded-full" />
        </div>
        <div className="absolute top-8 left-[10%] animate-float-medium">
          <div className="bg-white/80 w-24 h-10 rounded-full" />
        </div>
        <div className="absolute top-4 left-[20%] animate-float-fast">
          <div className="bg-white/80 w-20 h-9 rounded-full" />
        </div>
      </div>

      {/* Logo */}
      <div className="mb-10 animate-soft-bounce z-10">
        <Image
          src="/assets/logoFiles/logo.png"
          alt="Pixel Crossing Logo"
          width={220}
          height={110}
          className="drop-shadow-lg"
        />
      </div>

      {/* Title */}
      <h1
        className={`${pressStart2P.className} text-3xl sm:text-4xl text-amber-300 mb-10 z-10 px-2`}
        style={{
          textShadow: `
            -1px -1px 0 #8b5a00,  
            1px -1px 0 #8b5a00,
            -1px 1px 0 #8b5a00,
            1px 1px 0 #8b5a00,
            0 4px 4px rgba(0, 0, 0, 0.25)
          `,
        }}
      >
        WELCOME TO PIXEL CROSSING
      </h1>

      {/* Start Button */}
      <Link href="/GamePages/login" className="z-10">
        <button
          className={`
          ${pressStart2P.className}
          bg-gradient-to-b from-amber-300 to-amber-400 text-[#8b5a00] text-lg px-8 py-4 border-4 border-t-amber-200 border-l-amber-200 border-b-amber-600
          border-r-amber-600
          hover:from-amber-250 hover:to-amber-350
          hover:border-t-amber-150
          hover:border-l-amber-150
          hover:border-b-amber-650
          hover:border-r-amber-650
          transition-all
          transform
          active:translate-y-1
          active:border-b-2
          active:border-r-2
          uppercase
          shadow-lg
          hover:shadow-xl
          active:shadow-md transition-shadow duration-200 relative overflow-hidden group
        `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 -left-1/3 top-0 bottom-0 group-hover:animate-shine" />
          START GAME
        </button>
      </Link>

      {/* Ground with grass */}
      <div className="w-full h-20 bg-[#5dbb46] absolute bottom-0 z-0 flex flex-col items-center">
        <div className="w-full h-4 bg-gradient-to-b from-[#4da536] to-[#5dbb46]"></div>
        <div className="w-full h-full relative">
          <div className="absolute -top-2 left-[10%] w-6 h-6 bg-[#4da536] rounded-full"></div>
          <div className="absolute -top-3 left-[25%] w-8 h-8 bg-[#4da536] rounded-full"></div>
          <div className="absolute -top-2 left-[40%] w-6 h-6 bg-[#4da536] rounded-full"></div>
          <div className="absolute -top-3 left-[60%] w-8 h-8 bg-[#4da536] rounded-full"></div>
          <div className="absolute -top-2 left-[75%] w-6 h-6 bg-[#4da536] rounded-full"></div>
          <div className="absolute -top-3 left-[90%] w-8 h-8 bg-[#4da536] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}