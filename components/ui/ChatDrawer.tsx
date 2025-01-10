import React from "react";
import DragCloseDrawer from "./DragCloseDrawer";
import { jakarta } from "@/app/layout";
import { Button } from "./button";
import { ChatBot } from "./Chatbot";
import { Incident } from "@/hooks/useGetIncidents";

function ChatDrawer({
    open,
    setOpen,
    incidents,
}: {
    open: boolean;
    setOpen: any;
    incidents: Incident[];
}) {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <DragCloseDrawer open={open} setOpen={setOpen}>
                <ChatBot incidents={incidents} />
            </DragCloseDrawer>
        </div>
    );
}

export default ChatDrawer;
