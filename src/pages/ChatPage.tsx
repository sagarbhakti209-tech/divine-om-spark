import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import BottomNav from "@/components/BottomNav";
import FloatingParticles from "@/components/FloatingParticles";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/spiritual-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      onError(errorData.error || "Something went wrong");
      return;
    }

    if (!resp.body) {
      onError("No response body");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Network error");
  }
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "🙏 नमस्ते! मैं आपका आध्यात्मिक मार्गदर्शक हूँ। अपने मन की बात बताइए, मैं आपकी सहायता करूँगा।",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > updatedMessages.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev.slice(0, -1), ...( prev.length === updatedMessages.length ? [prev[prev.length-1], { role: "assistant" as const, content: assistantSoFar }] : [{ ...prev[prev.length-1] }])];
      });
    };

    await streamChat({
      messages: updatedMessages,
      onDelta: (chunk) => {
        assistantSoFar += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && assistantSoFar.length > chunk.length) {
            return [...prev.slice(0, -1), { role: "assistant", content: assistantSoFar }];
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      },
      onDone: () => setIsLoading(false),
      onError: (error) => {
        setIsLoading(false);
        toast.error(error);
        // Fallback response
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "🙏 क्षमा करें, अभी कुछ समस्या आ रही है। कृपया थोड़ी देर बाद प्रयास करें।" },
        ]);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(25_100%_50%/0.06)_0%,transparent_50%)]" />
      <FloatingParticles count={8} />

      {/* Header */}
      <div className="relative z-10 px-4 pt-8 pb-4 text-center border-b border-border/30">
        <h1 className="text-xl font-bold text-foreground text-glow-saffron">
          💬 Chat with God
        </h1>
        <p className="text-xs text-muted-foreground mt-1">AI Spiritual Guide • Powered by Lovable AI</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "gradient-saffron text-primary-foreground rounded-br-md"
                  : "glass-card text-foreground rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="relative z-10 px-4 pb-4 pt-2">
        <div className="glass-card flex items-center gap-2 px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="अपने मन की बात बताइए..."
            className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-full gradient-saffron flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChatPage;
