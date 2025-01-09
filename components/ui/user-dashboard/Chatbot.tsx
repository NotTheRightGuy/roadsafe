"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, Send } from "lucide-react";
import { button } from "framer-motion/client";

const BACKEND_URL = "http://localhost:8000/api/process";

function Chatbot({ ...props }) {
  const [messages, setMessages] = useState<
    { query: string; response: string }[]
  >([]);
  const [newQuery, setNewQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendQuery = async () => {
    if (!newQuery.trim()) return;

    const query = newQuery.trim();
    setNewQuery("");
    setLoading(true);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { query, response: data.result }]);
    } catch (error) {
      console.error("Error processing query:", error);
      setMessages((prev) => [
        ...prev,
        { query, response: "An error occurred while processing your query." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="absolute bottom-[7.5rem] z-20 right-2 bg-blue-500 text-white flex justify-center items-center w-12 h-12 rounded-2xl shadow-lg cursor-pointer"
      {...props}
    >
      <BotMessageSquare />
    </button>
  );
}

export default Chatbot;
