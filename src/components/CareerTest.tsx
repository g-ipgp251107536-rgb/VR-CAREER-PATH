import React, { useState, useEffect } from 'react';
import { SIDEK_QUESTIONS, CATEGORY_INFO_META } from '../data/questions';
import { HollandCodeType, StudentProfile } from '../types';
import {
  Check,
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  playSelectSound,
  playClickSound,
  playSuccessSound,
} from '../utils/soundEffects';

interface CareerTestProps {
  currentStudent: StudentProfile;
  onCompleteTest: (updatedStudent: StudentProfile) => void;
  onBackToProfile: () => void;
}

export const CareerTest: React.FC<CareerTestProps> = ({
  currentStudent,
  onCompleteTest,
  onBackToProfile,
}) => {
  // Answers state: id -> 'Y' | 'T'
  const [answers, setAnswers] = useState<Record<number, 'Y' | 'T'>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalQuestions = SIDEK_QUESTIONS.length;
  const currentQuestion = SIDEK_QUESTIONS[currentIndex];

  const currentCategoryMeta = currentQuestion ? CATEGORY_INFO_META[currentQuestion.category] : null;

  // Calculate live category counts of 'Y'
  const calculateScores = (): Record<HollandCodeType, number> => {
    const counts: Record<HollandCodeType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, K: 0 };
    SIDEK_QUESTIONS.forEach((q) => {
      if (answers[q.id] === 'Y') {
        counts[q.category] = (counts[q.category] || 0) + 1;
      }
    });
    return counts;
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const liveScores = calculateScores();

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key.toLowerCase() === 'y' || e.key === '1') {
        handleAnswer('Y');
      } else if (e.key.toLowerCase() === 't' || e.key === '2') {
        handleAnswer('T');
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, answers]);

  const handleAnswer = (val: 'Y' | 'T') => {
    playSelectSound(val === 'Y');
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
    // Auto advance if not at the end
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    if (answeredCount < totalQuestions) {
      const confirmSubmit = window.confirm(
        `Anda baru menjawab ${answeredCount} daripada ${totalQuestions} soalan. Adakah anda ingin teruskan penghantaran? (Soalan yang belum dijawab akan dikira 'TIDAK').`
      );
      if (!confirmSubmit) return;
    }

    playSuccessSound();

    const finalScores = calculateScores();

    // Compute Holland Code (Top 3 categories sorted by score)
    const sorted = (Object.keys(finalScores) as HollandCodeType[]).sort(
      (a, b) => finalScores[b] - finalScores[a]
    );

    const hollandCode = `${sorted[0]}${sorted[1]}${sorted[2]}`;
    const dominantCategory = sorted[0];

    const updatedProfile: StudentProfile = {
      ...currentStudent,
      scores: finalScores,
      hollandCode,
      dominantCategory,
      completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    // Confetti effect!
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFE600', '#00E5FF', '#A3FF2E', '#FF4B4B'],
      });
    } catch {
      // safe fallback
    }

    onCompleteTest(updatedProfile);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Banner with Progress & Controls in Modern Neobrutalism */}
      <div className="bg-white dark:bg-[#1E2026] neo-border p-4 mb-6 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#00E5FF]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FFE600] text-black text-xs font-mono-code font-black px-2.5 py-0.5 border border-black">
                UJIAN INVENTORI MINAT KERJAYA SIDEK
              </span>
              <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                (Pelajar: <strong className="text-black dark:text-white uppercase">{currentStudent.name}</strong>)
              </span>
            </div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase mt-1">
              Jawab Minat Anda: [Y] Ya atau [T] Tidak
            </h1>
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono-code font-black text-black dark:text-white">
            <span>
              KEMAJUAN: {answeredCount} / {totalQuestions} SOALAN ({progressPercent}%)
            </span>
            <span>
              SOALAN SEMASA: #{currentIndex + 1}
            </span>
          </div>
          <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 border-2 border-black dark:border-white overflow-hidden p-0.5">
            <div
              className="h-full bg-[#00E5FF] transition-all duration-200 border-r-2 border-black dark:border-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Live Score Chips (RIASEC) */}
        <div className="mt-3 pt-3 border-t-2 border-black/15 dark:border-white/20 flex flex-wrap items-center gap-2 text-xs font-mono-code font-bold">
          <span className="text-gray-700 dark:text-zinc-400">Skor Semasa 'Y':</span>
          {(['R', 'I', 'A', 'S', 'E', 'K'] as HollandCodeType[]).map((cat) => {
            const meta = CATEGORY_INFO_META[cat];
            return (
              <div
                key={cat}
                className="px-2 py-0.5 border-2 border-black flex items-center gap-1.5 shadow-[1px_1px_0_#000]"
                style={{ backgroundColor: meta.bg }}
              >
                <span className="font-black text-black">{cat}:</span>
                <span className="bg-black text-[#FFE600] px-1.5 py-0.2 rounded-xs text-[11px] font-black">
                  {liveScores[cat]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Question Card with Modern 3D Neobrutalism */}
      <div className="bg-[#FFFDF7] dark:bg-[#1E2026] neo-border-thick p-6 sm:p-10 neo-shadow-lg mb-8 relative transition-colors">
        {/* Category Header & Question Index Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-3 border-black/20 dark:border-white/20">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="px-4 py-1.5 neo-border font-display font-black text-sm uppercase text-black shadow-[3px_3px_0_#000]"
              style={{ backgroundColor: currentCategoryMeta?.color }}
            >
              BIDANG: {currentCategoryMeta?.label} ({currentQuestion.category})
            </span>
            <span className="bg-black text-white font-mono-code text-xs px-3 py-1.5 font-black border-2 border-white">
              Item {currentCategoryMeta?.range}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono-code font-black text-base sm:text-lg text-black bg-[#FFE600] px-4 py-1 neo-border shadow-[3px_3px_0_#000]">
              SOALAN {currentQuestion.id} <span className="text-black/60 text-xs">/ {totalQuestions}</span>
            </span>
          </div>
        </div>

        {/* Question Text in clean modern typography */}
        <div className="my-8 sm:my-10 min-h-[110px] flex flex-col justify-center bg-white dark:bg-[#121316] p-6 sm:p-8 neo-border shadow-[5px_5px_0_#000]">
          <p className="text-xs font-mono-code font-bold uppercase text-gray-700 dark:text-zinc-300 mb-2">
            Adakah anda berminat atau suka aktiviti ini?
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-black dark:text-white leading-snug tracking-tight">
            "{currentQuestion.text}"
          </p>
        </div>

        {/* 3D Brutalism Action Buttons (YA and TIDAK) with strong tactile feedback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-6">
          {/* YA Button */}
          <button
            id={`btn-answer-y-${currentQuestion.id}`}
            type="button"
            onClick={() => handleAnswer('Y')}
            className={`p-6 neo-border transition-all flex items-center justify-between group cursor-pointer select-none active:translate-x-1.5 active:translate-y-1.5 active:shadow-none ${
              answers[currentQuestion.id] === 'Y'
                ? 'bg-[#00E5FF] text-black shadow-[6px_6px_0_#000] scale-[1.02]'
                : 'bg-white dark:bg-[#2A2D35] hover:bg-[#00E5FF]/20 text-black dark:text-white shadow-[4px_4px_0_#000]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 font-display font-black text-2xl flex items-center justify-center neo-border transition-transform group-hover:scale-105 ${
                  answers[currentQuestion.id] === 'Y'
                    ? 'bg-black text-white'
                    : 'bg-black text-white'
                }`}
              >
                Y
              </div>
              <div className="text-left">
                <span className="block font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                  YA (Berminat)
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-zinc-300 block mt-0.5">
                  Saya suka atau ingin lakukan aktiviti ini
                </span>
              </div>
            </div>
            {answers[currentQuestion.id] === 'Y' && (
              <CheckCircle2 className="w-9 h-9 text-black fill-[#00E5FF] shrink-0" />
            )}
          </button>

          {/* TIDAK Button */}
          <button
            id={`btn-answer-t-${currentQuestion.id}`}
            type="button"
            onClick={() => handleAnswer('T')}
            className={`p-6 neo-border transition-all flex items-center justify-between group cursor-pointer select-none active:translate-x-1.5 active:translate-y-1.5 active:shadow-none ${
              answers[currentQuestion.id] === 'T'
                ? 'bg-[#FF4B4B] text-white shadow-[6px_6px_0_#000] scale-[1.02]'
                : 'bg-white dark:bg-[#2A2D35] hover:bg-[#FF4B4B]/20 text-black dark:text-white shadow-[4px_4px_0_#000]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 font-display font-black text-2xl flex items-center justify-center neo-border transition-transform group-hover:scale-105 ${
                  answers[currentQuestion.id] === 'T'
                    ? 'bg-white text-[#FF4B4B]'
                    : 'bg-black text-white'
                }`}
              >
                T
              </div>
              <div className="text-left">
                <span className="block font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                  TIDAK (Kurang Minat)
                </span>
                <span className="text-xs sm:text-sm font-bold text-gray-700 dark:text-zinc-300 block mt-0.5">
                  Saya kurang minat atau tidak pasti mengenainya
                </span>
              </div>
            </div>
            {answers[currentQuestion.id] === 'T' && (
              <X className="w-9 h-9 text-white stroke-[3] shrink-0" />
            )}
          </button>
        </div>

        {/* Navigation & Submit controls - 3D Brutalism */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t-3 border-black dark:border-white">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              id="btn-nav-prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 bg-white dark:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-black dark:text-white font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelum</span>
            </button>

            <button
              type="button"
              id="btn-nav-next"
              onClick={handleNext}
              disabled={currentIndex === totalQuestions - 1}
              className="px-4 py-2.5 bg-white dark:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-black dark:text-white font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5"
            >
              <span>Seterusnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-code font-bold text-gray-600 dark:text-zinc-400 hidden sm:inline">
              Kekunci: Tekan [Y] atau [T]
            </span>

            <button
              type="button"
              id="btn-submit-test-final"
              onClick={handleSubmitTest}
              className="px-6 py-3.5 bg-[#FFE600] hover:bg-[#ebd300] text-black font-display font-black text-sm uppercase neo-btn-3d flex items-center gap-2 shadow-[4px_4px_0_#000]"
            >
              <span>SELESAIKAN & LIHAT KEPUTUSAN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Jump Navigator Grid */}
      <div className="bg-white dark:bg-[#1E2026] neo-border p-4 shadow-[4px_4px_0_#000]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-black text-xs uppercase text-black dark:text-white">
            Peta Soalan 1 hingga {totalQuestions} (Klik untuk lompat terus):
          </h3>
          <div className="flex items-center gap-3 text-[11px] font-mono-code font-black">
            <span className="flex items-center gap-1 text-black dark:text-white">
              <span className="w-3 h-3 bg-[#00E5FF] border border-black inline-block" /> Y (Ya)
            </span>
            <span className="flex items-center gap-1 text-black dark:text-white">
              <span className="w-3 h-3 bg-[#FF4B4B] border border-black inline-block" /> T (Tidak)
            </span>
            <span className="flex items-center gap-1 text-black dark:text-white">
              <span className="w-3 h-3 bg-zinc-200 border border-black inline-block" /> Belum
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-1.5">
          {SIDEK_QUESTIONS.map((q, idx) => {
            const val = answers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setCurrentIndex(idx);
                }}
                className={`py-1.5 text-center font-mono-code text-[11px] font-black border-2 border-black transition-all ${
                  isCurrent
                    ? 'ring-3 ring-[#00E5FF] ring-offset-1 scale-110 z-10'
                    : ''
                } ${
                  val === 'Y'
                    ? 'bg-[#00E5FF] text-black'
                    : val === 'T'
                    ? 'bg-[#FF4B4B] text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white hover:bg-[#FFE600] hover:text-black'
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
