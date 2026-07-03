import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Sparkles, Minimize2, Loader2, Bot, User } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Types ──────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const SUGGESTIONS_EN = ["See specs", "Pricing", "Shipping"];
const SUGGESTIONS_VI = ["Xem thông số", "Bảng giá", "Vận chuyển"];

// API Setup (Reads from .env)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// System Prompt gives the AI context about the product
const SYSTEM_PROMPT = `You are AETHER Assist, an AI guide for AETHER Vision smart glasses.
Product Context:
- AETHER Vision features: Weight: 38g titanium frame, Battery: 16h mixed-use, Camera: 12MP 4K@60fps with OIS, Display: Dual µOLED, 4K per eye, 120Hz, Chip: Aether N2 (8-core Neural Engine), Connectivity: Wi-Fi 7, BT 5.4, UWB, Water resistance: IP67, Charging: 0→80% in 25 minutes.
- Pricing: Standard $1,299. Pro edition (with prescription) $1,499. Early reservation $99 (refundable).
- Shipping: Wave 1 pre-orders ship Q1. New reservations go to Wave 2 (late Q2). Free shipping worldwide for early access.
- Tone: Premium, concise, helpful, tech-savvy. Match the language of the user's prompt (English or Vietnamese). Keep responses under 3 short sentences unless listing specs.

CRITICAL INSTRUCTION: You MUST limit your knowledge strictly to AETHER Vision (Product, FAQ, Specifications, Features). If the user asks about ANY unrelated topic (coding, history, general knowledge, other products, etc.), you MUST politely refuse to answer and redirect them back to AETHER Vision products.`;

// ─── Local Fallback (if no API key) ─────────────────────────
const KB: Record<string, { en: string; vi: string }> = {
  spec: {
    en: "AETHER Vision features:\n• Weight: 38g titanium frame\n• Battery: 16h mixed-use\n• Camera: 12MP 4K@60fps with OIS\n• Display: Dual µOLED, 4K per eye, 120Hz\n• Chip: Aether N2, 8-core Neural Engine\n• Connectivity: Wi-Fi 7, BT 5.4, UWB\n• Water resistance: IP67\n• Charging: 0→80% in 25 minutes",
    vi: "Thông số AETHER Vision:\n• Trọng lượng: 38g khung titan\n• Pin: 16 giờ sử dụng hỗn hợp\n• Camera: 12MP 4K@60fps với OIS\n• Màn hình: µOLED kép, 4K mỗi mắt, 120Hz\n• Chip: Aether N2, 8 nhân Neural Engine\n• Kết nối: Wi-Fi 7, BT 5.4, UWB\n• Chống nước: IP67\n• Sạc: 0→80% trong 25 phút",
  },
  price: {
    en: "AETHER Vision is priced at $1,299 for the standard edition. The Pro edition with prescription lenses starts at $1,499. Early access reservation is $99 (refundable).",
    vi: "AETHER Vision có giá $1,299 cho phiên bản tiêu chuẩn. Phiên bản Pro với tròng kính cận bắt đầu từ $1,499. Đặt trước truy cập sớm chỉ $99 (hoàn lại được).",
  },
  ship: {
    en: "Wave 1 pre-orders ship Q1. New reservations are allocated to Wave 2, expected late Q2. Free shipping worldwide for early access members.",
    vi: "Đơn đặt trước Đợt 1 sẽ giao vào Q1. Đặt chỗ mới được phân bổ vào Đợt 2, dự kiến cuối Q2. Giao hàng miễn phí toàn thế giới cho thành viên truy cập sớm.",
  },
  default: {
    en: "Please configure your Gemini API Key in the .env file (VITE_GEMINI_API_KEY) for real AI responses. I'm currently running on a limited local fallback.",
    vi: "Vui lòng cấu hình Gemini API Key trong file .env (VITE_GEMINI_API_KEY) để bật tính năng AI thực tế. Tôi hiện đang chạy ở chế độ mô phỏng cơ bản.",
  },
};

function matchKB(text: string): string {
  const lower = text.toLowerCase();
  if (/spec|thông số|feature|tính năng|camera|battery|pin|weight|chip|display/.test(lower)) return "spec";
  if (/price|pricing|giá|cost|chi phí|\$|bao nhiêu/.test(lower)) return "price";
  if (/ship|delivery|giao hàng|vận chuyển|khi nào|when/.test(lower)) return "ship";
  return "default";
}

