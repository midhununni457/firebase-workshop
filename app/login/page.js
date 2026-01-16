"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// AUTH: import auth & googleProvider from config file
// AUTH: import createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup from firebase/auth

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async () => {
    try {
      setError("");
      await createUserWithEmailAndPassword(auth, email, password);
      // AUTH: create user with email & password
      router.push("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          // AUTH: sign in with email & password
          router.push("/");
          return;
        } catch (error) {
          setError(error?.message || "Failed to sign in");
        }
      } else {
        setError(err?.message || "Failed to sign up");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await signInWithPopup(auth, googleProvider)
      // AUTH: sign in with popup using auth & googleProvider
      router.push("/");
      return;
    } catch (err) {
      setError(err?.message || "Failed to sign in with Google");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-1/3 p-8 flex flex-col justify-center items-center rounded-lg bg-[#1F1F1F] border border-zinc-600">
        <h1 className="text-4xl text-gray-200 font-bold mb-15">Login</h1>
        <div className="w-full flex flex-col justify-center items-center space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-2/3 p-3 rounded-md bg-[#121212] text-white caret-white border focus:outline-none focus:ring-2 focus:ring-[#FFCA28] border-zinc-600 placeholder-zinc-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-2/3 p-3 rounded-md bg-[#121212] text-white caret-white border focus:outline-none focus:ring-2 focus:ring-[#FFCA28] border-zinc-600 placeholder-zinc-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleEmailLogin}
            className="w-2/3 bg-[#E65100] hover:bg-[#BF360C] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Login
          </button>
          {error && (
            <p className="w-2/3 text-sm text-red-500 text-center">{error}</p>
          )}
        </div>
        <div className="w-2/3 flex items-center my-6">
          <div className="flex-1 border-t border-zinc-600"></div>
          <span className="px-4 text-zinc-500 text-sm">OR</span>
          <div className="flex-1 border-t border-zinc-600"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-2/3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer"
        >
          <img src="/google.png" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
