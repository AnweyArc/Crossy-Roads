import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient.js";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleMode = () => {
    setErrorMsg("");
    setIsRegister((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErrorMsg(error.message);
      else alert("Registration successful! Please check your email for confirmation link.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else router.push("/GamePages/home");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-[#4aa0d0] text-center p-4 relative overflow-hidden">
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
      <div className="mb-8 animate-soft-bounce z-10">
        <Image
          src="/assets/logoFiles/logo.png"
          alt="Pixel Crossing Logo"
          width={180}
          height={90}
          className="drop-shadow-lg"
        />
      </div>

      {/* Title */}
      <h2 
        className={`${pressStart2P.className} text-2xl text-amber-300 mb-6 z-10`}
        style={{
          textShadow: `
            -1px -1px 0 #8b5a00,  
            1px -1px 0 #8b5a00,
            -1px 1px 0 #8b5a00,
            1px 1px 0 #8b5a00,
            0 2px 2px rgba(0, 0, 0, 0.25)
          `,
        }}
      >
        {isRegister ? "REGISTER" : "LOGIN"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs z-10"
      >
        <input
          type="email"
          placeholder="Email"
          required
          className={`${pressStart2P.className} text-xs px-4 py-3 rounded border-4 border-t-yellow-200 border-l-yellow-200 border-b-yellow-600 border-r-yellow-600 focus:outline-none focus:border-t-yellow-300 focus:border-l-yellow-300 focus:border-b-yellow-700 focus:border-r-yellow-700`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={`${pressStart2P.className} text-xs px-4 py-3 rounded border-4 border-t-yellow-200 border-l-yellow-200 border-b-yellow-600 border-r-yellow-600 focus:outline-none focus:border-t-yellow-300 focus:border-l-yellow-300 focus:border-b-yellow-700 focus:border-r-yellow-700`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && (
          <p className="text-xs text-red-600 italic">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
            ${pressStart2P.className}
            bg-gradient-to-b from-amber-300 to-amber-400
            text-[#8b5a00] text-xs
            px-6 py-3
            border-4 
            border-t-amber-200
            border-l-amber-200
            border-b-amber-600
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
            shadow-md
            hover:shadow-lg
            relative
            overflow-hidden
            group
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 -left-1/3 top-0 bottom-0 group-hover:animate-shine" />
          {loading ? "PLEASE WAIT..." : isRegister ? "SIGN UP" : "SIGN IN"}
        </button>
      </form>

      <button
        onClick={toggleMode}
        className="mt-6 text-xs underline text-white hover:text-yellow-100 transition-all z-10"
      >
        {isRegister
          ? "Already have an account? Sign in"
          : "Don't have an account? Register"}
      </button>

      <Link href="/" className="z-10">
        <p className="mt-8 text-xs text-white underline cursor-pointer hover:text-yellow-100">
          ← BACK TO HOME
        </p>
      </Link>

      {/* Textured ground with grass */}
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