// ─── Component ──────────────────────────────────────────────
export function ChatWidget() {
  const { t, language } = useTranslation();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = language === "vi" ? SUGGESTIONS_VI : SUGGESTIONS_EN;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsTyping(true);

      let responseText = "";

      if (genAI) {
        try {
          // Use gemini-flash-latest to ensure maximum compatibility with the API key
          const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: SYSTEM_PROMPT,
          });
          const result = await model.generateContent(text);
          responseText = result.response.text();
        } catch (error: any) {
          console.error("Gemini API Error:", error);
          
          if (error?.message?.includes("404")) {
            responseText = language === "vi" 
              ? "Lỗi 404: Mô hình AI không khả dụng với API Key này. Vui lòng cập nhật API Key hoặc kiểm tra Google AI Studio."
              : "Error 404: The AI model is not available for this API Key. Please update your API Key.";
          } else {
            responseText = language === "vi" 
              ? "Xin lỗi, đã có lỗi kết nối tới AI. Vui lòng kiểm tra lại cấu hình API Key."
              : "Sorry, there was an error connecting to the AI. Please check your API Key configuration.";
          }
        }
      } else {
        // Local Fallback
        const delay = 600 + Math.random() * 800;
        await new Promise((r) => setTimeout(r, delay));
        const key = matchKB(text);
        responseText = KB[key]?.[language] || KB.default[language];
      }

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    },
    [language],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(inputValue);
  }

  const welcomeMsg = language === "vi"
    ? "Xin chào! Tôi là AETHER Assist — trợ lý AI của bạn. Tôi có thể giúp gì cho bạn?"
    : "Hi! I'm AETHER Assist — your AI guide to Vision. What can I help you discover?";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[340px] sm:w-[400px] rounded-3xl overflow-hidden shadow-[0_32px_80px_-8px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]"
            style={{
              background: "var(--glass-strong-bg)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] grid place-items-center shadow-[0_0_20px_-4px_rgba(109,94,245,0.7)]">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-main">{t("chat.title")}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                    <span className="text-[11px] text-[#00D9FF]/80 tracking-wide">
                      {t("chat.status")}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 grid place-items-center rounded-xl hover:bg-surface-8 transition-colors"
                aria-label="Close chat"
              >
                <Minimize2 className="h-4 w-4 text-text-muted" />
              </button>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4 h-[360px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {/* Welcome message */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-2.5"
              >
                <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] mt-0.5 grid place-items-center">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-surface-6 border border-border-6 px-4 py-3 text-sm text-text-main leading-relaxed max-w-[280px]">
                  {welcomeMsg}
                </div>
              </motion.div>

              {/* Quick replies — show only if no messages yet */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 pl-9"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs rounded-full glass px-3.5 py-1.5 text-text-muted hover:text-text-main hover:bg-surface-10 border border-border-8 hover:border-border-20 transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Conversation */}
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] mt-0.5 grid place-items-center">
                        <Bot className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[280px] whitespace-pre-line ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-gradient-to-br from-[#6D5EF5] to-[#8B5CF6] text-white"
                          : "rounded-tl-sm bg-surface-6 border border-border-6 text-text-main"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="h-7 w-7 shrink-0 rounded-full bg-surface-10 mt-0.5 grid place-items-center">
                        <User className="h-3.5 w-3.5 text-text-muted" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] mt-0.5 grid place-items-center">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-surface-6 border border-border-6 px-4 py-3 flex items-center gap-1.5">
                    <motion.span
                      className="h-2 w-2 rounded-full bg-[#6D5EF5]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="h-2 w-2 rounded-full bg-[#6D5EF5]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                    />
                    <motion.span
                      className="h-2 w-2 rounded-full bg-[#6D5EF5]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border-6 flex items-center gap-2.5"
            >
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("chat.placeholder")}
                disabled={isTyping}
                className="flex-1 bg-surface-4 rounded-2xl px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/25 border border-border-6 hover:border-border-15 focus:border-[#6D5EF5]/40 transition-all duration-200 disabled:opacity-50"
                aria-label="Message input"
              />
              <motion.button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative h-10 w-10 shrink-0 grid place-items-center rounded-2xl bg-gradient-to-br from-[#6D5EF5] to-[#8B5CF6] shadow-[0_4px_16px_-4px_rgba(109,94,245,0.6)] hover:shadow-[0_6px_24px_-4px_rgba(109,94,245,0.8)] transition-shadow overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                {isTyping ? (
                  <Loader2 className="relative h-4 w-4 text-white animate-spin" />
                ) : (
                  <Send className="relative h-4 w-4 text-white" />
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] grid place-items-center shadow-[0_8px_40px_-4px_rgba(109,94,245,0.65)] hover:shadow-[0_12px_56px_-4px_rgba(109,94,245,0.85)] transition-shadow overflow-hidden"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {open ? (
              <X className="h-5.5 w-5.5 text-white" />
            ) : (
              <MessageCircle className="h-5.5 w-5.5 text-white" />
            )}
          </motion.span>
        </AnimatePresence>

        {/* Unread dot */}
        {!open && messages.length === 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-bg-base animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
