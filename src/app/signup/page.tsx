"use client";
import React, { useState } from "react";
import  axios  from 'axios'
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
    const [processing, setProcessing] = useState(false);
    const router = useRouter();
   async function submitForm() {
     try {
       setProcessing(true);
       const response = await axios.post("../api/user/signup", user);
         console.log("Sucesss..!", response);
          router.push("/login");
         toast.success("User has been created successfully");
        } catch (error: any) {
            console.log("From fe",error.message);
        } finally{
            setProcessing(false)
            setUser({ username: "", email: "", password: "" });
     }
   }
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-1 w-55 ">
      <Toaster position="top-center" reverseOrder={false} />
      Sign up
      <input
        type="text"
        className="p-1 rounded text-black"
        placeholder="name"
        value={user.username}
        color="black"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="email"
        className="p-1 rounded text-black"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        className="p-1 rounded text-black"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="bg-gray-400 rounded p-1" onClick={submitForm}>
        {processing ? "Processing" : "Create Account"}
      </button>
    </div>
  );
};

export default page;
