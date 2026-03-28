import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FloatingParticles from "@/components/FloatingParticles";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const spiritualResponses = [
  "🙏 भगवान हमेशा तुम्हारे साथ हैं। विश्वास रखो, सब अच्छा होगा।",
  "ॐ का जाप करो, मन शांत हो जाएगा। शांति तुम्हारे अंदर है।",
  "सब कुछ समय के साथ ठीक होता है। धैर्य रखो और प्रभु पर भरोसा रखो।",
  "जब मन दुखी हो, तो भगवान का नाम लो। वो हर पल तुम्हारे पास हैं।",
  "कर्म करो, फल की चिंता मत करो। गीता का यही संदेश है।",
  "हर सुबह एक नई शुरुआत है। भगवान ने तुम्हें आज का दिन दिया है, इसका सदुपयोग करो।",
  "प्रेम और करुणा से बड़ी कोई पूजा नहीं है। सबसे प्रेम करो।",
  "🙏 ध्यान करो, मन को शांत करो। भगवान तुम्हारे हृदय में निवास करते हैं।",
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "🙏 नमस्ते! मैं आपका आध्यात्मिक मार्गदर्शक हूँ। अपने मन की बात बताइए, मैं आपकी सहायता करूँगा।",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated spiritual response (replace with AI later)
    setTimeout(() => {
      const response = spiritualResponses[Math.floor(Math.random() * spiritualResponses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
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
        <p className="text-xs text-muted-foreground mt-1">AI Spiritual Guide</p>
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
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
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
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
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
