import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Briefcase,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { StudentProfile, HollandCodeType } from '../types';
import {
  ChatMessage,
  askCareerAICounselor,
} from '../services/aiCounselorService';
import { playClickSound, playChirpSound } from '../utils/soundEffects';

interface CareerAICounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  activeHollandCode?: HollandCodeType | string;
  activeCareerTitle?: string;
}

export const CareerAICounselorModal: React.FC<CareerAICounselorModalProps> = ({
  isOpen,
  onClose,
  student,
  activeHollandCode = 'R',
  activeCareerTitle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const studentName = student?.name ? student.name : 'Pelajar';
      const welcomeText = `Salam sejahtera & Hai **${studentName}**! 👋\n\nSaya **Cikgu Kaunselor AI Kerjaya**, pembimbing maya anda untuk meneroka pilihan masa depan.\n\n${
        activeCareerTitle
          ? `Saya lihat anda sedang meneroka kerjaya **${activeCareerTitle}** dalam Kod **${activeHollandCode}**.`
          : `Anda kini sedang meneroka Kod Holland **${activeHollandCode}**.`
      }\n\nAda apa-apa yang kurang jelas atau ingin anda ketahui lebih mendalam mengenai kerjaya, subjek SPM, syarat UPU, atau laluan pengajian? Sila pilih soalan pantas di bawah atau taip soalan anda sendiri!`;

      setMessages([
        {
          id: 'welcome-1',
          role: 'assistant',
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isOpen, activeCareerTitle, activeHollandCode, student?.name]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  if (!isOpen) return null;

  const currentJob = activeCareerTitle || 'pekerjaan ini';

  // Dynamic quick prompt chips
  const quickQuestions = [
    `Apakah syarat SPM dan subjek penting untuk ${currentJob}?`,
    `Apakah perbezaan laluan Asasi, Matrikulasi & Diploma untuk bidang ${activeHollandCode}?`,
    `Bagaimanakah suasana kerja sebenar dan cabaran ${currentJob}?`,
    `Apakah prospek kerjaya dan pasaran kerja di Malaysia dalam 5 tahun akan datang?`,
    `Bolehkah saya ceburi bidang ini jika gred Matematik/Sains saya sederhana?`,
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || inputText).trim();
    if (!question || isLoading) return;

    playClickSound();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await askCareerAICounselor({
        question,
        careerTitle: activeCareerTitle,
        hollandCode: activeHollandCode,
        student,
        conversationHistory: updatedHistory,
      });

      playChirpSound();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: 'Maaf, terdapat gangguan sambungan semasa menjana jawapan. Sila cuba sekali lagi sebentar lagi.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    playClickSound();
    const studentName = student?.name ? student.name : 'Pelajar';
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: `Perbualan telah diset semula. Hai **${studentName}**, apa lagi persoalan kerjaya yang ingin anda bincangkan dengan Cikgu AI?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to render basic markdown formatting cleanly
  const renderFormattedText = (text: string) => {
    // Split by lines
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, lIdx) => {
          if (!line.trim()) {
            return <div key={lIdx} className="h-1.5" />;
          }

          // Bullet points
          const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ') || /^\d+\.\s/.test(line.trim());

          // Bold parsing
          const parts = line.split(/(\*\*.*?\*\*)/g);

          return (
            <p key={lIdx} className={isBullet ? 'pl-2 text-black/90 dark:text-zinc-200' : 'text-black dark:text-white'}>
              {parts.map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="font-black text-black dark:text-yellow-300">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl h-[88vh] max-h-[750px] bg-[#FFFDF7] dark:bg-[#121316] rounded-[32px] border-3 border-black dark:border-white shadow-[8px_8px_0_#000] dark:shadow-[8px_8px_0_#FFF] flex flex-col overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-4 bg-[#FFE600] dark:bg-[#1E2026] border-b-3 border-black dark:border-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-black text-[#00E5FF] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#000] shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base sm:text-lg text-black dark:text-white uppercase tracking-tight">
                  Cikgu Kaunselor AI Kerjaya
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-mono-code font-black border border-black shadow-[1px_1px_0_#000]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-black/80 dark:text-zinc-300">
                Bimbingan Pintar Ujian Sidek • SPM • Lepasan SPM • Kerjaya Malaysia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetChat}
              title="Set Semula Perbualan"
              className="p-2 rounded-full bg-white dark:bg-zinc-800 border-2 border-black dark:border-white shadow-[2px_2px_0_#000] hover:bg-yellow-100 text-black dark:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              title="Tutup Modal"
              className="p-2 rounded-full bg-black text-white border-2 border-white shadow-[2px_2px_0_#000] hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <X className="w-4 h-4 text-[#FFE600]" />
            </button>
          </div>
        </div>

        {/* Sub-header context banner */}
        <div className="px-5 py-2.5 bg-[#00E5FF]/20 dark:bg-[#00E5FF]/10 border-b-2 border-black/20 dark:border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-black text-[#00E5FF] font-black text-[10px] border border-white">
              KONTEKS
            </span>
            <span className="font-bold text-black dark:text-zinc-200">
              Pelajar: <strong>{student?.name || 'Umum'}</strong> • Kod: <strong>{activeHollandCode}</strong>
              {activeCareerTitle && (
                <>
                  {' '}
                  • Kerjaya: <strong>{activeCareerTitle}</strong>
                </>
              )}
            </span>
          </div>
          <span className="text-[11px] text-black/70 dark:text-zinc-400 font-bold hidden sm:inline">
            Didukung oleh Gemini 3.8 Flash
          </span>
        </div>

        {/* Chat Messages Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FBF9F1] dark:bg-[#0F1013]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-black text-[#FFE600] border border-white flex items-center justify-center shrink-0 shadow-[2px_2px_0_#000]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] p-3.5 sm:p-4 rounded-[22px] border-2 border-black shadow-[3px_3px_0_#000] transition-all ${
                    isUser
                      ? 'bg-[#00E5FF] text-black font-medium'
                      : 'bg-white dark:bg-zinc-900 text-black dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-black/10 dark:border-white/10 text-[10px] font-mono-code font-bold opacity-75">
                    <span>{isUser ? 'Anda (Pelajar)' : 'Cikgu Kaunselor AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {renderFormattedText(msg.text)}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#00E5FF] text-black border border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_#000] font-black text-xs font-display">
                    {student?.name ? student.name.charAt(0).toUpperCase() : 'P'}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-black text-[#FFE600] border border-white flex items-center justify-center shrink-0 shadow-[2px_2px_0_#000]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-full bg-white dark:bg-zinc-900 border-2 border-black dark:border-white shadow-[3px_3px_0_#000] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs font-bold text-black dark:text-white ml-2">
                  Cikgu AI sedang menyediakan bimbingan...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-white dark:bg-[#18191E] border-t-2 border-black/20 dark:border-white/20 shrink-0">
          <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-mono-code font-bold text-black/70 dark:text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Cadangan Soalan Pantas (Tekan untuk bertanya):</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {quickQuestions.map((q, qIdx) => (
              <button
                key={qIdx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-zinc-800 hover:bg-[#FFE600] hover:text-black text-black dark:text-zinc-200 border-1.5 border-black text-[11px] font-bold shadow-[1.5px_1.5px_0_#000] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-[#FFFDF7] dark:bg-[#121316] border-t-3 border-black dark:border-white shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanya apa-apa soalan tentang kerjaya, subjek SPM, universiti..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-full bg-white dark:bg-zinc-900 border-2.5 border-black dark:border-white text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-zinc-500 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF] shadow-[2px_2px_0_#000]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-5 py-3 rounded-full bg-black text-[#FFE600] font-display font-black text-xs sm:text-sm uppercase border-2.5 border-white shadow-[3px_3px_0_#000] flex items-center gap-1.5 hover:bg-neutral-800 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Tanya</span>
              <Send className="w-4 h-4 text-[#00E5FF]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
