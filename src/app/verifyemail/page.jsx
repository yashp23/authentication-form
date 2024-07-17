"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black mt-3 rounded-lg">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="flex flex-col items-center justify-center mt-3">
            Verified ✅
          </h2>
          <button className="p-2 border mt-4 w-[200px] border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
            <Link href="/login">Login</Link>
          </button>
        </div>
      )}
      {error && (
        <div>
          <h2>Error In Verifying ❌</h2>
        </div>
      )}
    </div>
  );
}