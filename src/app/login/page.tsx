"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  async function submitForm(e:any) {
    e.preventDefault();
    try {
      await axios.post("../api/user/login", user);
      router.push(`/chat`);
    } catch (error) {
      console.log("Couldn't sign");
    } finally {
      setUser({
        email: "",
        password: "",
      });
    }
  }
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-1 w-55 ">
      <span className="text-5xl"> Log In</span>
      <span className="text-center">
        username : userdemo@demo.com | password : 12345
      </span>
      <input
        className="p-1 rounded focus:outline-none text-black"
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        className="p-1 rounded text-black"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="bg-gray-400 p-1 rounded" onClick={submitForm}>
        Login
      </button>
      <span className="flex justify-between">
        Create an &nbsp;
        <Link className="text-blue-700" href={"/signup"}>
          Account?
        </Link>
      </span>
    </div>
  );
};

export default Page;
