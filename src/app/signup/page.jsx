"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios"; // Make sure axios is imported
import Link from "next/link"; // Make sure Link is imported

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    console.log(e.target);

    setLoading(true);

    axios
      .post("/api/users/signup", user)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        console.log(response);

        if (response.status === 200) {
          setUser("")
          router.push('/verifyemail?message="Verify your email"');
        } else if (response.status === 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("error is ", err);
      });
  };

  return (
    <div className="bg-background">
      <div className="h-screen w-screen flex justify-center items-center ">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg bg-[#76b2eb]">
          <div className="flex justify-center">
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </div>
          <h1 className="text-4xl text-black flex justify-center font-bold">
            Register
          </h1>
          <p className="flex text-black justify-center">
            Welcome to the Threads
          </p>
          <form onSubmit={submit}>
            <div className="mt-5 space-y-1">
              <label htmlFor="username" className="text-black font-bold ">
                UserName:
              </label>
              <input
                type="text"
                placeholder="Enter your UserName"
                id="username"
                className="input-class w-full p-2 text-blue-800 font-bold rounded-lg" // Add your input class
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              {errors.username && (
                <span className="text-red-400 font-bold">
                  {errors.username}
                </span>
              )}
            </div>
            <div className="mt-5 space-y-1">
              <label htmlFor="email" className="text-black  font-bold">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                className="input-class w-full text-blue-800 font-bold p-2 rounded-lg" // Add your input class
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              {errors.email && (
                <span className="text-red-400 font-bold">{errors.email}</span>
              )}
            </div>
            <div className="mt-5 space-y-1">
              <label htmlFor="password" className="text-black font-bold">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                className="input-class text-blue-800 font-bold w-full p-2 rounded-lg" // Add your input class
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              {errors.password && (
                <span className="text-red-400 font-bold">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="mt-5 space-y-1">
              <button
                className="w-full button-class bg-black p-3 rounded-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </div>
          </form>
          <div className="mt-5 flex  justify-center">
            <span>Already Have an account?</span>
            <Link href="/login" className="text-blue-800 font-extrabold ml-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
