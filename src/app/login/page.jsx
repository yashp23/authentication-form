"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user details are filled
    const { email, password } = user;
    setButtonDisabled(!(email && password));
  }, [user]);

  const onSignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success...!", response.data);
      toast.success("Login successful!...");
      router.push("/profile");
    } catch (error) {
      console.log("Login failed", error);
      toast.error(error.message || "Login failed");
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

  // return (

  // <div className="flex flex-col items-center justify-center min-h-screen py-2">
  //   <h1 className="mb-4 text-4xl">{loading ? "Processing" : "Login"}</h1>
  //   <hr />

  //   {/* Email */}
  //   <label htmlFor="email">Email</label>
  //   <input
  //     type="email"
  //     name="email"
  //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
  //     value={user.email || ""}
  //     onChange={handleInputChange}
  //     placeholder="Enter Email..."
  //   />

  //   {/* Password */}
  //   <label htmlFor="password">Password</label>
  //   <input
  //     type="password"
  //     name="password"
  //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
  //     value={user.password || ""}
  //     onChange={handleInputChange}
  //     placeholder="Enter Password..."
  //   />

  //   <button
  //     onClick={onSignin}
  //     disabled={buttonDisabled || loading}
  //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
  //   >
  //     {loading ? "Processing..." : "Login"}
  //   </button>

  //   <Link href="/signup">Visit SignUp Page</Link>
  // </div>
  // );

  return (
    <div className="bg-background">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg bg-[#76b2eb]">
          <div className="flex justify-center">
            <Image src="/logo.png" width={100} height={100} alt="Logo" />
          </div>
          <h1 className="text-4xl text-black flex justify-center font-bold">
            Login
          </h1>
          <p className="flex text-black justify-center">
            Welcome to the Login Page
          </p>

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
              onClick={onSignin}
              className="w-full button-class bg-black text-white p-3 rounded-lg"
              disabled={buttonDisabled || loading}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>

          <div className="mt-5 flex justify-center">
            <span>Create an account?</span>
            <Link href="/signup" className="text-blue-800 font-extrabold ml-2">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}