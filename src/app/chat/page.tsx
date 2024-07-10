"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCompletion } from "ai/react";

const Page = () => {
  interface ChatEntry {
    userPrompt: string;
    aiResponse: string;
  }
  const { completion, input, handleInputChange, handleSubmit, setInput } =
    useCompletion();
  return (
    <div className="">
      <div className="flex m-2">
        <span className="flex ml-auto mr-auto">Sastha-GPT</span>
        <Link className="bg-white text-black p-1 rounded" href={"/profile"}>
          Profile
        </Link>
      </div>
      <hr className="mt-2" />
      <div>
        <div className="w-96 max-h-screen min-h-80 mr-auto ml-auto mt-3 rounded p-4 overflow-scroll mb-60 ">
          {completion}
        </div>
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full flex justify-center p-3">
          <form
            className="inline-flex w-6/12"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <textarea
              className="text-black outline-none mr-2 w-full rounded h-auto p-2"
              value={input}
              onChange={handleInputChange}
            />
            <button type="submit" className="rounded p-2 bg-white text-black">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
