import React, { useState } from 'react';
import { HollandCodeType, CareerItem, StudentProfile } from '../types';
import {
  HOLLAND_INNOVATION_DATA,
  HollandInnovationData,
} from '../data/hollandInnovationData';
import {
  Glasses,
  ArrowDown,
  Sparkles,
  BookOpen,
  GraduationCap,
  School,
  Building2,
  CheckCircle2,
  Heart,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Bot,
} from 'lucide-react';
import { playClickSound, playChirpSound } from '../utils/soundEffects';
import { CareerAICounselorModal } from './CareerAICounselorModal';

interface HollandPathwayInnovationViewProps {
  student: StudentProfile;
  selectedCategory: HollandCodeType;
  onSelectCategory: (code: HollandCodeType) => void;
  onSelectCareerForVR: (career: CareerItem) => void;
}

export const HollandPathwayInnovationView: React.FC<HollandPathwayInnovationViewProps> = ({
  student,
  selectedCategory,
  onSelectCategory,
  onSelectCareerForVR,
}) => {
  const currentData: HollandInnovationData =
    HOLLAND_INNOVATION_DATA[selectedCategory] || HOLLAND_INNOVATION_DATA.R;

  const [noVideoNoticeJob, setNoVideoNoticeJob] = useState<{
    title: string;
    career: CareerItem;
  } | null>(null);

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiJobTarget, setAiJobTarget] = useState<string | undefined>(undefined);

  const handleOpenAICounselor = (jobTitle?: string) => {
    playClickSound();
    setAiJobTarget(jobTitle);
    setIsAIModalOpen(true);
  };

  // Categories list (RIASEC with K/C)
  const allCodes: HollandCodeType[] = ['R', 'I', 'A', 'S', 'E', 'K'];

  // Rank categories by student's score
  const highestCategory = (Object.keys(student.scores) as HollandCodeType[]).reduce(
    (highest, current) =>
      student.scores[current] > student.scores[highest] ? current : highest,
    'R' as HollandCodeType
  );

  const handleCategoryClick = (cat: HollandCodeType) => {
    playClickSound();
    onSelectCategory(cat);
  };

  const handleLaunchVR = (career: CareerItem, e: React.MouseEvent) => {
    e.stopPropagation();
    playChirpSound();
    onSelectCareerForVR(career);
  };

  const handleJobItemClick = (
    job: { title: string; hasVR: boolean; hasVideo?: boolean; videoUrl?: string; careerData: CareerItem },
    e: React.MouseEvent
  ) => {
    const hasVideo = Boolean(job.hasVideo || job.videoUrl);
    if (hasVideo) {
      handleLaunchVR(job.careerData, e);
    } else {
      playClickSound();
      setNoVideoNoticeJob({ title: job.title, career: job.careerData });
    }
  };

  return (
    <div className="space-y-8 my-6">
      {/* 3D PILL HOLLAND CODE SELECTOR BAR (Skor Tertinggi & Setiap Kod Holland Boleh Ditekan) */}
      <div className="bg-[#FFFDF7] dark:bg-[#1E2026] rounded-[36px] border-3 border-black dark:border-white p-5 sm:p-7 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b-2 border-black/20 dark:border-white/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#FFE600] text-black font-mono-code font-black text-xs border-2 border-black shadow-[2px_2px_0_#000]">
                KOD DOMINAN: {highestCategory}
              </span>
              <span className="text-xs font-mono-code font-bold text-gray-600 dark:text-zinc-300">
                Skor Tertinggi: {student.scores[highestCategory]} / 10
              </span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight mt-1">
              Pilih Kod Holland Untuk Terokai Laluan Kerjaya
            </h2>
          </div>
          <div className="text-xs font-semibold text-gray-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full border-2 border-black dark:border-white shadow-[2px_2px_0_#000]">
            Tekan mana-mana kod di bawah untuk paparan 3D Pill lengkap
          </div>
        </div>

        {/* 6 Holland Code 3D Pill Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {allCodes.map((code) => {
            const data = HOLLAND_INNOVATION_DATA[code];
            const score = student.scores[code] ?? 0;
            const isSelected = selectedCategory === code;
            const isHighest = highestCategory === code;

            return (
              <button
                key={code}
                type="button"
                id={`btn-innov-holland-${code}`}
                onClick={() => handleCategoryClick(code)}
                className={`relative p-3.5 rounded-[26px] border-3 transition-all cursor-pointer flex flex-col justify-between text-left active:translate-x-0.5 active:translate-y-0.5 ${
                  isSelected
                    ? 'border-black dark:border-white bg-[#FFE600] text-black shadow-[5px_5px_0_#000] -translate-y-1'
                    : 'border-black dark:border-white bg-white dark:bg-[#121316] text-black dark:text-white hover:bg-yellow-50 dark:hover:bg-zinc-800 shadow-[3px_3px_0_#000]'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div
                    className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-display font-black text-base shadow-[2px_2px_0_#000]"
                    style={{ backgroundColor: data.themeColor, color: code === 'A' ? '#000' : '#fff' }}
                  >
                    {data.emoji}
                  </div>
                  {isHighest && (
                    <span className="rounded-full bg-black text-[#FFE600] text-[9px] font-mono-code font-black px-2 py-0.5 border border-white">
                      TERTINGGI
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="font-display font-black text-xs sm:text-sm uppercase truncate mb-2">
                  {code === 'K' ? 'C – CONVENTIONAL' : `${code} – ${data.name.split(' ')[0]}`}
                </div>

                {/* Score Pill */}
                <div className="mt-auto">
                  <div className="flex items-baseline justify-between text-xs mb-1">
                    <span className="font-mono-code font-bold opacity-80 text-[10px]">Skor:</span>
                    <span className="font-mono-code font-black text-base">
                      {score} <span className="text-[10px] opacity-70">/ 10</span>
                    </span>
                  </div>
                  {/* Mini Progress Pill */}
                  <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-zinc-700 border-2 border-black dark:border-white overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(10, (score / 10) * 100)}%`,
                        backgroundColor: isSelected ? '#000' : data.themeColor,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOP SECTION: 2 COLUMNS (LAKARAN IMG_1111) */}
      {/* LEFT BOX: MAKSUD, CIRI-CIRI, SUKA | RIGHT BOX: JENIS PEKERJAAN & BUTANG -(VR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* KOTAK KIRI (3D Pill Shape): MAKSUD, CIRI-CIRI & SUKA */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="h-full bg-[#FFFDF7] dark:bg-[#1E2026] rounded-[34px] border-3 border-black dark:border-white p-6 sm:p-7 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] flex flex-col justify-between transition-colors">
            <div>
              {/* Header Pill */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-12 h-12 rounded-full border-2.5 border-black flex items-center justify-center font-display font-black text-xl shadow-[3px_3px_0_#000]"
                  style={{ backgroundColor: currentData.themeColor, color: currentData.code === 'A' ? '#000' : '#fff' }}
                >
                  {currentData.emoji}
                </span>
                <div>
                  <span className="rounded-full bg-black text-[#FFE600] px-3 py-0.5 text-[11px] font-mono-code font-black border border-white inline-block mb-0.5">
                    {currentData.codeLetter}
                  </span>
                  <h3 className="font-display font-black text-lg sm:text-xl text-black dark:text-white uppercase leading-tight">
                    {currentData.fieldTitle}
                  </h3>
                </div>
              </div>

              {/* Maksud Bidang Pill Card */}
              <div className="mb-5 bg-white dark:bg-[#121316] rounded-[24px] border-2.5 border-black dark:border-white p-4.5 shadow-[3px_3px_0_#000]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] border border-black" />
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-black dark:text-white">
                    Maksud Bidang
                  </h4>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-zinc-200 leading-relaxed">
                  {currentData.maksudBidang}
                </p>
              </div>

              {/* Ciri-Ciri Pill Card */}
              <div className="mb-5 bg-white dark:bg-[#121316] rounded-[24px] border-2.5 border-black dark:border-white p-4.5 shadow-[3px_3px_0_#000]">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black" />
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-black dark:text-white">
                    Ciri - Ciri Personaliti
                  </h4>
                </div>
                <ul className="space-y-2">
                  {currentData.ciriCiri.map((ciri, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-800 dark:text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ciri}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bahagian "Suka" (Sesuai untuk murid yang suka...) */}
            <div className="bg-[#FFE600] text-black rounded-[24px] border-2.5 border-black p-4.5 shadow-[4px_4px_0_#000] mt-2">
              <div className="flex items-center gap-2 mb-1.5 font-display font-black text-xs uppercase">
                <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                <span>Sesuai Untuk Murid Yang...</span>
              </div>
              <div className="text-xs sm:text-sm font-bold leading-relaxed bg-white/90 p-3 rounded-[18px] border-2 border-black">
                <span className="font-black text-black uppercase">Suka: </span>
                <span className="text-gray-900">{currentData.suka}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KOTAK KANAN (3D Pill Shape): JENIS PEKERJAAN & BUTANG -(VR) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="h-full bg-[#00E5FF] dark:bg-[#1E2026] rounded-[34px] border-3 border-black dark:border-white p-6 sm:p-7 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] flex flex-col justify-between transition-colors">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b-2 border-black pb-4">
                <div>
                  <span className="rounded-full bg-black text-[#00E5FF] px-3 py-0.5 text-[11px] font-mono-code font-black border border-white inline-block mb-1">
                    LALUAN KERJAYA
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight">
                    Jenis Pekerjaan
                  </h3>
                </div>

                {/* Video Status Indicator Legend */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981] text-white text-[11px] font-mono-code font-black border-2 border-black shadow-[2px_2px_0_#000]">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Hijau: Ada Video VR</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4B4B] text-white text-[11px] font-mono-code font-black border-2 border-black shadow-[2px_2px_0_#000]">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>Merah: Tiada Video (x)</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-bold text-black/90 dark:text-zinc-200 mb-4 bg-white/80 dark:bg-zinc-900/80 p-3 rounded-full border-2 border-black dark:border-white shadow-[2px_2px_0_#000] px-5">
                Tekan mana-mana kerjaya atau butang <strong>-(VR)</strong>. Butang <strong>Hijau</strong> sedia ditonton, butang <strong>Merah</strong> dalam pembangunan:
              </p>

              {/* Grid of Jobs with 3D Pill Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentData.pekerjaanList.map((job, idx) => {
                  const hasVideo = Boolean(job.hasVideo || job.videoUrl);

                  return (
                    <div
                      key={idx}
                      onClick={(e) => handleJobItemClick(job, e)}
                      className="group p-3 sm:p-3.5 rounded-full border-2.5 border-black dark:border-white transition-all cursor-pointer flex items-center justify-between gap-2.5 bg-white dark:bg-[#121316] text-black dark:text-white hover:bg-yellow-50 dark:hover:bg-zinc-800 shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5"
                    >
                      {/* Job Title & Indicator Dot */}
                      <div className="flex items-center gap-2.5 pl-2 truncate min-w-0 flex-1">
                        <span
                          className={`w-3 h-3 rounded-full border border-black shrink-0 ${
                            hasVideo ? 'bg-[#10B981]' : 'bg-[#FF4B4B]'
                          }`}
                          title={hasVideo ? 'Video VR tersedia' : 'Video VR belum ada (x)'}
                        />
                        <span className="font-display font-black text-xs sm:text-sm uppercase truncate">
                          {job.title}
                        </span>
                      </div>

                      {/* Action Buttons: Tanya AI & -(VR) */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          id={`btn-ai-job-${currentData.code}-${idx}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenAICounselor(job.title);
                          }}
                          title={`Tanya Cikgu AI tentang kerjaya ${job.title}`}
                          className="px-2.5 py-1.5 rounded-full bg-[#00E5FF] hover:bg-[#00c5dc] text-black font-mono-code font-black text-xs border-2 border-black shadow-[2px_2px_0_#000] flex items-center gap-1 shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Tanya AI</span>
                        </button>

                        {/* 3D PILL -(VR) BUTTON (Hijau jika ada video, Merah jika tiada video x) */}
                        {job.hasVR && (
                          <button
                            type="button"
                            id={`btn-vr-job-${currentData.code}-${idx}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJobItemClick(job, e);
                            }}
                            title={
                              hasVideo
                                ? `Tonton video POV VR untuk ${job.title} (Video Tersedia)`
                                : `Video VR untuk ${job.title} sedang dalam penyediaan (x)`
                            }
                            className={`px-3.5 py-1.5 rounded-full text-white font-mono-code font-black text-xs border-2 border-black shadow-[2px_2px_0_#000] flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
                              hasVideo
                                ? 'bg-[#10B981] hover:bg-[#059669]'
                                : 'bg-[#FF4B4B] hover:bg-[#e03a3a]'
                            }`}
                          >
                            <Glasses className="w-3.5 h-3.5 text-white" />
                            <span>-(VR)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* INTERACTIVE AI COUNSELOR BANNER */}
              <div className="mt-4 p-4 rounded-[26px] bg-[#FFE600] dark:bg-[#1E2026] border-2.5 border-black dark:border-white shadow-[3px_3px_0_#000] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-[#00E5FF] border-2 border-white flex items-center justify-center shrink-0 shadow-[2px_2px_0_#000]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xs sm:text-sm text-black dark:text-white uppercase leading-snug">
                      Kurang Jelas atau Mahu Tahu Lebih Mendalam?
                    </h4>
                    <p className="text-[11px] sm:text-xs font-bold text-black/80 dark:text-zinc-300">
                      Tanya Cikgu Kaunselor AI tentang subjek SPM, syarat universiti, dan prospek kerjaya!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  id={`btn-ask-ai-${currentData.code}`}
                  onClick={() => handleOpenAICounselor(undefined)}
                  className="px-4 py-2 rounded-full bg-black text-[#FFE600] font-display font-black text-xs uppercase border-2 border-white shadow-[2px_2px_0_#000] flex items-center gap-1.5 hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Tanya Cikgu AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PERKARA YANG DIPELAJARI (3D PILL CONTAINER - TANPA NOMBOR) */}
      <div className="bg-[#FFFDF7] dark:bg-[#1E2026] rounded-[34px] border-3 border-black dark:border-white p-6 sm:p-8 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b-2 border-black/20 dark:border-white/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#FFE600] border-2 border-black flex items-center justify-center font-display font-black shadow-[2px_2px_0_#000]">
              <BookOpen className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="rounded-full bg-black text-[#FFE600] px-2.5 py-0.5 text-[10px] font-mono-code font-bold border border-white">
                MODUL & KEMAHIRAN
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight">
                Perkara Yang Dipelajari
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono-code font-bold text-gray-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-3.5 py-1.5 rounded-full border-2 border-black dark:border-white shadow-[2px_2px_0_#000]">
            Bidang Asas
          </span>
        </div>

        {/* 3D Pill Grid of learned items (Tiada nombor - berbentuk 3D Pill melengkung) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {currentData.perkaraDipelajari.map((perkara, idx) => (
            <div
              key={idx}
              className="p-3.5 px-4 rounded-full bg-white dark:bg-[#121316] border-2.5 border-black dark:border-white shadow-[3px_3px_0_#000] flex items-center gap-3 transition-transform hover:-translate-y-0.5"
            >
              <span className="w-3 h-3 rounded-full bg-[#00E5FF] border-2 border-black shadow-[1.5px_1.5px_0_#000] shrink-0" />
              <span className="font-display font-black text-xs sm:text-sm text-black dark:text-white uppercase truncate">
                {perkara}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: PERINGKAT PENDIDIKAN BERTINGKAT DENGAN ANAK PANAH (LAKARAN IMG_1113) */}
      <div className="space-y-4">
        {/* (A) PERINGKAT MENENGAH ATAS (3D PILL CONTAINER) */}
        <div className="bg-[#FFFDF7] dark:bg-[#1E2026] rounded-[34px] border-3 border-black dark:border-white p-6 sm:p-8 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#00E5FF] border-2 border-black flex items-center justify-center font-display font-black shadow-[2px_2px_0_#000]">
                <School className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="rounded-full bg-black text-white px-2.5 py-0.5 text-[10px] font-mono-code font-bold border border-white">
                  LANGKAH 1
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight">
                  Peringkat Menengah Atas
                </h3>
              </div>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[#FFE600] text-black font-display font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0_#000]">
              {currentData.menengahAtas.title}
            </span>
          </div>

          <p className="text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-4">
            Pakej mata pelajaran elektif Tingkatan 4 dan 5 di sekolah menengah (KPM / TVET) yang disyorkan:
          </p>

          {/* Subjects 3D Pills */}
          <div className="flex flex-wrap gap-2.5">
            {currentData.menengahAtas.subjects.map((subjek, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-white dark:bg-[#121316] text-black dark:text-white font-display font-black text-xs sm:text-sm uppercase border-2.5 border-black dark:border-white shadow-[3px_3px_0_#000] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF4B4B]" />
                <span>{subjek}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 3D PILL DOWN ARROW INDICATOR (↓) */}
        <div className="flex justify-center items-center py-1">
          <div className="w-12 h-12 rounded-full border-3 border-black bg-[#FFE600] flex items-center justify-center shadow-[4px_4px_0_#000] animate-bounce">
            <ArrowDown className="w-6 h-6 text-black stroke-[3]" />
          </div>
        </div>

        {/* (B) PERINGKAT LEPASAN SPM (3D PILL CONTAINER: ASASI, MATRIKULASI & DIPLOMA) */}
        <div className="bg-[#FFFDF7] dark:bg-[#1E2026] rounded-[34px] border-3 border-black dark:border-white p-6 sm:p-8 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] transition-colors">
          <div className="flex items-center gap-2.5 mb-5 border-b-2 border-black/20 dark:border-white/20 pb-3">
            <div className="w-10 h-10 rounded-full bg-[#FFE600] border-2 border-black flex items-center justify-center font-display font-black shadow-[2px_2px_0_#000]">
              <GraduationCap className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="rounded-full bg-black text-[#FFE600] px-2.5 py-0.5 text-[10px] font-mono-code font-bold border border-white">
                LANGKAH 2
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight">
                Peringkat Lepasan SPM
              </h3>
            </div>
          </div>

          {/* Sub-columns in 3D Pill Cards: Asasi/Matrikulasi & Diploma */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Asasi / Matrikulasi */}
            <div className="bg-white dark:bg-[#121316] rounded-[28px] border-2.5 border-black dark:border-white p-5 shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2 mb-3.5">
                <span className="w-3 h-3 rounded-full bg-[#00E5FF] border border-black" />
                <h4 className="font-display font-black text-sm sm:text-base uppercase text-black dark:text-white">
                  Asasi / Matrikulasi
                </h4>
              </div>
              <ul className="space-y-2.5">
                {currentData.lepasanSpm.asasiMatrikulasi.map((prog, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 px-3.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-white font-display font-bold text-xs text-black dark:text-white flex items-center gap-2 shadow-[2px_2px_0_#000]"
                  >
                    <ChevronRight className="w-4 h-4 text-[#FF4B4B] shrink-0" />
                    <span>{prog}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diploma */}
            <div className="bg-white dark:bg-[#121316] rounded-[28px] border-2.5 border-black dark:border-white p-5 shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2 mb-3.5">
                <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-black" />
                <h4 className="font-display font-black text-sm sm:text-base uppercase text-black dark:text-white">
                  Diploma
                </h4>
              </div>
              <ul className="space-y-2.5">
                {currentData.lepasanSpm.diploma.map((prog, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 px-3.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-white font-display font-bold text-xs text-black dark:text-white flex items-center gap-2 shadow-[2px_2px_0_#000]"
                  >
                    <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{prog}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* (C) KOTAK CONTOH UNIVERSITI (3D PILL CONTAINER AS SHOWN IN IMG_1113) */}
          <div className="bg-[#FFE600] text-black rounded-[28px] sm:rounded-full border-2.5 border-black p-4 sm:px-7 shadow-[4px_4px_0_#000] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-black shrink-0" />
              <span className="font-display font-black text-xs sm:text-sm uppercase">
                Cth Universiti:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {currentData.contohUniversiti.map((uni, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white text-black font-mono-code font-black text-xs border-2 border-black shadow-[2px_2px_0_#000]"
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3D PILL DOWN ARROW INDICATOR (↓) */}
        <div className="flex justify-center items-center py-1">
          <div className="w-12 h-12 rounded-full border-3 border-black bg-[#00E5FF] flex items-center justify-center shadow-[4px_4px_0_#000] animate-bounce">
            <ArrowDown className="w-6 h-6 text-black stroke-[3]" />
          </div>
        </div>

        {/* (D) PERINGKAT DEGREE (3D PILL CONTAINER AS SHOWN IN IMG_1113) */}
        <div className="bg-[#FFFDF7] dark:bg-[#1E2026] rounded-[34px] border-3 border-black dark:border-white p-6 sm:p-8 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b-2 border-black/20 dark:border-white/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#FF4B4B] text-white border-2 border-black flex items-center justify-center font-display font-black shadow-[2px_2px_0_#000]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="rounded-full bg-black text-white px-2.5 py-0.5 text-[10px] font-mono-code font-bold border border-white">
                  LANGKAH 3
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight">
                  Peringkat Degree (Ijazah Sarjana Muda)
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono-code font-bold text-gray-600 dark:text-zinc-300">
              Ijazah Universiti Awam & Swasta
            </span>
          </div>

          <p className="text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-4">
            Program Ijazah Sarjana Muda yang relevan untuk mencapai kelayakan profesional dalam bidang ini:
          </p>

          {/* Grid of Degree programs in 3D Pill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentData.degree.map((prog, idx) => (
              <div
                key={idx}
                className="p-3.5 px-4 rounded-full bg-white dark:bg-[#121316] border-2.5 border-black dark:border-white shadow-[3px_3px_0_#000] flex items-center gap-2.5 transition-transform hover:-translate-y-0.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shrink-0 border border-black" />
                <span className="font-display font-black text-xs sm:text-sm text-black dark:text-white uppercase truncate">
                  {prog}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP MODAL: MAKLUMAN VIDEO VR DALAM PEMBANGUNAN (TANDA X) */}
      {noVideoNoticeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFDF7] dark:bg-[#1E2026] rounded-[32px] border-3 border-black dark:border-white p-6 max-w-md w-full shadow-[8px_8px_0_#000] dark:shadow-[8px_8px_0_#FFF] animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FF4B4B] border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0_#000]">
                <Glasses className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF4B4B] text-white text-[10px] font-mono-code font-black border border-black shadow-[1px_1px_0_#000]">
                  STATUS: TIADA VIDEO (x)
                </span>
                <h3 className="font-display font-black text-lg text-black dark:text-white uppercase leading-tight mt-1">
                  {noVideoNoticeJob.title}
                </h3>
              </div>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-zinc-200 mb-5 leading-relaxed bg-white dark:bg-zinc-900 p-4 rounded-[22px] border-2 border-black dark:border-white shadow-[2px_2px_0_#000]">
              <p className="mb-2">
                Simulasi video VR POV bagi kerjaya <strong>{noVideoNoticeJob.title}</strong> ditandakan <strong>(x)</strong> dan sedang dalam proses penyediaan.
              </p>
              <div className="p-2.5 rounded-[16px] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                Tip: Pilih kerjaya yang mempunyai butang VR berwarna <strong>HIJAU</strong> untuk menonton video rakaman POV secara langsung!
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setNoVideoNoticeJob(null)}
                className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 text-black dark:text-white font-display font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0_#000] cursor-pointer hover:bg-gray-100"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetTitle = noVideoNoticeJob.title;
                  setNoVideoNoticeJob(null);
                  handleOpenAICounselor(targetTitle);
                }}
                className="px-4 py-2 rounded-full bg-[#FFE600] hover:bg-yellow-400 text-black font-display font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0_#000] cursor-pointer flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Tanya Cikgu AI</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  const target = noVideoNoticeJob.career;
                  setNoVideoNoticeJob(null);
                  handleLaunchVR(target, e);
                }}
                className="px-4 py-2 rounded-full bg-[#00E5FF] hover:bg-[#00cce6] text-black font-display font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0_#000] cursor-pointer"
              >
                Teroka Simulasi 360°
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI CAREER COUNSELOR MODAL */}
      <CareerAICounselorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        student={student}
        activeHollandCode={selectedCategory}
        activeCareerTitle={aiJobTarget}
      />
    </div>
  );
};
