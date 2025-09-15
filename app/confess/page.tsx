"use client";

import { useState } from "react";
import ChatRoom from "@/components/ChatRoom";
import Confessions from "@/components/Confessions";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"confessions" | "chat">(
    "confessions"
  );

  // lifted state for online users shown in the top header when chat is active
  const [chatUsers, setChatUsers] = useState(0);

  return (
    <>
      {activeTab === "chat" ? (
        // Minimal header shown ONLY for Chat tab
        <header className="sticky top-0 z-50 flex items-center justify-between bg-blue-800 p-4 md:px-6 backdrop-blur">
          <Link href="/">
            <p className="select-none font-serif text-2xl font-medium">
              KUK Confessions
            </p>
          </Link>
          <span className="text-sm font-medium text-blue-600">
            👥 {chatUsers} online
          </span>
        </header>
      ) : (
        // Default navbar for Confessions (icons etc.)
        <Navbar />
      )}

      {/* Tabs */}
      <div className="w-full py-2 flex justify-around font-bold text-2xl">
        <div
          onClick={() => setActiveTab("confessions")}
          className={`cursor-pointer pb-2 ${
            activeTab === "confessions"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-white"
          }`}
        >
          Confessions
        </div>
        <div
          onClick={() => setActiveTab("chat")}
          className={`cursor-pointer pb-2 ${
            activeTab === "chat"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-white"
          }`}
        >
          Chat Room
        </div>
      </div>

      {/* Body */}
      <div>
        {activeTab === "confessions" && <Confessions />}
        {activeTab === "chat" && (
          <ChatRoom onUsersCountChange={setChatUsers} />
        )}
      </div>
    </>
  );
};

export default Page;
