"use client";import { useState } from "react";
import Image from "next/image";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); 

    try {
      const res = await fetch("http://localhost:5000/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "123", message: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "model", content: data.response }, 
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "model", content: "⚠️ Error: Unable to get response." },
      ]);
    } finally {
      setIsTyping(false); // hide typing indicator
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      
      {/* Header */}
      <div className="relative z-10 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="relative">
            <Image
              src="/persona.png"
              alt="Hitesh Choudhary"
              width={48}
              height={48}
              className="rounded-full shadow-lg border-2 border-purple-500/50"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Hitesh Choudhary</h1>
            <p className="text-sm text-slate-400">AI Assistant • Online</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 relative z-10 max-w-4xl mx-auto w-full px-6 py-6">
        <div className="h-full max-h-[calc(100vh-200px)] overflow-y-auto space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Image
                src="/persona.png"
                alt="Hitesh Choudhary"
                width={80}
                height={80}
                className="rounded-full shadow-lg border-2 border-purple-500/50 mb-6"
              />
              <h2 className="text-2xl font-bold text-white mb-2">Start a conversation</h2>
              <p className="text-slate-400 max-w-md">Ask me anything about web development, programming, or technology</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "model" && (
                <Image
                  src="/persona.png"
                  alt="Hitesh Choudhary"
                  width={32}
                  height={32}
                  className="rounded-full shadow-md flex-shrink-0"
                />
              )}
              
              <div
                className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow-lg ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                    : "bg-slate-800/80 backdrop-blur-sm text-slate-100 border border-slate-700/50 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{m.content}</p>
              </div>

              {m.role === "user" && (
                <Image
                  src="/user.png"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full shadow-md flex-shrink-0"
                />
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Image
                src="/persona.png"
                alt="Hitesh Choudhary"
                width={32}
                height={32}
                className="rounded-full shadow-md flex-shrink-0"
              />
              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                className="w-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-4 py-3 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                rows="1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                style={{
                  minHeight: '44px',
                  maxHeight: '120px',
                  height: 'auto'
                }}
              />
            </div>
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
