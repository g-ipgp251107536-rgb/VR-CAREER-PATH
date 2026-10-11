import React, { useState } from 'react';
import { StudentProfile } from '../types';
import {
  Glasses,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { playClickSound, playChirpSound } from '../utils/soundEffects';

interface LoginVRSetupProps {
  currentStudent: StudentProfile | null;
  onSaveStudent: (student: StudentProfile) => void;
  onStartTest: () => void;
  onOpenVRModal: () => void;
}

export const LoginVRSetup: React.FC<LoginVRSetupProps> = ({
  currentStudent,
  onSaveStudent,
  onStartTest,
  onOpenVRModal,
}) => {
  const [name, setName] = useState(currentStudent?.name || '');
  const [school, setSchool] = useState(currentStudent?.school || '');
  const [classGrade, setClassGrade] = useState(currentStudent?.classGrade || '');
  const [errorMessage, setErrorMessage] = useState('');

  const isVRConnected = !!currentStudent?.vrConnected;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Sila masukkan Nama Penuh Pelajar.');
      return;
    }
    if (!school.trim()) {
      setErrorMessage('Sila masukkan Nama Sekolah.');
      return;
    }
    if (!classGrade.trim()) {
      setErrorMessage('Sila pilih Tingkatan / Peringkat Pengajian.');
      return;
    }

    playClickSound();

    const updatedProfile: StudentProfile = {
      id: currentStudent?.id || `std-${Date.now()}`,
      name: name.trim(),
      school: school.trim(),
      classGrade: classGrade.trim(),
      scores: currentStudent?.scores || { R: 0, I: 0, A: 0, S: 0, E: 0, K: 0 },
      hollandCode: currentStudent?.hollandCode || '',
      dominantCategory: currentStudent?.dominantCategory || 'R',
      exploredCareers: currentStudent?.exploredCareers || [],
      vrConnected: isVRConnected,
      vrModeUsed: currentStudent?.vrModeUsed || 'panoramic',
      completedAt: currentStudent?.completedAt,
    };

    onSaveStudent(updatedProfile);
    setErrorMessage('');
    onStartTest();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Neobrutalist Hero Banner - Cyan & Gold Dominated */}
      <div className="bg-[#FFE600] dark:bg-[#1E2026] neo-border-thick p-6 sm:p-8 neo-shadow-lg mb-8 relative transition-colors">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-black dark:text-white uppercase tracking-tight leading-tight mb-4">
          Teroka Kerjaya Masa Depan Dalam VR
        </h1>

        <p className="text-black/90 dark:text-zinc-200 font-semibold text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
          Jawab ujian inventori psikometri kerjaya berasaskan model Holland (RIASEC), kenal pasti potensi diri, dan alami simulasi kerjaya sebenar di Malaysia secara visual 360° bersesuaian dengan aspirasi murid sekolah menengah dan lepasan SPM.
        </p>

        {/* 4 Pillars of Experience */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white dark:bg-[#121316] p-4 neo-border text-center shadow-[3px_3px_0_#000]">
            <span className="block font-display font-black text-xl text-black dark:text-white">60 Soalan</span>
            <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">Inventori Asal Sidek</span>
          </div>
          <div className="bg-[#00E5FF] p-4 neo-border text-center shadow-[3px_3px_0_#000] text-black">
            <span className="block font-display font-black text-xl">Kod Holland</span>
            <span className="text-xs font-bold text-black/80">Analisis 3 Huruf</span>
          </div>
          <div className="bg-white dark:bg-[#121316] p-4 neo-border text-center shadow-[3px_3px_0_#000]">
            <span className="block font-display font-black text-xl text-black dark:text-white">Peta SPM</span>
            <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">Subjek & Kokurikulum</span>
          </div>
          <div className="bg-[#FFE600] p-4 neo-border text-center shadow-[3px_3px_0_#000] text-black">
            <span className="block font-display font-black text-xl">VR 360°</span>
            <span className="text-xs font-bold text-black/80">Cardboard & Telefon</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Student Info Form & VR Device Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Student Login Form */}
        <div className="lg:col-span-7 bg-[#FFFDF7] dark:bg-[#1E2026] neo-border p-6 neo-shadow">
          <div className="flex items-center gap-2 mb-4 border-b-3 border-black dark:border-white pb-3">
            <div className="w-8 h-8 bg-[#00E5FF] border-2 border-black flex items-center justify-center font-black text-black">
              1
            </div>
            <h2 className="font-display font-black text-xl text-black dark:text-white uppercase tracking-tight">
              Pendaftaran Maklumat Pelajar
            </h2>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-[#FF4B4B] text-white neo-border flex items-center gap-2 text-xs font-black shadow-[3px_3px_0_#000]">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="input-student-name"
                className="block font-display font-black text-xs uppercase mb-1.5 text-black dark:text-white"
              >
                Nama Penuh Pelajar <span className="text-red-500">*</span>
              </label>
              <input
                id="input-student-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama penuh pelajar..."
                className="w-full px-3.5 py-3 bg-white dark:bg-[#121316] border-3 border-black dark:border-white text-black dark:text-white font-bold placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:ring-[#00E5FF] shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_#00E5FF]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="input-student-school"
                className="block font-display font-black text-xs uppercase mb-1.5 text-black dark:text-white"
              >
                Nama Sekolah <span className="text-red-500">*</span>
              </label>
              <input
                id="input-student-school"
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Masukkan nama sekolah..."
                className="w-full px-3.5 py-3 bg-white dark:bg-[#121316] border-3 border-black dark:border-white text-black dark:text-white font-bold placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:ring-[#00E5FF] shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_#00E5FF]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="select-student-grade"
                className="block font-display font-black text-xs uppercase mb-1.5 text-black dark:text-white"
              >
                Tingkatan / Peringkat Pengajian <span className="text-red-500">*</span>
              </label>
              <select
                id="select-student-grade"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                required
                className="w-full px-3.5 py-3 bg-white dark:bg-[#121316] border-3 border-black dark:border-white text-black dark:text-white font-bold focus:outline-hidden focus:ring-3 focus:ring-[#00E5FF] shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_#00E5FF]"
              >
                <option value="" disabled>-- Sila Pilih Tingkatan --</option>
                <option value="Tingkatan 1">Tingkatan 1</option>
                <option value="Tingkatan 2">Tingkatan 2</option>
                <option value="Tingkatan 3">Tingkatan 3 (PBD / Tingkatan Rendah)</option>
                <option value="Tingkatan 4">Tingkatan 4 (Pemilihan Pakej STEM/Sastera)</option>
                <option value="Tingkatan 5">Tingkatan 5 (Calon SPM)</option>
                <option value="Tingkatan 6 / Pra-U">Tingkatan 6 / STPM / Matrikulasi</option>
                <option value="Kolej Vokasional / TVET">Kolej Vokasional / TVET</option>
                <option value="Lepasan Sekolah / Umum">Lepasan Sekolah / Terbuka</option>
              </select>
            </div>

            {/* 3D Brutalist Submit Button */}
            <div className="pt-3">
              <button
                id="btn-submit-login-start"
                type="submit"
                className="w-full py-4 bg-[#FFE600] hover:bg-[#ffd700] text-black font-display font-black text-base uppercase neo-btn-3d-lg flex items-center justify-center gap-2 group transition-all"
              >
                <span>MULA UJIAN INVENTORI SEKARANG</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: VR Device Display & Guidance */}
        <div className="lg:col-span-5 space-y-5">
          {/* VR Device Display Card */}
          <div className="bg-[#00E5FF] dark:bg-[#1E2026] neo-border p-6 neo-shadow">
            <div className="flex items-center justify-between mb-3 border-b-3 border-black dark:border-white pb-2.5">
              <div className="flex items-center gap-2">
                <Glasses className="w-5 h-5 text-black dark:text-white" />
                <h2 className="font-display font-black text-lg text-black dark:text-white uppercase tracking-tight">
                  Sambungan Peranti VR
                </h2>
              </div>
              <span
                className={`text-[10px] font-mono-code font-black px-2 py-0.5 border-2 border-black dark:border-white ${
                  isVRConnected
                    ? 'bg-[#A3FF2E] text-black'
                    : 'bg-[#FFE600] text-black'
                }`}
              >
                {isVRConnected ? 'DISAMBUNG' : 'PERLU SAMBUNG'}
              </span>
            </div>

            <p className="text-xs font-bold text-black/90 dark:text-zinc-200 leading-relaxed mb-4">
              Pautkan telefon pintar anda dengan peranti VR (seperti Google Cardboard atau VR Box) bagi membolehkan paparan stereoskopik 360° dan sensor giroskop.
            </p>

            {/* Connection Preview Box */}
            <div className="bg-white dark:bg-[#121316] neo-border p-4 mb-4 shadow-[3px_3px_0_#000]">
              <div className="flex items-center justify-between text-xs font-mono-code font-black mb-2 text-black dark:text-white">
                <span>STATUS SENSOR TELEFON:</span>
                <span className={isVRConnected ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}>
                  {isVRConnected ? 'AKTIF' : 'BELUM DIKESAN'}
                </span>
              </div>
              <div className="text-xs text-gray-800 dark:text-zinc-300 font-semibold">
                {isVRConnected ? (
                  <div className="flex items-center gap-1.5 text-green-800 dark:text-green-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Peranti sedia! Kod nombor berasingan telah dipadankan.</span>
                  </div>
                ) : (
                  <span>Tekan butang di bawah untuk membuka konsol padanan kod dan mengaktifkan mod VR.</span>
                )}
              </div>
            </div>

            {/* 3D Brutalist VR Connect Button */}
            <button
              id="btn-open-vr-display-connect"
              type="button"
              onClick={() => {
                playChirpSound();
                onOpenVRModal();
              }}
              className="w-full py-3.5 bg-black dark:bg-[#FFE600] hover:bg-neutral-800 dark:hover:bg-[#f5dd00] text-[#FFE600] dark:text-black font-display font-black text-sm uppercase neo-btn-3d flex items-center justify-center gap-2.5 transition-all shadow-[4px_4px_0_#000]"
            >
              <Glasses className="w-5 h-5 text-[#FFE600] dark:text-black" />
              <span>{isVRConnected ? 'Urus & Padan Peranti VR' : 'Sambung Peranti VR (Telefon)'}</span>
            </button>
          </div>

          {/* Quick Guidance Card */}
          <div className="bg-white dark:bg-[#1E2026] neo-border p-5 shadow-[4px_4px_0_#000]">
            <h3 className="font-display font-black text-xs uppercase mb-2.5 text-black dark:text-white">
              Panduan Ujian Kerjaya Pelajar:
            </h3>
            <ol className="text-xs text-black/90 dark:text-zinc-200 space-y-2 list-decimal list-inside font-semibold leading-relaxed">
              <li>Lengkapkan nama dan sekolah anda.</li>
              <li>Pautkan telefon pintar menggunakan <span className="bg-[#FFE600] text-black px-1 font-black">Paparan VR</span>.</li>
              <li>Jawab 60 soalan minit kerjaya (pilih <span className="font-black bg-[#00E5FF] text-black px-1.5 py-0.5">YA</span> atau <span className="font-black bg-[#FF4B4B] text-white px-1.5 py-0.5">TIDAK</span>).</li>
              <li>Dapatkan 3 Kod Holland dominan & Peta Laluan Akademik SPM.</li>
              <li>Tonton simulasi realiti maya 360° bagi kerjaya pilihan anda di Malaysia.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
