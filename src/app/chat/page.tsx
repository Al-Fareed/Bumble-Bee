"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCompletion } from "ai/react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
const Page = () => {
  const [chats, setChats] = useState<ChatHistory[]>([]);
  useEffect(() => {
    document.title = 'Bumble Bee'
    const conversations = localStorage.getItem('chatHistory');
    if(conversations){
      setChats(JSON.parse(conversations))
    }
  },[])
  interface ChatHistory {
    userPrompt: String;
    aiResponse: String;
  }
  const { completion, input, handleInputChange, handleSubmit, setInput } = useCompletion({
    onFinish: (prompt: string, completion: string) => {
      setChats((prevChats) => {
        const newChats = [
          ...prevChats,
          {
            userPrompt: input,
            aiResponse: completion,
          },
        ];
        localStorage.setItem('chatHistory', JSON.stringify(newChats));
        return newChats;
      });
      setInput("");
    },
  });
  return (
    <div className="">
      <div className="flex m-2 h-full">
        <span className="flex ml-auto mr-auto text-center text-3xl  font-bold">
          Bumble Bee
        </span>
        <Link
          className="bg-white text-black p-1 rounded-full"
          href={"/profile"}
        >
          <IoPersonCircleSharp size={35} />
        </Link>
      </div>
      <hr className="mt-2" />
      <div>
        <div
          style={{ maxHeight: "78vh", width: "60vw" }}
          className=" mr-auto ml-auto mt-3 rounded p-4 overflow-scroll mb-60 "
        >
          {chats.map((chat,index) => (
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
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full flex justify-center p-3">
          <form
            className="inline-flex w-6/12 "
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
                e.key.toLowerCase() === "enter" && handleInputChange;
              }}
            />
            <button
              type="submit"
              className="rounded p-2 bg-tranparent -m-16 text-black"
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
