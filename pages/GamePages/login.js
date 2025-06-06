//login.js

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient.js"; // adjust path as needed

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
      // Register user
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        alert(
          "Registration successful! Please check your email for confirmation link."
        );
      }
    } else {
      // Login user
      const { error } = await supabase.auth.signInWithPassword({
          email, 
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/GamePages/home");
      }      
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#6ec4e8] text-center p-4 relative">
      <div className="mb-8 animate-bounce">
        <Image
          src="/assets/logoFiles/logo.png"
          alt="Pixel Crossing Logo"
          width={180}
          height={90}
        />
      </div>

      <h2 className={`${pressStart2P.className} text-2xl text-yellow-300 mb-6`}>
        {isRegister ? "REGISTER" : "LOGIN"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <input
          type="email"
          placeholder="Email"
          required
          className="px-4 py-3 rounded border-2 border-yellow-500 focus:outline-none text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="px-4 py-3 rounded border-2 border-yellow-500 focus:outline-none text-sm"
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
            bg-yellow-400 hover:bg-yellow-300
            text-black text-xs
            px-6 py-3
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
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Please wait..." : isRegister ? "SIGN UP" : "SIGN IN"}
        </button>
      </form>

      <button
        onClick={toggleMode}
        className="mt-6 text-xs underline text-white hover:text-yellow-100 transition-all"
      >
        {isRegister
          ? "Already have an account? Sign in"
          : "Don't have an account? Register"}
      </button>

      <Link href="/">
        <p className="mt-8 text-xs text-white underline cursor-pointer">
          ← Back to Home
        </p>
      </Link>

      {/* Ground bar */}
      <div className="w-full h-16 bg-[#5dbb46] absolute bottom-0 z-0" />
    </div>
  );
}
