"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const router = useRouter();

  async function handleLogout() {
    try {
      await axios.get("../../api/user/logout");
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
        document.title = `Profile - ${response.data.data.username}`;
      } catch (error) {
        console.log("Error fetching user data");
      }
    }
    getUserData();
  }, []);

  return (
    <div className="flex flex-col justify-center text-center">
      <div className="flex items-center justify-between w-full">
        <Link href="/chat" className="ml-0">
          <IoArrowBackCircleSharp size={45} />
        </Link>
        <h1 className="text-5xl absolute left-1/2 transform -translate-x-1/2">
          Profile
        </h1>
      </div>
      <hr className="mt-2 mb-2" />
      <div className="bg-white text-lg mt-3 text-black flex w-fit p-5 rounded-lg flex-col mx-auto">
        <span className="mb-2">
          Name:{" "}
          <b>
            {name.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase())}
          </b>
        </span>
        <span className="mb-2">
          Email: <b>{email}</b>
        </span>
        <span className="mb-2">
          Id: <b>{id}</b>
        </span>
        <div className="flex justify-center mt-2">
          <button
            onClick={handleLogout}
            className="bg-black text-white rounded-lg p-1 pl-3 pr-3"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
