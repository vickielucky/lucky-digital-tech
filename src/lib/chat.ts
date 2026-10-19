export type Msg = { role: "user" | "assistant" | "system"; content: string };

export async function sendChat(messages: Msg[]) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await res.json();
    if (!res.ok) {
      const errMsg = json?.error?.message ?? json?.error ?? JSON.stringify(json);
      throw new Error(errMsg || "Chat API error");
    }
    return json;
  }

  const text = await res.text();
  if (!res.ok) throw new Error(text || "Chat API error");
  try {
    return JSON.parse(text);
  } catch {
    return text as any;
  }
}
