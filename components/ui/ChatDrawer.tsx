import React from "react";
import DragCloseDrawer from "./DragCloseDrawer";
import { jakarta } from "@/app/layout";
import { Button } from "./button";
import { ChatBot } from "./Chatbot";

function ChatDrawer({ open, setOpen }: { open: boolean; setOpen: any }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <ChatBot api=`${process.env.NEXT_PUBLIC_LLM_BACKEND_URL}` />
      </DragCloseDrawer>
    </div>
  );
}

export default ChatDrawer;
