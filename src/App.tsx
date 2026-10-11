import React, { useState, useEffect } from 'react';
import { ActiveTab, CareerItem, StudentProfile } from './types';
import { getCurrentStudent, saveCurrentStudent } from './utils/storage';
import { HOLLAND_CATEGORIES } from './data/hollandData';
import { Header } from './components/Header';
import { LoginVRSetup } from './components/LoginVRSetup';
import { CareerTest } from './components/CareerTest';
import { TestResults } from './components/TestResults';
import { VRPlayer } from './components/VRPlayer';
import { AdminDashboard } from './components/AdminDashboard';
import { VRDeviceModal } from './components/VRDeviceModal';
import { AdminPasswordModal } from './components/AdminPasswordModal';
import { CareerAICounselorModal } from './components/CareerAICounselorModal';
import { Bot } from 'lucide-react';
import {
  isSoundEnabled,
  setSoundEnabled,
  playClickSound,
  playSuccessSound,
} from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('login');
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(() =>
    getCurrentStudent()
  );
  const [isVRModalOpen, setIsVRModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isGlobalAIModalOpen, setIsGlobalAIModalOpen] = useState(false);

  // Dark mode state persisted in localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('vr_theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sound effects state persisted in localStorage
  const [soundActive, setSoundActive] = useState<boolean>(() => isSoundEnabled());

  // Default selected career: Mechanical Engineer (Realistik)
  const [selectedCareer, setSelectedCareer] = useState<CareerItem>(
    HOLLAND_CATEGORIES.R.careers[0]
  );

  // Sync dark class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vr_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vr_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
  };

  // Auto initialize student profile if none exists
  useEffect(() => {
    if (!currentStudent) {
      const initial: StudentProfile = {
        id: `std-${Date.now()}`,
        name: '',
        school: '',
        classGrade: '',
        scores: { R: 0, I: 0, A: 0, S: 0, E: 0, K: 0 },
        hollandCode: '',
        dominantCategory: 'R',
        exploredCareers: [],
        vrConnected: false,
        vrModeUsed: 'panoramic',
      };
      setCurrentStudent(initial);
    }
  }, []);

  const handleSaveStudent = (student: StudentProfile) => {
    setCurrentStudent(student);
    saveCurrentStudent(student);
  };

  const handleStartTest = () => {
    playClickSound();
    setActiveTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteTest = (updatedStudent: StudentProfile) => {
    handleSaveStudent(updatedStudent);
    playSuccessSound();
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCareerForVR = (career: CareerItem) => {
    playClickSound();
    setSelectedCareer(career);
    if (currentStudent) {
      const updatedExplored = Array.from(
        new Set([...(currentStudent.exploredCareers || []), career.id])
      );
      handleSaveStudent({
        ...currentStudent,
        exploredCareers: updatedExplored,
      });
    }
    setActiveTab('vr');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateVRStatus = (connected: boolean, mode: 'split-screen' | 'panoramic') => {
    if (currentStudent) {
      const updated: StudentProfile = {
        ...currentStudent,
        vrConnected: connected,
        vrModeUsed: mode,
      };
      handleSaveStudent(updated);
    }
  };

  const handleSelectStudentToInspect = (student: StudentProfile) => {
    playClickSound();
    setCurrentStudent(student);
    const dom = student.dominantCategory || 'R';
    setSelectedCareer(HOLLAND_CATEGORIES[dom]?.careers[0] || HOLLAND_CATEGORIES.R.careers[0]);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    playClickSound();
    if (isAdminAuthenticated) {
      setActiveTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleAdminPasswordSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsPasswordModalOpen(false);
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    playClickSound();
    setIsAdminAuthenticated(false);
    setActiveTab('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] dark:bg-[#121316] text-[#121212] dark:text-[#F4F4F5] selection:bg-[#00E5FF] selection:text-black transition-colors duration-200">
      {/* Neobrutalist Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'admin') {
            handleOpenAdmin();
          } else {
            setActiveTab(tab);
          }
        }}
        currentStudent={currentStudent}
        onOpenVRModal={() => {
          playClickSound();
          setIsVRModalOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* Main App Content Body */}
      <main className="flex-1 transition-colors duration-200">
        {activeTab === 'login' && (
          <LoginVRSetup
            currentStudent={currentStudent}
            onSaveStudent={handleSaveStudent}
            onStartTest={handleStartTest}
            onOpenVRModal={() => {
              playClickSound();
              setIsVRModalOpen(true);
            }}
          />
        )}

        {activeTab === 'test' && currentStudent && (
          <CareerTest
            currentStudent={currentStudent}
            onCompleteTest={handleCompleteTest}
            onBackToProfile={() => {
              playClickSound();
              setActiveTab('login');
            }}
          />
        )}

        {activeTab === 'results' && currentStudent && (
          <TestResults
            student={currentStudent}
            onSelectCareerForVR={handleSelectCareerForVR}
            onRetakeTest={() => {
              playClickSound();
              setActiveTab('test');
            }}
          />
        )}

        {activeTab === 'vr' && (
          <VRPlayer
            selectedCareer={selectedCareer}
            student={currentStudent}
            onBackToResults={() => {
              playClickSound();
              setActiveTab('results');
            }}
            onSelectAnotherCareer={(career) => {
              playClickSound();
              setSelectedCareer(career);
            }}
            onOpenVRSettings={() => {
              playClickSound();
              setIsVRModalOpen(true);
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            onSelectStudentToInspect={handleSelectStudentToInspect}
            onExitAdmin={handleExitAdmin}
          />
        )}
      </main>

      {/* Admin Password Verification Modal */}
      <AdminPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handleAdminPasswordSuccess}
      />

      {/* VR Connection & Gyroscope Calibration Modal */}
      <VRDeviceModal
        isOpen={isVRModalOpen}
        onClose={() => {
          playClickSound();
          setIsVRModalOpen(false);
        }}
        student={currentStudent}
        onUpdateVRStatus={handleUpdateVRStatus}
      />

      {/* Neobrutalist Footer */}
      <footer className="border-t-4 border-black dark:border-white bg-[#FFE600] dark:bg-[#1E2026] text-black dark:text-white py-6 px-4 mt-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#00E5FF] border border-black dark:border-white inline-block"></span>
              <span className="font-display font-black text-sm text-black dark:text-white uppercase block tracking-tight">
                INVENTORI KERJAYA VR (SIDEK RIASEC MALAYSIA)
              </span>
            </div>
            <span className="text-black/80 dark:text-zinc-400 font-bold block mt-0.5">
              Sistem Bimbingan & Kaunseling Kerjaya KPM Berteknologi Realiti Maya 360°
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsVRModalOpen(true);
              }}
              className="px-3 py-1 bg-white dark:bg-zinc-800 text-black dark:text-white neo-btn-3d text-[11px] font-black"
            >
              SAMBUNG VR CARDBOARD
            </button>
            <button
              type="button"
              onClick={handleOpenAdmin}
              className="px-3 py-1 bg-[#00E5FF] text-black neo-btn-3d text-[11px] font-black"
            >
              MOD KAUNSELOR (ADMIN)
            </button>
          </div>
        </div>
      </footer>

      {/* Floating AI Career Counselor Button (Visible on student view tabs) */}
      {activeTab !== 'admin' && (
        <button
          type="button"
          id="btn-global-ai-counselor"
          onClick={() => {
            playClickSound();
            setIsGlobalAIModalOpen(true);
          }}
          title="Tanya Cikgu Kaunselor AI Kerjaya"
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#00E5FF] hover:bg-[#00cae2] text-black font-display font-black text-xs sm:text-sm uppercase border-3 border-black shadow-[4px_4px_0_#000] flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-black text-[#FFE600] flex items-center justify-center border border-white">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono-code font-black tracking-tight">TANYA CIKGU AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-black animate-pulse" />
        </button>
      )}

      {/* Global AI Counselor Modal */}
      <CareerAICounselorModal
        isOpen={isGlobalAIModalOpen}
        onClose={() => setIsGlobalAIModalOpen(false)}
        student={currentStudent}
        activeHollandCode={currentStudent?.dominantCategory || 'R'}
        activeCareerTitle={selectedCareer?.title}
      />
    </div>
  );
}
