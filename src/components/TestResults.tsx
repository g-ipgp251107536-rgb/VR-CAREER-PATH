import React, { useState } from 'react';
import { StudentProfile, HollandCodeType, CareerItem } from '../types';
import { HollandPathwayInnovationView } from './HollandPathwayInnovationView';
import { CareerRoadmap } from './CareerRoadmap';
import {
  Printer,
  RotateCcw,
  Sparkles,
  Map,
  Compass,
} from 'lucide-react';
import { playClickSound, playChirpSound } from '../utils/soundEffects';

interface TestResultsProps {
  student: StudentProfile;
  onSelectCareerForVR: (career: CareerItem) => void;
  onRetakeTest: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({
  student,
  onSelectCareerForVR,
  onRetakeTest,
}) => {
  // Default selected category is the student's dominant code (e.g. 'R')
  const [selectedCategory, setSelectedCategory] = useState<HollandCodeType>(
    student.dominantCategory || 'R'
  );

  // Tab to optionally show extra KPM extra-curricular roadmap
  const [showKpmRoadmap, setShowKpmRoadmap] = useState(false);

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleCategorySelect = (cat: HollandCodeType) => {
    playClickSound();
    setSelectedCategory(cat);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* TOP BANNER: 3D PILL DESIGN (CURVED EDGES, NO SHARP CORNERS) */}
      <div className="bg-[#FFE600] dark:bg-[#1E2026] rounded-[36px] border-3 border-black dark:border-white p-6 sm:p-8 shadow-[6px_6px_0_#000] dark:shadow-[6px_6px_0_#FFF] mb-6 relative transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black/25 dark:border-white/20 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3.5 py-1 rounded-full bg-black text-[#FFE600] font-mono-code font-black text-xs border border-white shadow-[2px_2px_0_#000]">
                HASIL UJIAN SELESAI
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-black font-mono-code font-black text-xs border-2 border-black shadow-[2px_2px_0_#000]">
                DOMINAN: {student.dominantCategory}
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-black dark:text-white uppercase tracking-tight">
              PROFIL KOD HOLLAND:{' '}
              <span className="bg-black text-white px-4 py-1 rounded-full inline-block border-2 border-white shadow-[3px_3px_0_#000]">
                {student.hollandCode}
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-bold text-black/90 dark:text-zinc-300 mt-1.5">
              Pelajar: <strong className="text-black dark:text-white uppercase">{student.name}</strong> • Sekolah:{' '}
              <strong className="text-black dark:text-white">{student.school}</strong> ({student.classGrade || 'Tingkatan 4'})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              id="btn-print-slip"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-full bg-white dark:bg-zinc-800 hover:bg-gray-100 text-black dark:text-white font-display font-black text-xs uppercase border-2.5 border-black dark:border-white shadow-[3px_3px_0_#000] flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Slip Keputusan</span>
            </button>

            <button
              type="button"
              id="btn-retake-test"
              onClick={() => {
                playClickSound();
                onRetakeTest();
              }}
              className="px-4 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-[#FFE600] font-display font-black text-xs uppercase border-2.5 border-white shadow-[3px_3px_0_#000] flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#FFE600]" />
              <span>Uji Semula</span>
            </button>
          </div>
        </div>

        {/* View Toggle Bar (Inovasi Laluan vs Peta Kokurikulum) */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-black dark:text-[#FFE600]" />
            <span className="font-display font-black text-xs sm:text-sm uppercase text-black dark:text-white">
              Laluan Kerjaya 3D Pill & Pendidikan KPM
            </span>
          </div>

          <button
            type="button"
            id="btn-toggle-kpm-roadmap"
            onClick={() => {
              playClickSound();
              setShowKpmRoadmap(!showKpmRoadmap);
            }}
            className={`px-4 py-2 rounded-full font-display font-black text-xs uppercase border-2 border-black transition-all flex items-center gap-2 shadow-[2px_2px_0_#000] cursor-pointer ${
              showKpmRoadmap
                ? 'bg-black text-[#FFE600]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-yellow-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>
              {showKpmRoadmap
                ? 'Tutup Panduan Kokurikulum Tambahan'
                : 'Lihat Panduan Kokurikulum & Kelab KPM'}
            </span>
          </button>
        </div>
      </div>

      {/* INOVASI LALUAN KERJAYA 3D PILL (BERDASARKAN LAKARAN LALUAN KERJAYA IMG_1111 & IMG_1113) */}
      <HollandPathwayInnovationView
        student={student}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        onSelectCareerForVR={onSelectCareerForVR}
      />

      {/* OPTIONAL KPM CO-CURRICULAR ROADMAP (JIKA DIPERLUKAN MURID/GURU) */}
      {showKpmRoadmap && (
        <div className="mt-10 pt-6 border-t-3 border-black dark:border-white">
          <div className="mb-4">
            <h3 className="font-display font-black text-2xl text-black dark:text-white uppercase">
              Panduan Aktiviti Kokurikulum, Badan Beruniform & Kelab (KPM)
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-zinc-300 font-semibold">
              Rujukan pelan persediaan kokurikulum untuk memaksimumkan markah PAJSK sekolah menengah.
            </p>
          </div>
          <div className="rounded-[34px] overflow-hidden border-3 border-black dark:border-white shadow-[6px_6px_0_#000]">
            <CareerRoadmap student={student} initialCategory={selectedCategory} />
          </div>
        </div>
      )}
    </div>
  );
};
