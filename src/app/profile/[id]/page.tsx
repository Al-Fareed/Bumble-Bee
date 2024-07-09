"use client";
import React, { useEffect, useState } from "react";
import { NextRequest } from "next/server";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = ({ params }: any, request:NextRequest) => {
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
    

  return (
    <div className="flex flex-col justify-center text-center">
      Id {params.id}
      <span>Name : </span>
      <span>Email : </span>
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

export default page;
