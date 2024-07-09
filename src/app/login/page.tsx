"use client";
import React, { useState } from "react";
import axios  from 'axios'
import { useRouter } from "next/navigation";
import Link from "next/link";
const page = () => {
    const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  async function submitForm() {
      try {
       const response = await axios.post("../api/user/login", user)
       console.log("Logged In Successfully!",response);
       router.push(`/profile/${response.data.id}`)
   } catch (error) {
    console.log("Couldn't sign");
    
      }
      finally {
          setUser({
            email: "",
            password: "",
          });
      }
  }
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-1 w-55 ">
      <span className="text-5xl"> Log In</span>
      <span className="text-center">username : hamera@koisi.com | passoword : 1234</span>
      <input
        className="p-1 rounded focus:outline-none text-black"
        type="text"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="text"
        className="p-1 rounded text-black"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="bg-gray-400 p-1 rounded" onClick={submitForm}>
        Login
      </button>
    </div>
  );
};

export default page;
