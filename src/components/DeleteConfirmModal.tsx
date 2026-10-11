import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemName?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  message,
  itemName,
  confirmLabel = 'Padam Rekod',
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E2026] neo-border-thick neo-shadow-xl text-black dark:text-white my-8">
        {/* Header */}
        <div className="bg-[#FF4B4B] text-white p-4 border-b-3 border-black dark:border-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black text-[#FF4B4B] flex items-center justify-center neo-border">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="delete-dialog-title"
                className="font-display font-black text-base uppercase tracking-tight text-white"
              >
                {title}
              </h2>
              <span className="text-[10px] font-mono-code font-bold text-white/90 block">
                Tindakan Tidak Boleh Diundur
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 bg-black hover:bg-white hover:text-black text-white neo-border flex items-center justify-center font-black transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 leading-relaxed">
            {message}
          </p>

          {itemName && (
            <div className="p-3 bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-white font-mono-code text-xs font-bold text-black dark:text-white break-words">
              <span className="text-gray-500 dark:text-zinc-400 block text-[10px] uppercase mb-0.5">
                Item Dipilih:
              </span>
              {itemName}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-black dark:text-white font-display font-black text-xs uppercase neo-btn-3d"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 bg-[#FF4B4B] hover:bg-[#e03a3a] text-white font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5 shadow-[2px_2px_0_#000]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{confirmLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
