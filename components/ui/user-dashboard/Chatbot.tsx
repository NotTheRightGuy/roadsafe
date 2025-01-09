"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, Send } from "lucide-react";

const BACKEND_URL = "http://localhost:8000/api/process";

function Chatbot({ currentLocation, incidents }: any) {
    const [messages, setMessages] = useState<
        { query: string; response: string }[]
    >([]);
    const [newQuery, setNewQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendQuery = async () => {
        if (!newQuery.trim()) return;

        const query = newQuery;
        setNewQuery("");
        setLoading(true);

        try {
            const res = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    current_position: currentLocation,
                    api_response: incidents,
                    text: newQuery,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch response");
            }

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { query, response: data.message.content },
            ]);
        } catch (error) {
            console.error("Error processing query:", error);
            setMessages((prev) => [
                ...prev,
                {
                    query,
                    response: "An error occurred while processing your query.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div className="absolute z-20 right-2 bottom-[7.5rem] bg-white text-black flex justify-center items-center w-12 h-12 rounded-2xl shadow-lg cursor-pointer">
                    <BotMessageSquare size={24} />
                </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center gap-4 p-4">
                <div className="w-full flex flex-col gap-4 mt-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className="bg-white text-black shadow-md p-3 rounded-lg"
                        >
                            <div className="font-bold">You:</div>
                            <div className="mb-2">{message.query}</div>
                            <div className="font-bold">Bot:</div>
                            <div>{message.response}</div>
                        </div>
                    ))}
                    {loading && (
                        <div className="text-red-500">Processing...</div>
                    )}

                    <div className="w-full flex gap-2 px-2">
                        <Input
                            value={newQuery}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setNewQuery(e.target.value)}
                            placeholder="Ask something..."
                            className="flex-1"
                        />
                        <Button
                            onClick={handleSendQuery}
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white"
                        >
                            <Send size={16} /> Send
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Chatbot;
