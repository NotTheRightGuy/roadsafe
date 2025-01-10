"use client";

import { Chat } from "@/components/ui/chat";
import { useState } from "react";
import { Message } from "./chat-message";
import { useLocationContext } from "@/context/LocationContext";
import { Incident } from "@/hooks/useGetIncidents";
type ChatDemoProps = {
  incidents: Incident[];
};

export function ChatBot(props: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const locCtx = useLocationContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    setIsLoading(true);

    try {
      console.log("Sending request to the server...");
      console.log("Current location:", locCtx?.currentLocation);
      console.log("Incidents:", props.incidents);
      console.log("Input:", input);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "user", content: input },
      ]);
      const tempinput = input;
      setInput("");
      const response = await fetch(
        "https://roadsafe.gftkdddzm.workers.dev/api/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: tempinput,
            current_position: locCtx?.currentLocation,
            api_response: props.incidents,
          }),
        }
      );

      const data = await response.json();
      setIsLoading(false);
      console.log(data?.result.response);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.result.response,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    // Implement abort controller if needed
  };

  const append = (message: { role: "user"; content: string }) => {
    const messageWithId: Message = {
      ...message,
      id: crypto.randomUUID(),
    };
    setMessages((prev) => [...prev, messageWithId]);
  };
  return (
    <div className="flex h-full w-full mt-5">
      <Chat
        className="flex flex-col justify-around"
        messages={[...messages]}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          "Where are the nearest gas stations?",
          "Are there any potholes near me?",
          "Is there any construction on my route?",
        ]}
      />
    </div>
  );
}
