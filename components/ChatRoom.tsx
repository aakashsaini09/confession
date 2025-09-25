"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Image from "next/image";
import svg from "@/public/incognito.svg";

let socket: Socket;

type Props = {
  onUsersCountChange?: (count: number) => void; // lift count up to the page
};

interface Message {
  id: string;
  text: string;
}

export default function ChatRoom({ onUsersCountChange }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userIn, setUserIn] = useState(false);

  useEffect(() => {
    setUserIn(true);
    setTimeout(() => {
      setUserIn(false);
    }, 5000);
  }, []);

  const backgroundStyle = {
    backgroundImage: "url('/chatbg.webp')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "80vh",
  };

  useEffect(() => {
    // 👉 Connect to your Node.js server instead of Next.js API route
    // socket = io("http://localhost:8000", {
    socket = io("https://confession-backend.up.railway.app", {
      // path: "/socket", // must match server setup
      transports: ["websocket"],
    });

    const handleConnect = () => {
      setUserId(socket.id ?? "");
    };
    const handleChatMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };
    const handleUserCount = (count: number) => {
      onUsersCountChange?.(count);
    };

    socket.on("connect", handleConnect);
    socket.on("chat-message", handleChatMessage);
    socket.on("users-count", handleUserCount);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("chat-message", handleChatMessage);
      socket.off("users-count", handleUserCount);
      socket.disconnect();
    };
  }, [onUsersCountChange]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    socket.emit("chat-message", text);
    setInput("");
  };

  return (
    <>
      {userIn && (
        <div
          className="absolute top-2 flex left-1/2 -translate-x-1/2 z-50 
                     px-4 py-2 mb-4 text-sm text-red-500 rounded-lg 
                     shadow-md gap-2"
          role="alert"
        >
          <Image src={svg} width={40} alt="" />
          <span className="font-medium my-auto">Messages will disappear soon.</span>
          <p className="my-auto">No messages being stored!!</p>
        </div>
      )}

      <div className="flex flex-col">
        <div
          style={backgroundStyle}
          className="flex h-[67vh] flex-col justify-between w-full max-w-[95vw] md:max-w-[85vw] mx-auto border border-gray-500 rounded-xl shadow-lg"
        >
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => {
              const mine = msg.id === userId;
              return (
                <div
                  key={i}
                  className={`p-3 rounded-lg w-fit sm:max-w-[70%] md:max-w-[40%] break-words ${
                    mine
                      ? "bg-[#074943] text-white ml-auto"
                      : "bg-[#1F2D36] text-white mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input bar (responsive) */}
        <div className="border border-black bg-gray-50 mx-auto w-full md:w-[80vw] p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 text-black py-2 border border-black rounded-lg"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition whitespace-nowrap"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
