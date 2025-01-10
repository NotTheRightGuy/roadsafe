"use client";

import { type UseChatOptions } from "ai/react";

import { Chat } from "@/components/ui/chat";
import { useState } from "react";
import { Message } from "./chat-message";
import { useLocationContext } from "@/context/LocationContext";
import { Incident } from "@/hooks/useGetIncidents";

type ChatDemoProps = {
    initialMessages?: UseChatOptions["initialMessages"];
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

    const handleSubmit = async (
        event?: { preventDefault?: () => void },
        options?: { experimental_attachments?: FileList }
    ) => {
        event?.preventDefault?.();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: input,
                    current_position: locCtx?.currentLocation,
                    api_response: props.incidents,
                }),
            });

            const data = await response.json();
            console.log(data);
            setMessages((prev) => [
                ...prev,
                { id: crypto.randomUUID(), role: "user", content: input },
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: data.response,
                },
            ]);
            setInput("");
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
        <div className="flex h-full w-full">
            <Chat
                className="flex flex-col justify-around"
                messages={[...messages]}
                handleSubmit={handleSubmit}
                input={input}
                handleInputChange={handleInputChange}
                isGenerating={isLoading}
                stop={stop}
                append={append}
                suggestions={[
                    "Generate a tasty vegan lasagna recipe for 3 people.",
                    "Generate a list of 5 questions for a job interview for a software engineer.",
                    "Who won the 2022 FIFA World Cup?",
                ]}
            />
        </div>
    );
}
