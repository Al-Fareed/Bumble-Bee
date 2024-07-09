"use client"
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = ({ params }: any) => {
    const router = useRouter();
  async function handleLogout() {
    try {
      const response = await axios.get("../../api/user/logout");
        console.log(response, "\n Logged out successfully!");
        router.push('/login')
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div>
      Id is {params.id}
      <hr />
      <div className="flex mr-0 ml-auto">
        <button
          onClick={handleLogout}
          className="bg-white text-black rounded p-1"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default page;
