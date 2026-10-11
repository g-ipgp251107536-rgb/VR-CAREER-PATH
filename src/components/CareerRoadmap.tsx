import React, { useState } from 'react';
import { HollandCodeType, StudentProfile } from '../types';
import { HOLLAND_ROADMAPS } from '../data/roadmapData';
import { HOLLAND_CATEGORIES } from '../data/hollandData';
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Compass,
  CheckCircle2,
  School,
  Star,
  Target,
  Lightbulb,
  Users,
  Award,
  Calendar,
  Shield,
  Activity,
} from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

interface CareerRoadmapProps {
  student: StudentProfile;
  initialCategory?: HollandCodeType;
}

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  student,
  initialCategory,
}) => {
  const dominantCode = student.dominantCategory || 'R';

  const [activeCode, setActiveCode] = useState<HollandCodeType>(
    initialCategory || dominantCode
  );

  const [activeStepTab, setActiveStepTab] = useState<number | 'all'>('all');

  const roadmap = HOLLAND_ROADMAPS[activeCode] || HOLLAND_ROADMAPS[dominantCode];
  const activeCategoryMeta = HOLLAND_CATEGORIES[activeCode];

  const stepsToDisplay =
    activeStepTab === 'all'
      ? roadmap.steps
      : roadmap.steps.filter((s) => s.stepNumber === activeStepTab);

  const handleSelectCode = (cat: HollandCodeType) => {
    playClickSound();
    setActiveCode(cat);
    setActiveStepTab('all');
  };

  const handleSelectStep = (step: number | 'all') => {
    playClickSound();
    setActiveStepTab(step);
  };

  return (
    <div className="bg-[#FFFDF7] dark:bg-[#1E2026] neo-border-thick p-6 sm:p-8 neo-shadow-xl space-y-6 transition-colors">
      {/* Header Banner */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b-3 border-black dark:border-white pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="font-mono-code text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase">
              Panduan Hala Tuju Akademik & Kokurikulum (KPM)
            </span>
            {activeCode === dominantCode && (
              <span className="bg-[#00E5FF] text-black border-2 border-black px-2 py-0.5 text-xs font-mono-code font-black">
                KOD DOMINAN
              </span>
            )}
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-black dark:text-white uppercase tracking-tight">
            Pelan Langkah Demi Langkah: Kod {activeCode} ({activeCategoryMeta.name})
          </h2>
          <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 mt-1 max-w-3xl leading-relaxed">
            {roadmap.summary}
          </p>
        </div>

        {/* Dominant vs Code Selector Badges - 3D Brutalism */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs font-mono-code font-black text-gray-700 dark:text-zinc-300">
            Tukar Kod Pilihan:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['R', 'I', 'A', 'S', 'E', 'K'] as HollandCodeType[]).map((cat) => {
              const isDominant = cat === dominantCode;
              const isActive = cat === activeCode;
              const meta = HOLLAND_CATEGORIES[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  id={`btn-roadmap-code-${cat}`}
                  onClick={() => handleSelectCode(cat)}
                  className={`px-3 py-1 text-xs font-mono-code font-black neo-btn-3d ${
                    isActive
                      ? 'bg-black text-[#FFE600] dark:bg-[#FFE600] dark:text-black shadow-[3px_3px_0_#000]'
                      : 'bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-[#00E5FF] hover:text-black'
                  }`}
                  title={`${meta.name} (${cat})`}
                >
                  <span>{cat}</span>
                  {isDominant && <span className="ml-1">*</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Highlight Box: Recommended SPM Stream & Post-SPM Gateways */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 bg-[#FFE600] text-black neo-border p-5 shadow-[4px_4px_0_#000]">
          <div className="flex items-center gap-2 mb-2">
            <School className="w-5 h-5 text-black" />
            <span className="font-display font-black text-xs uppercase text-black">
              CADANGAN PAKEJ ALIRAN SPM:
            </span>
          </div>
          <div className="font-display font-black text-lg text-black bg-white p-3 neo-border shadow-[2px_2px_0_#000]">
            {roadmap.recommendedSPMStream}
          </div>
          <p className="text-xs font-bold text-black/90 mt-2.5">
            Pakej ini dirumus khas untuk memadankan kekuatan kognitif dan minat semula jadi kod {activeCategoryMeta.name}.
          </p>
        </div>

        <div className="md:col-span-7 bg-[#00E5FF] text-black neo-border p-5 shadow-[4px_4px_0_#000]">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-black" />
            <span className="font-display font-black text-xs uppercase text-black">
              LALUAN TERBUKA SELEPAS SPM:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {roadmap.postSpmPathways.map((path, idx) => (
              <div
                key={idx}
                className="bg-white p-2.5 border-2 border-black text-xs font-black text-gray-900 flex items-start gap-2 shadow-[2px_2px_0_#000]"
              >
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span className="leading-snug">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step View Filter Bar - 3D Brutalism Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#121316] p-3.5 neo-border shadow-[3px_3px_0_#000]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-black dark:text-white" />
          <span className="font-display font-black text-xs uppercase text-black dark:text-white">
            PILIHAN PAPARAN PERINGKAT:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            id="btn-step-all"
            onClick={() => handleSelectStep('all')}
            className={`px-3 py-1.5 text-xs font-mono-code font-black neo-btn-3d ${
              activeStepTab === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0_#000]'
                : 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white hover:bg-[#FFE600]'
            }`}
          >
            LIHAT SEMUA (4 LANGKAH)
          </button>
          {[1, 2, 3, 4].map((stepNo) => (
            <button
              key={stepNo}
              type="button"
              id={`btn-step-${stepNo}`}
              onClick={() => handleSelectStep(stepNo)}
              className={`px-3 py-1.5 text-xs font-mono-code font-black neo-btn-3d ${
                activeStepTab === stepNo
                  ? 'bg-[#FFE600] text-black shadow-[2px_2px_0_#000]'
                  : 'bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-[#00E5FF] hover:text-black'
              }`}
            >
              LANGKAH 0{stepNo}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Step-by-Step Roadmap Cards */}
      <div className="space-y-6">
        {stepsToDisplay.map((step) => {
          const isSelectedAlone = activeStepTab === step.stepNumber;
          return (
            <div
              key={step.stepNumber}
              className={`bg-white dark:bg-[#121316] neo-border p-6 sm:p-7 relative transition-all ${
                isSelectedAlone
                  ? 'shadow-[6px_6px_0_#000] ring-4 ring-[#FFE600]'
                  : 'shadow-[4px_4px_0_#000]'
              }`}
            >
              {/* Step Header with numbering & target years */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black dark:border-white pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black text-[#FFE600] dark:bg-white dark:text-black font-display font-black text-xl flex items-center justify-center neo-border shadow-[2px_2px_0_#000]">
                    0{step.stepNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-code font-bold uppercase text-gray-500 dark:text-zinc-400">
                        LANGKAH 0{step.stepNumber} DARI 04
                      </span>
                      <span className="bg-[#00E5FF] text-black font-mono-code text-[11px] font-black px-2 py-0.2 border border-black">
                        {step.targetYears}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight">
                      {step.stageTitle}
                    </h3>
                  </div>
                </div>

                <div className="bg-[#FFF9D2] dark:bg-zinc-800 px-3.5 py-1.5 border-2 border-black dark:border-white font-mono-code text-xs font-black text-black dark:text-white">
                  {step.stageSubtitle}
                </div>
              </div>

              {/* 2-Column Content: Academic Subjects (Left) vs Extracurriculars (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-5">
                {/* Academic Subjects Column */}
                <div className="lg:col-span-6 bg-[#F8FAFC] dark:bg-[#1E2026] p-5 border-2 border-black dark:border-white space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-black dark:text-white" />
                      <h4 className="font-display font-black text-sm uppercase text-black dark:text-white">
                        Mata Pelajaran & Aliran Akademik
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono-code font-black bg-black text-white px-2 py-0.5 border border-white">
                      AKADEMIK
                    </span>
                  </div>

                  {step.academicSubjects.recommendedStream && (
                    <div>
                      <span className="text-xs font-mono-code font-bold text-gray-600 dark:text-zinc-400 block mb-1">
                        Pakej / Aliran Disyorkan:
                      </span>
                      <div className="bg-white dark:bg-[#121316] p-2.5 border-2 border-black dark:border-white text-xs font-black text-black dark:text-white">
                        {step.academicSubjects.recommendedStream}
                      </div>
                    </div>
                  )}

                  {/* Core Subjects List */}
                  <div>
                    <span className="text-xs font-mono-code font-bold text-gray-600 dark:text-zinc-400 block mb-1.5">
                      Mata Pelajaran Teras Fokus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.academicSubjects.coreSubjects.map((subj, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-white dark:bg-[#121316] border-2 border-black dark:border-white px-2.5 py-1 text-xs font-black text-black dark:text-white shadow-[1px_1px_0_#000]"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Focus Electives */}
                  <div>
                    <span className="text-xs font-mono-code font-bold text-gray-600 dark:text-zinc-400 block mb-1.5">
                      Elektif & Bidang Pilihan Strategik:
                    </span>
                    <ul className="space-y-1 text-xs font-semibold text-gray-800 dark:text-zinc-200 bg-white dark:bg-[#121316] p-3 border-2 border-black dark:border-white">
                      {step.academicSubjects.focusElectives.map((elec, eIdx) => (
                        <li key={eIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                          <span>{elec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exam Milestone Target */}
                  <div className="bg-[#FFF9D2] dark:bg-zinc-800 p-3.5 border-2 border-black dark:border-white">
                    <div className="flex items-center gap-1.5 text-xs font-mono-code font-black text-black dark:text-white mb-1">
                      <Target className="w-4 h-4 text-red-600" />
                      <span>SASARAN PENCAPAIAN PEPERIKSAAN:</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 dark:text-zinc-200 leading-relaxed">
                      {step.academicSubjects.examMilestone}
                    </p>
                  </div>
                </div>

                {/* Extracurriculars Column */}
                <div className="lg:col-span-6 bg-[#F0FDF4] dark:bg-[#1E2026] p-5 border-2 border-black dark:border-white space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-2">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-black dark:text-white" />
                      <h4 className="font-display font-black text-sm uppercase text-black dark:text-white">
                        Aktiviti Kokurikulum Sekolah (KPM)
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono-code font-black bg-black text-[#FFE600] px-2 py-0.5 border border-white">
                      KOKURIKULUM
                    </span>
                  </div>

                  {/* Uniform Bodies */}
                  <div>
                    <span className="text-xs font-mono-code font-bold text-gray-700 dark:text-zinc-400 block mb-1">
                      Pasukan Badan Beruniform Sesuai:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.extracurriculars.uniformBodies.map((unit, uIdx) => (
                        <span
                          key={uIdx}
                          className="bg-white dark:bg-[#121316] border-2 border-black dark:border-white px-2.5 py-1 text-xs font-black text-black dark:text-white flex items-center gap-1 shadow-[1px_1px_0_#000]"
                        >
                          <Shield className="w-3.5 h-3.5 text-black dark:text-white" />
                          <span>{unit}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Clubs & Societies */}
                  <div>
                    <span className="text-xs font-mono-code font-bold text-gray-700 dark:text-zinc-400 block mb-1">
                      Kelab & Persatuan Disyorkan:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.extracurriculars.clubsAndSocieties.map((club, cIdx) => (
                        <span
                          key={cIdx}
                          className="bg-white dark:bg-[#121316] border-2 border-black dark:border-white px-2.5 py-1 text-xs font-black text-black dark:text-white flex items-center gap-1 shadow-[1px_1px_0_#000]"
                        >
                          <Users className="w-3.5 h-3.5 text-black dark:text-white" />
                          <span>{club}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sports & Recreation */}
                  <div>
                    <span className="text-xs font-mono-code font-bold text-gray-700 dark:text-zinc-400 block mb-1">
                      Sukan & Permainan Pilihan:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.extracurriculars.sportsAndRecreation.map((sport, spIdx) => (
                        <span
                          key={spIdx}
                          className="bg-white dark:bg-[#121316] border-2 border-black dark:border-white px-2.5 py-1 text-xs font-black text-black dark:text-white flex items-center gap-1 shadow-[1px_1px_0_#000]"
                        >
                          <Activity className="w-3.5 h-3.5 text-black dark:text-white" />
                          <span>{sport}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Competitions & Milestones */}
                  <div className="bg-white dark:bg-[#121316] p-3 border-2 border-black dark:border-white">
                    <span className="text-xs font-mono-code font-black text-black dark:text-white block mb-1.5 flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-black text-black dark:text-white" />
                      Pertandingan & Pencapaian Bakat:
                    </span>
                    <ul className="space-y-1 text-xs font-semibold text-gray-800 dark:text-zinc-300">
                      {step.extracurriculars.competitionsAndMilestones.map((comp, cpIdx) => (
                        <li key={cpIdx} className="flex items-start gap-2">
                          <span className="text-black dark:text-white font-black">•</span>
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Tip Callout Box at bottom of step */}
              <div className="bg-[#FFF9D2] dark:bg-zinc-800 neo-border p-4 flex items-start gap-3 shadow-[3px_3px_0_#000]">
                <div className="w-8 h-8 bg-black text-[#FFE600] flex items-center justify-center neo-border shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-display font-black text-xs uppercase text-black dark:text-white block mb-0.5">
                    Tip Kaunselor Kerjaya:
                  </span>
                  <p className="text-xs font-semibold text-black dark:text-zinc-200 leading-relaxed">
                    {step.proTip}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Action */}
      <div className="bg-[#00E5FF] text-black neo-border p-5 neo-shadow flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-black shrink-0" />
          <div>
            <h4 className="font-display font-black text-base uppercase text-black">
              Perancangan Hala Tuju Pelajar
            </h4>
            <p className="text-xs font-bold text-black/85">
              Bincangkan peta laluan ini bersama Guru Bimbingan & Kaunseling sekolah serta ibu bapa untuk pemilihan pakej mata pelajaran SPM yang tepat.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-code font-black bg-black text-[#FFE600] px-3.5 py-1.5 neo-border">
            KOD HOLLAND: {student.hollandCode}
          </span>
        </div>
      </div>
    </div>
  );
};
