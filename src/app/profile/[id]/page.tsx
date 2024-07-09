"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = ({ params }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await axios.get("../../api/user/logout");
      console.log(response, "\n Logged out successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  let i = 0;
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get("../../api/user/me");
        setName(response.data.data.username);
        setId(response.data.data._id);
        setEmail(response.data.data.email);
        console.log("I was called",++i);
        
      } catch (error) {
        console.log("Error fetching user data");
      }
    }
    getUserData();
  }, []);

  return (
    <div className="flex flex-col justify-center text-center">
      Id {params.id}
      <span>Name: {name}</span>
      <span>Email: {email}</span>
      <hr />
      <div className="flex mr-auto ml-auto">
        <button
          onClick={handleLogout}
          className="bg-white text-black rounded p-1 mt-2"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Page;
