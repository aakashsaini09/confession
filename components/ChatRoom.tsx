"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

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

  useEffect(() => {
    socket = io({
      path: "/api/socket",
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
    socket.on("users-count", handleUserCount); // matches your backend event name

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
    // send as plain string; backend wraps to {id, text}
    socket.emit("chat-message", text);
    setInput("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[67vh] flex-col justify-between w-full max-w-[95vw] md:max-w-[85vw] mx-auto border border-gray-500 rounded-xl shadow-lg bg-white">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => {
            const mine = msg.id === userId;
            return (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[75%] break-words ${
                  mine
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-300 text-black mr-auto"
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
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
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
  );
}
