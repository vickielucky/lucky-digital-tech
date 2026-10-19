"use client";

import { useState, useRef, useEffect } from "react";
import { Msg, sendChat } from "@/lib/chat";

const STORAGE_KEY = "ldtech_chat_messages";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) return JSON.parse(raw) as Msg[];
    } catch {}
    return [{ role: "assistant", content: "Hi — how can I help you today?" }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const data = await sendChat(next);
      const text = data?.choices?.[0]?.message?.content ?? data?.error ?? "No response";
      setMessages((m) => [...m, { role: "assistant", content: String(text) }]);
    } catch (err) {
      const messageText = err instanceof Error ? err.message : String(err);
      setMessages((m) => [...m, { role: "assistant", content: `Error: ${messageText}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed bottom-6 right-6 z-50">
        {open && (
          <div className="w-80 max-w-xs bg-black/80 text-white rounded-2xl shadow-lg p-3 mb-3">
            <div className="h-64 overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <div key={i} className={`mb-3 text-sm ${m.role === "user" ? "text-right" : "text-left"}`}>
                  <div className={`${m.role === "user" ? "inline-block bg-pink-500 text-black" : "inline-block bg-white/6 text-gray-200"} px-3 py-2 rounded-xl`}>{m.content}</div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs text-gray-300">Conversation</div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setMessages([{ role: "assistant", content: "Hi — how can I help you today?" }]); localStorage.removeItem(STORAGE_KEY); }}
                  className="text-xs text-gray-300 hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                className="flex-1 rounded-full px-3 py-2 bg-black/50 outline-none text-sm"
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} disabled={loading} className="bg-pink-500 px-4 py-2 rounded-full text-black font-semibold">
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className="w-14 h-14 rounded-full bg-pink-500 text-black flex items-center justify-center shadow-xl"
          aria-label="Toggle chat"
        >
          {open ? "✕" : "💬"}
        </button>
      </div>
    </div>
  );
}
