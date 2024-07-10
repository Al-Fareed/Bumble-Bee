"use client";
import "dotenv/config";

import { useCompletion } from "ai/react";

export default function Chat() {
  const { completion, input, handleInputChange, handleSubmit } =
    useCompletion();

  return (
    <div>
      {completion}
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
