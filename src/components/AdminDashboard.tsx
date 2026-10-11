import React, { useState, useEffect } from 'react';
import { StudentProfile, HollandCodeType } from '../types';
import {
  getAllStudentRecords,
  exportStudentsToCSV,
  clearAllStudentRecords,
  deleteStudentRecord,
} from '../utils/storage';
import {
  subscribeToFirebaseStudents,
  clearAllStudentsFromFirebase,
  deleteStudentFromFirebase,
} from '../lib/firebase';
import { HOLLAND_CATEGORIES } from '../data/hollandData';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  BarChart3,
  Users,
  Download,
  Search,
  RefreshCw,
  Glasses,
  Award,
  Building,
  Trash2,
  Lock,
  Database,
  Wifi,
} from 'lucide-react';
import { playClickSound, playSuccessSound, playChirpSound } from '../utils/soundEffects';

interface AdminDashboardProps {
  onSelectStudentToInspect: (student: StudentProfile) => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onSelectStudentToInspect,
  onExitAdmin,
}) => {
  const [students, setStudents] = useState<StudentProfile[]>(getAllStudentRecords());
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');

  // Modal deletion state (works 100% reliably in iFrames without window.confirm blockage)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'single' | 'all';
    id?: string;
    name?: string;
  } | null>(null);

  // Real-time synchronization with Firebase Realtime Database
  useEffect(() => {
    const unsubscribe = subscribeToFirebaseStudents(
      (firebaseStudents) => {
        setIsFirebaseConnected(true);
        if (firebaseStudents && firebaseStudents.length > 0) {
          setStudents(firebaseStudents);
          try {
            localStorage.setItem('vr_kerjaya_all_students', JSON.stringify(firebaseStudents));
          } catch {
            // ignore localStorage quota warnings
          }
        } else {
          // If Firebase has 0 records, fallback to local or keep empty
          const local = getAllStudentRecords();
          if (local.length > 0) {
            setStudents(local);
          } else {
            setStudents([]);
          }
        }
      },
      (err) => {
        console.warn('Firebase RTDB subscription error:', err);
        setIsFirebaseConnected(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const reloadData = () => {
    playClickSound();
    setStudents(getAllStudentRecords());
  };

  const uniqueSchools = Array.from(new Set(students.map((s) => s.school).filter(Boolean)));

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.school || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.hollandCode || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSchool = selectedSchoolFilter === 'ALL' || s.school === selectedSchoolFilter;
    const matchesCategory =
      selectedCategoryFilter === 'ALL' || s.dominantCategory === selectedCategoryFilter;

    return matchesSearch && matchesSchool && matchesCategory;
  });

  const totalStudents = students.length;
  const completedTests = students.filter((s) => !!s.completedAt).length;
  const vrConnectedCount = students.filter((s) => s.vrConnected).length;

  const categoryCounts: Record<HollandCodeType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, K: 0 };
  let totalScoreSum: Record<HollandCodeType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, K: 0 };

  students.forEach((s) => {
    if (s.dominantCategory) {
      categoryCounts[s.dominantCategory] = (categoryCounts[s.dominantCategory] || 0) + 1;
    }
    if (s.scores) {
      (Object.keys(s.scores) as HollandCodeType[]).forEach((cat) => {
        totalScoreSum[cat] += s.scores[cat] || 0;
      });
    }
  });

  const sortedByFreq = (Object.keys(categoryCounts) as HollandCodeType[]).sort(
    (a, b) => categoryCounts[b] - categoryCounts[a]
  );
  const topDominant = totalStudents > 0 && categoryCounts[sortedByFreq[0]] > 0 ? sortedByFreq[0] : '-';

  const handleExportCSV = () => {
    if (students.length === 0) {
      alert('Tiada data pelajar untuk dieksport buat masa ini.');
      return;
    }
    playSuccessSound();
    const csvData = exportStudentsToCSV(students);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `laporan_inventori_kerjaya_vr_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePromptClearAllData = () => {
    playClickSound();
    if (students.length === 0) {
      alert('Pangkalan data sudah kosong.');
      return;
    }
    setDeleteTarget({ type: 'all' });
  };

  const handlePromptDeleteSingle = (id: string, name: string) => {
    playClickSound();
    setDeleteTarget({ type: 'single', id, name });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    playChirpSound();
    if (deleteTarget.type === 'all') {
      clearAllStudentsFromFirebase().catch((e) => console.warn(e));
      const empty = clearAllStudentRecords();
      setStudents(empty);
    } else if (deleteTarget.type === 'single' && deleteTarget.id) {
      deleteStudentFromFirebase(deleteTarget.id).catch((e) => console.warn(e));
      const updated = deleteStudentRecord(deleteTarget.id);
      setStudents(updated);
    }
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => {
    playClickSound();
    setDeleteTarget(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner: Admin Header & Action Buttons */}
      <div className="bg-[#FFE600] dark:bg-[#1E2026] neo-border-thick p-6 sm:p-8 neo-shadow-lg mb-8 flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-black dark:text-white uppercase tracking-tight">
            Papan Pemuka Inventori Kerjaya VR
          </h1>
          <p className="text-sm font-bold text-black/90 dark:text-zinc-300 mt-1">
            Pantau taburan minat kerjaya RIASEC murid sekolah, status sambungan peranti VR & muat turun laporan rasmi.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black text-[#FFE600] text-[11px] font-mono-code font-bold neo-border shadow-[2px_2px_0_#000]">
              <span className={`w-2 h-2 rounded-full ${isFirebaseConnected ? 'bg-[#00E5FF] animate-pulse' : 'bg-green-400'}`} />
              <Database className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Firebase RTDB: {isFirebaseConnected ? 'Tersambung (Masa-Nyata)' : 'Disegerakkan'}</span>
            </div>
            <span className="text-[11px] font-mono-code font-semibold text-black/70 dark:text-zinc-400 hidden sm:inline">
              vr-kerjaya-database-default-rtdb
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            id="btn-admin-export-csv"
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-[#00E5FF] hover:bg-[#00cbe2] text-black font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Eksport CSV / Excel</span>
          </button>

          <button
            type="button"
            id="btn-admin-clear-all"
            onClick={handlePromptClearAllData}
            className="px-4 py-2.5 bg-[#FF4B4B] hover:bg-[#e03a3a] text-white font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5 shadow-[2px_2px_0_#000]"
            title="Padam dan kosongkan semua rekod data pelajar"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Kosongkan Semua Data</span>
          </button>

          <button
            type="button"
            id="btn-admin-reload-data"
            onClick={reloadData}
            className="p-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white neo-btn-3d"
            title="Segarkan data terkini"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="btn-admin-exit"
            onClick={() => {
              playClickSound();
              onExitAdmin();
            }}
            className="px-4 py-2.5 bg-black text-[#FFE600] font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5 shadow-[3px_3px_0_#000]"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Kunci & Keluar Admin</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards with spacious padding & bold 3D styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#FFE600] text-black neo-border p-6 neo-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-black text-sm uppercase">
              JUMLAH PELAJAR
            </span>
            <Users className="w-6 h-6" />
          </div>
          <div className="font-mono-code font-black text-4xl">
            {totalStudents} <span className="text-base font-bold">Orang</span>
          </div>
          <span className="text-xs font-bold text-gray-900 mt-2 block">
            {completedTests} rekod ujian selesai sepenuhnya
          </span>
        </div>

        <div className="bg-[#00E5FF] text-black neo-border p-6 neo-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-black text-sm uppercase">
              DOMAIN DOMINAN
            </span>
            <Award className="w-6 h-6" />
          </div>
          <div className="font-mono-code font-black text-4xl">
            {topDominant} ({categoryCounts[topDominant] || 0})
          </div>
          <span className="text-xs font-bold text-gray-900 mt-2 block">
            {HOLLAND_CATEGORIES[topDominant]?.name}
          </span>
        </div>

        <div className="bg-[#A3FF2E] text-black neo-border p-6 neo-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-black text-sm uppercase">
              SAMBUNGAN VR
            </span>
            <Glasses className="w-6 h-6" />
          </div>
          <div className="font-mono-code font-black text-4xl">
            {totalStudents > 0 ? Math.round((vrConnectedCount / totalStudents) * 100) : 0}%
          </div>
          <span className="text-xs font-bold text-gray-900 mt-2 block">
            {vrConnectedCount} peranti dipautkan ke sistem VR
          </span>
        </div>

        <div className="bg-white dark:bg-[#1E2026] text-black dark:text-white neo-border p-6 neo-shadow transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-black text-sm uppercase">
              SEKOLAH TERLIBAT
            </span>
            <Building className="w-6 h-6 text-black dark:text-white" />
          </div>
          <div className="font-mono-code font-black text-4xl">
            {uniqueSchools.length} <span className="text-base font-bold">Sekolah</span>
          </div>
          <span className="text-xs font-bold text-gray-700 dark:text-zinc-300 mt-2 block truncate">
            {uniqueSchools.slice(0, 2).join(', ')}
          </span>
        </div>
      </div>

      {/* Taburan Statistik Kod Holland RIASEC */}
      <div className="bg-[#FFFDF7] dark:bg-[#1E2026] neo-border p-6 sm:p-8 neo-shadow mb-8 transition-colors">
        <h2 className="font-display font-black text-xl text-black dark:text-white uppercase mb-5 flex items-center gap-2.5 border-b-2 border-black dark:border-white pb-3">
          <BarChart3 className="w-6 h-6 text-black dark:text-white" />
          Taburan Minat Kerjaya Pelajar Mengikut Kod Holland (RIASEC)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {(['R', 'I', 'A', 'S', 'E', 'K'] as HollandCodeType[]).map((cat) => {
            const info = HOLLAND_CATEGORIES[cat];
            const count = categoryCounts[cat];
            const percent = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
            const avgScore =
              totalStudents > 0 ? (totalScoreSum[cat] / totalStudents).toFixed(1) : '0.0';

            return (
              <div
                key={cat}
                className="p-4 neo-border bg-white dark:bg-[#121316] flex flex-col justify-between shadow-[3px_3px_0_#000]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-8 h-8 neo-border font-display font-black text-base flex items-center justify-center text-black"
                      style={{ backgroundColor: info.color }}
                    >
                      {cat}
                    </span>
                    <span className="text-xs font-mono-code font-black bg-black text-[#FFE600] px-2 py-0.5 border border-white">
                      {percent}%
                    </span>
                  </div>
                  <h3 className="font-display font-black text-sm uppercase truncate text-black dark:text-white">
                    {info.name}
                  </h3>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-mono-code font-bold mb-1 text-black dark:text-zinc-200">
                    Pelajar: <strong className="text-black dark:text-white">{count}</strong>
                  </div>
                  <div className="text-xs font-mono-code text-gray-700 dark:text-zinc-400">
                    Purata Skor: <strong className="text-black dark:text-white">{avgScore}</strong> / 10
                  </div>

                  {/* Visual percentage bar */}
                  <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-black dark:border-white mt-2 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: info.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Records Table & Search */}
      <div className="bg-white dark:bg-[#1E2026] neo-border p-6 sm:p-8 neo-shadow transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b-2 border-black dark:border-white pb-4">
          <div>
            <h2 className="font-display font-black text-xl text-black dark:text-white uppercase">
              Senarai Lengkap Pelajar & Keputusan Ujian
            </h2>
            <p className="text-xs font-bold text-gray-700 dark:text-zinc-300">
              Menunjukkan {filteredStudents.length} daripada {totalStudents} rekod pelajar
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama / sekolah..."
                className="pl-9 pr-3 py-2 text-xs font-bold bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white shadow-[2px_2px_0_#000]"
              />
            </div>

            {/* School filter */}
            <select
              value={selectedSchoolFilter}
              onChange={(e) => {
                playClickSound();
                setSelectedSchoolFilter(e.target.value);
              }}
              className="py-2 px-3 text-xs font-black bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0_#000]"
            >
              <option value="ALL">Semua Sekolah</option>
              {uniqueSchools.map((sch) => (
                <option key={sch} value={sch}>
                  {sch}
                </option>
              ))}
            </select>

            {/* Category filter */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => {
                playClickSound();
                setSelectedCategoryFilter(e.target.value);
              }}
              className="py-2 px-3 text-xs font-black bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0_#000]"
            >
              <option value="ALL">Semua Kod RIASEC</option>
              <option value="R">R - Realistik</option>
              <option value="I">I - Investigatif</option>
              <option value="A">A - Artistik</option>
              <option value="S">S - Sosial</option>
              <option value="E">E - Enterprising</option>
              <option value="K">K - Konvensional</option>
            </select>
          </div>
        </div>

        {/* Data Table with spacious, readable layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-2 border-black dark:border-white text-sm">
            <thead>
              <tr className="bg-[#FFE600] text-black border-b-2 border-black dark:border-white font-display font-black uppercase text-xs sm:text-sm">
                <th className="p-3.5 border-r-2 border-black dark:border-white text-center">No.</th>
                <th className="p-3.5 border-r-2 border-black dark:border-white">Nama Pelajar</th>
                <th className="p-3.5 border-r-2 border-black dark:border-white">Sekolah / Tingkatan</th>
                <th className="p-3.5 border-r-2 border-black dark:border-white">Kod Holland</th>
                <th className="p-3.5 border-r-2 border-black dark:border-white">Skor R-I-A-S-E-K</th>
                <th className="p-3.5 border-r-2 border-black dark:border-white">Status VR & Peranti</th>
                <th className="p-3.5 border-r-2 border-black dark:border-white">Tarikh</th>
                <th className="p-3.5 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black dark:divide-white font-medium text-black dark:text-white">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-gray-700 dark:text-zinc-300 font-bold text-sm">
                    {totalStudents === 0 ? (
                      <div className="py-6 space-y-2">
                        <Users className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="font-display font-black text-base uppercase text-black dark:text-white">
                          Pangkalan Data Pelajar Kosong
                        </p>
                        <p className="text-xs font-semibold max-w-md mx-auto text-gray-600 dark:text-zinc-400">
                          Belum ada data pelajar didaftarkan. Setiap murid yang melengkapkan pendaftaran dan ujian inventori akan disimpan di sini secara automatik.
                        </p>
                      </div>
                    ) : (
                      'Tiada rekod pelajar dijumpai mengikut tapisan semasa.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((std, idx) => (
                  <tr key={std.id} className="hover:bg-yellow-50/70 dark:hover:bg-zinc-800 transition-colors">
                    <td className="p-3.5 border-r-2 border-black dark:border-white font-mono-code font-bold text-center">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 border-r-2 border-black dark:border-white">
                      <span className="font-bold text-black dark:text-white text-sm block uppercase">{std.name}</span>
                      <span className="text-xs font-mono-code text-gray-500 dark:text-zinc-400">{std.id}</span>
                    </td>
                    <td className="p-3.5 border-r-2 border-black dark:border-white">
                      <span className="block font-bold text-sm">{std.school}</span>
                      <span className="text-xs text-gray-600 dark:text-zinc-400">
                        {std.classGrade || '-'}
                      </span>
                    </td>
                    <td className="p-3.5 border-r-2 border-black dark:border-white">
                      <span className="bg-black text-white px-2.5 py-1 font-mono-code font-black text-sm border-2 border-white shadow-[2px_2px_0_#000]">
                        {std.hollandCode || '-'}
                      </span>
                    </td>
                    <td className="p-3.5 border-r-2 border-black dark:border-white font-mono-code text-xs">
                      <div className="flex flex-wrap gap-1 font-black">
                        <span className="text-[#FF4B4B]">R:{std.scores?.R || 0}</span>
                        <span>•</span>
                        <span className="text-blue-500">I:{std.scores?.I || 0}</span>
                        <span>•</span>
                        <span className="text-amber-500">A:{std.scores?.A || 0}</span>
                        <span>•</span>
                        <span className="text-green-500">S:{std.scores?.S || 0}</span>
                        <span>•</span>
                        <span className="text-orange-500">E:{std.scores?.E || 0}</span>
                        <span>•</span>
                        <span className="text-purple-400">K:{std.scores?.K || 0}</span>
                      </div>
                    </td>
                    <td className="p-3.5 border-r-2 border-black dark:border-white">
                      {std.vrConnected ? (
                        <div>
                          <span className="inline-flex items-center gap-1.5 bg-[#A3FF2E] px-2.5 py-1 text-xs font-black border border-black text-black shadow-[1px_1px_0_#000]">
                            <Glasses className="w-3.5 h-3.5" />
                            <span>{std.vrModeUsed === 'split-screen' ? 'VR Dual-Lens' : '360° Gyro'}</span>
                          </span>
                          {std.pairingCode && (
                            <span className="block text-[11px] font-mono-code text-gray-600 dark:text-zinc-300 font-black mt-1">
                              Kod: {std.pairingCode}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs font-mono-code">Belum Sambung</span>
                      )}
                    </td>
                    <td className="p-3.5 border-r-2 border-black dark:border-white text-gray-700 dark:text-zinc-300 font-mono-code text-xs whitespace-nowrap">
                      {std.completedAt || '-'}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          id={`btn-inspect-student-${std.id}`}
                          onClick={() => {
                            playClickSound();
                            onSelectStudentToInspect(std);
                          }}
                          className="px-3 py-1.5 bg-[#FFE600] hover:bg-[#ebd000] text-black font-display font-black text-xs uppercase neo-btn-3d"
                        >
                          Buka Profil
                        </button>
                        <button
                          type="button"
                          id={`btn-delete-student-${std.id}`}
                          onClick={() => handlePromptDeleteSingle(std.id, std.name)}
                          className="p-1.5 bg-white dark:bg-zinc-800 hover:bg-[#FF4B4B] hover:text-white text-black dark:text-white neo-btn-3d flex items-center justify-center transition-colors"
                          title="Padam rekod pelajar ini"
                          aria-label={`Padam rekod ${std.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable in-app deletion confirmation modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title={deleteTarget?.type === 'all' ? 'Kosongkan Semua Data Pelajar' : 'Padam Rekod Pelajar'}
        message={
          deleteTarget?.type === 'all'
            ? 'Adakah anda pasti ingin mengosongkan SEMUA rekod pelajar dalam pangkalan data? Tindakan ini akan memadam semua data secara kekal.'
            : `Adakah anda pasti ingin memadam rekod pelajar ini secara kekal daripada sistem?`
        }
        itemName={
          deleteTarget?.type === 'all'
            ? `${totalStudents} Rekod Pelajar Tersimpan`
            : deleteTarget?.name || deleteTarget?.id
        }
        confirmLabel={deleteTarget?.type === 'all' ? 'Kosongkan Sekarang' : 'Padam Rekod'}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </div>
  );
};
