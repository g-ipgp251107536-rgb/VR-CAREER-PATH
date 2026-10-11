import React from 'react';
import { ActiveTab, StudentProfile } from '../types';
import {
  Compass,
  Glasses,
  BarChart3,
  Award,
  UserCheck,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { playClickSound, playToggleSound } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentStudent: StudentProfile | null;
  onOpenVRModal: () => void;
  onOpenAdmin: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentStudent,
  onOpenVRModal,
  onOpenAdmin,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
}) => {
  const isComplete = currentStudent?.completedAt;

  const handleNavClick = (tab: ActiveTab) => {
    playClickSound();
    setActiveTab(tab);
  };

  const handleSoundToggle = () => {
    onToggleSound();
    playToggleSound();
  };

  const handleThemeToggle = () => {
    onToggleTheme();
    playToggleSound();
  };

  const handleVRClick = () => {
    playClickSound();
    onOpenVRModal();
  };

  const handleAdminClick = () => {
    playClickSound();
    onOpenAdmin();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFE600] dark:bg-[#1E2026] border-b-4 border-black dark:border-white px-3 sm:px-5 py-3 shadow-[0_4px_0_#000] transition-colors duration-150">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo and Brand in 3D Neobrutalism */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => handleNavClick('login')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-[#00E5FF] neo-border flex items-center justify-center font-black text-black text-xl shadow-[3px_3px_0_#000] group-hover:rotate-6 transition-transform">
              <Glasses className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl md:text-2xl tracking-tight text-black dark:text-white uppercase">
                  VR KERJAYA
                </span>
                <span className="bg-black text-[#FFE600] text-[10px] font-mono-code font-black px-1.5 py-0.5 neo-border border-white">
                  SIDEK v2.0
                </span>
              </div>
              <p className="text-[11px] font-bold text-black/80 dark:text-gray-300 hidden sm:block">
                Inventori Minat Kerjaya Holland + Realiti Maya 360°
              </p>
            </div>
          </div>
        </div>

        {/* Center / Navigation Tabs - 3D Brutalism Buttons */}
        <nav className="flex items-center gap-2 overflow-x-auto py-1 max-w-full" aria-label="Navigasi Utama">
          <button
            id="nav-tab-login"
            onClick={() => handleNavClick('login')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-display font-black neo-btn-3d flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'login'
                ? 'bg-black text-[#FFE600] dark:bg-[#FFE600] dark:text-black shadow-[3px_3px_0_#000]'
                : 'bg-white dark:bg-[#2A2D35] text-black dark:text-white hover:bg-[#00E5FF] hover:text-black'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>1. Profil & VR</span>
          </button>

          <button
            id="nav-tab-test"
            onClick={() => {
              if (!currentStudent?.name) {
                handleNavClick('login');
              } else {
                handleNavClick('test');
              }
            }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-display font-black neo-btn-3d flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'test'
                ? 'bg-black text-[#FFE600] dark:bg-[#FFE600] dark:text-black shadow-[3px_3px_0_#000]'
                : 'bg-white dark:bg-[#2A2D35] text-black dark:text-white hover:bg-[#00E5FF] hover:text-black'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>2. Soalan Ujian</span>
          </button>

          <button
            id="nav-tab-results"
            onClick={() => {
              if (!isComplete) {
                handleNavClick('test');
              } else {
                handleNavClick('results');
              }
            }}
            className={`px-3 py-1.5 text-xs sm:text-sm font-display font-black neo-btn-3d flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'results'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[3px_3px_0_#000]'
                : isComplete
                ? 'bg-[#00E5FF] text-black hover:bg-[#FFE600]'
                : 'bg-gray-200 dark:bg-zinc-800 text-gray-500 cursor-not-allowed border-gray-400 opacity-60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>3. Keputusan Holland</span>
          </button>

          <button
            id="nav-tab-vr"
            onClick={() => handleNavClick('vr')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-display font-black neo-btn-3d flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'vr'
                ? 'bg-[#FF4B4B] text-white shadow-[3px_3px_0_#000]'
                : 'bg-[#FFE600] text-black hover:bg-[#00E5FF]'
            }`}
          >
            <Glasses className="w-4 h-4" />
            <span>4. Teroka VR 360°</span>
          </button>
        </nav>

        {/* Right action controls: Audio Toggle, Dark Mode Toggle, VR Status & Admin Mode */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer ON/OFF */}
          <button
            id="header-btn-sound-toggle"
            type="button"
            onClick={handleSoundToggle}
            className={`p-2 neo-btn-3d text-xs font-mono-code font-bold ${
              soundEnabled
                ? 'bg-[#00E5FF] text-black shadow-[3px_3px_0_#000]'
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 line-through shadow-[2px_2px_0_#000]'
            }`}
            title={soundEnabled ? 'Kesan Bunyi: HIDUP (Klik untuk Matikan)' : 'Kesan Bunyi: MATI (Klik untuk Hidupkan)'}
            aria-label="Togol Kesan Bunyi"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="header-btn-theme-toggle"
            type="button"
            onClick={handleThemeToggle}
            className={`p-2 neo-btn-3d text-xs font-mono-code font-bold ${
              isDark
                ? 'bg-[#FFE600] text-black shadow-[3px_3px_0_#000]'
                : 'bg-black text-[#FFE600] shadow-[3px_3px_0_#000]'
            }`}
            title={isDark ? 'Tukar ke Mod Cerah (Light Mode)' : 'Tukar ke Mod Gelap (Dark Mode)'}
            aria-label="Togol Mod Gelap"
          >
            {isDark ? <Sun className="w-4 h-4 text-black" /> : <Moon className="w-4 h-4 text-[#FFE600]" />}
          </button>

          {/* VR Status Button */}
          <button
            id="header-btn-vr-status"
            onClick={handleVRClick}
            className={`px-2.5 py-1.5 text-xs font-mono-code font-black neo-btn-3d flex items-center gap-1.5 ${
              currentStudent?.vrConnected
                ? 'bg-[#A3FF2E] text-black'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-[#FFE600] hover:text-black'
            }`}
            title="Konfigurasi Sambungan Peranti VR"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${currentStudent?.vrConnected ? 'bg-green-600 animate-ping' : 'bg-red-500'}`} />
            <span className="hidden sm:inline">
              {currentStudent?.vrConnected ? 'VR READY' : 'CONNECT VR'}
            </span>
            <Glasses className="w-3.5 h-3.5" />
          </button>

          {/* Admin Mode Toggle */}
          <button
            id="header-btn-admin"
            onClick={handleAdminClick}
            className={`px-2.5 py-1.5 text-xs font-display font-black neo-btn-3d flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[3px_3px_0_#000]'
                : 'bg-[#B388FF] text-black hover:bg-[#a272fc]'
            }`}
            title="Mod Guru Kaunseling / Admin Dashboard"
          >
            <BarChart3 className="w-4 h-4" />
            <span>ADMIN</span>
          </button>
        </div>
      </div>

      {/* Student indicator strip if logged in */}
      {currentStudent?.name && (
        <div className="max-w-7xl mx-auto mt-2 pt-1 border-t-2 border-black/20 dark:border-white/20 flex items-center justify-between text-xs font-bold text-black dark:text-zinc-200 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-black text-[#FFE600] px-2 py-0.5 text-[11px] font-mono-code font-black border border-black dark:border-white">
              PELAJAR:
            </span>
            <span className="font-black text-black dark:text-white uppercase">{currentStudent.name}</span>
            <span className="text-black/70 dark:text-zinc-400 font-semibold">({currentStudent.school} - {currentStudent.classGrade || 'Tingkatan 4'})</span>
          </div>

          {currentStudent.hollandCode && (
            <div className="flex items-center gap-1.5">
              <span className="bg-white dark:bg-zinc-800 text-black dark:text-white px-2.5 py-0.5 neo-border text-[11px] font-mono-code font-black shadow-[2px_2px_0_#000]">
                KOD RIASEC: <strong className="text-black dark:text-white underline">{currentStudent.hollandCode}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
