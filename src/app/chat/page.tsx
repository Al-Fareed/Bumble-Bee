"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCompletion } from "ai/react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
const Page = () => {
  const [chats, setChats] = useState<ChatHistory[]>([]);
  useEffect(() => {
    document.title = "Bumble Bee";
    const conversations = localStorage.getItem("chatHistory");
    if (conversations) {
      setChats(JSON.parse(conversations));
    }
  }, []);
  interface ChatHistory {
    userPrompt: String;
    aiResponse: String;
  }
  const { completion, input, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      onFinish: (prompt: string, completion: string) => {
        setChats((prevChats) => {
          const newChats = [
            ...prevChats,
            {
              userPrompt: input,
              aiResponse: completion,
            },
          ];
          localStorage.setItem("chatHistory", JSON.stringify(newChats));
          return newChats;
        });
        setInput("");
      },
    });
  return (
    <div className="">
      <div className="fixed w-full top-0 left-0 m-2 pr-3 z-50 bg-black h-max">
        <div className="flex items-center justify-between h-full">
          <div className="w-1/3"></div>
          <span className="text-center text-3xl font-bold mx-auto">
            Bumble Bee
          </span>
          <div className="w-1/3 flex justify-end">
            <Link
              className="bg-white text-black p-1 rounded-full"
              href="/profile"
            >
              <IoPersonCircleSharp size={28} />
            </Link>
          </div>
        </div>
        <hr />
      </div>

      <div className="pt-8">
        <div
          style={{ maxHeight: "84vh", width: "60vw" }}
          className="mr-auto ml-auto mt-3 rounded p-4 overflow-scroll mb-60"
        >
          {chats.map((chat, index) => (
            <div key={index} className="flex flex-col">
              <div className="ml-auto mr-2 w-fit bg-white text-black rounded-2xl p-2 max-w-2xl">
                {chat.userPrompt}
              </div>
              <div className="bg-gray-600 rounded-2xl p-2 mb-7 mt-1 max-w-3xl">
                {chat.aiResponse}
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full h-fit flex justify-center p-3">
          <form
            className="inline-flex w-6/12 h-fit"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              className="text-black outline-none bg-gray-300 mr-1 w-full rounded h-14 p-2 pr-16"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e: any) => {
                if (e.key.toLowerCase() === "enter") handleSubmit();
              }}
            />
            <button
              type="submit"
              className="rounded p-2 bg-transparent h-fit -ml-16 text-black"
            >
              <IoArrowUpCircleSharp size={35} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
