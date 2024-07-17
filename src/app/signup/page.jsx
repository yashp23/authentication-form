"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user details are filled
    const { email, username, password } = user;
    setButtonDisabled(!(email && username && password));
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success...!", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error) {
      console.log("Sign Up failed", error);
      toast.error("Sign Up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="bg-background">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg bg-[#76b2eb]">
          <div className="flex justify-center">
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </div>
          <h1 className="text-4xl text-black flex justify-center font-bold">
            Register
          </h1>
          <p className="flex text-black justify-center">
            Welcome to the Register Page
          </p>

          {/* Username */}
          <label className="text-black font-bold" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="input-class w-full p-2 text-blue-800 focus:outline-none font-bold rounded-lg mb-4"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Enter Username..."
          />

          {/* Email */}
          <label className="text-black font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="input-class w-full p-2 text-blue-800 font-bold rounded-lg focus:outline-none mb-4"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Enter Email..."
          />

          {/* Password */}
          <label className="text-black font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="input-class w-full p-2 text-blue-800 font-bold rounded-lg focus:outline-none mb-4"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Enter Password..."
          />

          <div className="mt-5 space-y-1">
            <button
              onClick={onSignup}
              className="w-full button-class bg-black text-white p-3 rounded-lg"
              disabled={buttonDisabled || loading}
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </div>

          <div className="mt-5 flex justify-center">
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
