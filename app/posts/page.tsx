"use client";
import { useState } from "react";
import ChatRoom from "@/components/ChatRoom";
import Confessions from "@/components/Confessions";
import Navbar from "@/components/Navbar";

const Page = () => {
  // default: Confessions selected
  const [activeTab, setActiveTab] = useState<"confessions" | "chat">("confessions");

  return (
    <>
      <Navbar />
      <div className="w-full py-7 flex justify-around font-bold text-2xl">
        <div
          onClick={() => setActiveTab("confessions")}
          className={`cursor-pointer pb-2 ${
            activeTab === "confessions"
              ? "border-b-4 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Confessions
        </div>
        <div
          onClick={() => setActiveTab("chat")}
          className={`cursor-pointer pb-2 ${
            activeTab === "chat"
              ? "border-b-4 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Chat Room
        </div>
      </div>

      <div className="p-4">
        {activeTab === "confessions" && <Confessions />}
        {activeTab === "chat" && <ChatRoom />}
      </div>
    </>
  );
};

export default Page;
