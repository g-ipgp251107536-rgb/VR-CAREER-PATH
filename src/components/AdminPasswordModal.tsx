import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { playClickSound, playChirpSound } from '../utils/soundEffects';

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPasswordModal: React.FC<AdminPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123456') {
      playClickSound();
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      playChirpSound();
      setError(true);
    }
  };

  const handleClose = () => {
    playClickSound();
    setError(false);
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E2026] neo-border-thick neo-shadow-xl text-black dark:text-white my-8">
        {/* Header */}
        <div className="bg-[#FFE600] dark:bg-[#121316] p-4 border-b-3 border-black dark:border-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black text-[#FFE600] flex items-center justify-center neo-border">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-black text-base uppercase text-black dark:text-white tracking-tight">
                Akses Pentadbir & Kaunselor
              </h2>
              <span className="text-[10px] font-mono-code font-bold text-black/80 dark:text-zinc-400 block">
                Kebenaran Kata Laluan Diperlukan
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 bg-white dark:bg-zinc-800 hover:bg-red-500 hover:text-white text-black dark:text-white neo-border flex items-center justify-center font-black"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs font-semibold text-gray-800 dark:text-zinc-300 leading-relaxed">
            Sila masukkan kata laluan pentadbir untuk membuka Papan Pemuka Kaunselor dan melihat data murid.
          </p>

          {error && (
            <div className="p-3 bg-[#FF4B4B] text-white neo-border text-xs font-black flex items-center gap-2 shadow-[2px_2px_0_#000]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Kata laluan tidak sah. Sila semak dan cuba lagi.</span>
            </div>
          )}

          <div>
            <label
              htmlFor="admin-password-input"
              className="block font-display font-black text-xs uppercase mb-1.5 text-black dark:text-white"
            >
              Kata Laluan Pentadbir
            </label>
            <div className="relative">
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Masukkan kata laluan..."
                autoFocus
                className="w-full px-3.5 py-3 pr-10 bg-white dark:bg-[#121316] border-3 border-black dark:border-white text-black dark:text-white font-mono-code font-bold tracking-widest focus:outline-hidden focus:ring-3 focus:ring-[#FFE600] shadow-[3px_3px_0_#000]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                aria-label={showPassword ? 'Sembunyikan kata laluan' : 'Tunjukkan kata laluan'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white font-display font-black text-xs uppercase neo-btn-3d"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#FFE600] hover:bg-[#ffd700] text-black font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5 shadow-[2px_2px_0_#000]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sahkan Masuk</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
