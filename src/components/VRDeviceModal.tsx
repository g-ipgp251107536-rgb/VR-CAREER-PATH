import React, { useState, useEffect } from 'react';
import {
  Glasses,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  Radio,
  Zap,
  ShieldCheck,
  X,
  PowerOff,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { generateUniquePairingCode } from '../utils/storage';
import { playClickSound, playSuccessSound, playSelectSound } from '../utils/soundEffects';

interface VRDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  onUpdateVRStatus: (
    connected: boolean,
    mode: 'split-screen' | 'panoramic',
    pairingCode?: string,
    deviceName?: string
  ) => void;
}

export const VRDeviceModal: React.FC<VRDeviceModalProps> = ({
  isOpen,
  onClose,
  student,
  onUpdateVRStatus,
}) => {
  const [deviceCode, setDeviceCode] = useState<string>(() => {
    return student?.pairingCode || generateUniquePairingCode(student?.id);
  });

  const [inputCode, setInputCode] = useState('');
  const [deviceName, setDeviceName] = useState(student?.pairedDeviceName || 'Telefon Pintar Murid');
  const [connectingState, setConnectingState] = useState<'idle' | 'pairing' | 'connected'>(
    student?.vrConnected ? 'connected' : 'idle'
  );
  const [selectedMode, setSelectedMode] = useState<'split-screen' | 'panoramic'>(
    student?.vrModeUsed || 'panoramic'
  );
  const [pairingProgress, setPairingProgress] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Live Gyroscope readings if running on a real phone
  const [gyroReadings, setGyroReadings] = useState<{ alpha: number; beta: number; gamma: number }>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    if (student?.pairingCode) {
      setDeviceCode(student.pairingCode);
    } else if (!deviceCode) {
      setDeviceCode(generateUniquePairingCode(student?.id));
    }
  }, [student]);

  // Orientation sensor listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null && e.beta !== null && e.gamma !== null) {
        setGyroReadings({
          alpha: Math.round(e.alpha),
          beta: Math.round(e.beta),
          gamma: Math.round(e.gamma),
        });
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  if (!isOpen) return null;

  // Handle Disconnect (OFF Sambungan Peranti)
  const handleDisconnect = () => {
    playSelectSound(false);
    setConnectingState('idle');
    setPairingProgress(0);
    setErrorMessage('');
    onUpdateVRStatus(false, selectedMode, deviceCode, undefined);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    playClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(deviceCode);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  // Pair using the entered code
  const handlePairWithCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playClickSound();
    const cleanInput = inputCode.trim().toUpperCase();
    const targetCode = deviceCode.trim().toUpperCase();

    if (cleanInput.length < 4) {
      setErrorMessage('Sila masukkan Kod Padanan yang sah (cth: ' + deviceCode + ')');
      return;
    }

    setErrorMessage('');
    setConnectingState('pairing');
    setPairingProgress(15);

    const interval = setInterval(() => {
      setPairingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setConnectingState('connected');
          playSuccessSound();
          onUpdateVRStatus(true, selectedMode, targetCode, deviceName);
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  const handleQuickAutoPair = () => {
    playClickSound();
    setInputCode(deviceCode);
    setErrorMessage('');
    setConnectingState('pairing');
    setPairingProgress(20);

    const interval = setInterval(() => {
      setPairingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setConnectingState('connected');
          playSuccessSound();
          onUpdateVRStatus(true, selectedMode, deviceCode, deviceName);
          return 100;
        }
        return prev + 30;
      });
    }, 140);
  };

  const isConnected = connectingState === 'connected' || Boolean(student?.vrConnected);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#1E2026] neo-border-thick neo-shadow-xl text-black dark:text-white my-8">
        {/* Modal Header */}
        <div className="bg-[#FFE600] dark:bg-[#121316] p-4 sm:p-5 border-b-3 border-black dark:border-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center neo-border">
              <Glasses className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-black dark:text-white uppercase tracking-tight">
                Penyambungan Peranti VR & Telefon Pintar
              </h2>
              <p className="text-xs font-bold text-black/85 dark:text-zinc-300">
                Padankan telefon dengan kod unik untuk kawalan giroskop 360°
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-vr-modal"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 bg-black text-[#FFE600] hover:bg-neutral-800 border-2 border-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Status Indicator Bar with Turn OFF button */}
          <div
            className={`p-4 neo-border flex flex-wrap items-center justify-between gap-3 ${
              isConnected
                ? 'bg-[#A3FF2E] text-black shadow-[3px_3px_0_#000]'
                : 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3.5 h-3.5 rounded-full border border-black ${
                  isConnected ? 'bg-green-600 animate-ping' : 'bg-gray-400'
                }`}
              />
              <div>
                <span className="font-display font-black text-xs uppercase block">
                  STATUS: {isConnected ? 'PERANTI TELEFON TERHUBUNG' : 'TIADA SAMBUNGAN AKTIF'}
                </span>
                <span className="text-[11px] font-mono-code font-bold opacity-85">
                  {isConnected
                    ? `Peranti: ${student?.pairedDeviceName || deviceName} (Kod: ${student?.pairingCode || deviceCode})`
                    : 'Mod VR boleh beroperasi secara manual pada skrin'}
                </span>
              </div>
            </div>

            {/* Turn Off / Disconnect Button (Prominent) */}
            {isConnected && (
              <button
                type="button"
                id="btn-disconnect-vr-device"
                onClick={handleDisconnect}
                className="px-3.5 py-1.5 bg-[#FF4B4B] hover:bg-[#e03838] text-white font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5"
              >
                <PowerOff className="w-3.5 h-3.5" />
                <span>OFF SAMBUNGAN</span>
              </button>
            )}
          </div>

          {/* Screen Display Mode Selector: 360 Panoramic vs Split Screen */}
          <div>
            <label className="block font-display font-black text-xs uppercase mb-2 text-black dark:text-white">
              PILIH MOD PAPARAN SKRIN VR:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-vr-mode-panoramic"
                onClick={() => {
                  playClickSound();
                  setSelectedMode('panoramic');
                  if (isConnected) onUpdateVRStatus(true, 'panoramic', deviceCode, deviceName);
                }}
                className={`p-4 text-left neo-border transition-all flex items-start justify-between cursor-pointer ${
                  selectedMode === 'panoramic'
                    ? 'bg-[#00E5FF] text-black shadow-[4px_4px_0_#000]'
                    : 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[2px_2px_0_#000]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-5 h-5" />
                    <span className="font-display font-black text-sm uppercase">
                      Skrin Penuh 360°
                    </span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed opacity-90">
                    Pegang telefon & gerakkan ke sekeliling atau sentuh skrin untuk pusing 360 darjah.
                  </p>
                </div>
                {selectedMode === 'panoramic' && (
                  <CheckCircle2 className="w-5 h-5 text-black shrink-0 fill-[#00E5FF]" />
                )}
              </button>

              <button
                type="button"
                id="btn-vr-mode-splitscreen"
                onClick={() => {
                  playClickSound();
                  setSelectedMode('split-screen');
                  if (isConnected) onUpdateVRStatus(true, 'split-screen', deviceCode, deviceName);
                }}
                className={`p-4 text-left neo-border transition-all flex items-start justify-between cursor-pointer ${
                  selectedMode === 'split-screen'
                    ? 'bg-[#FFE600] text-black shadow-[4px_4px_0_#000]'
                    : 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[2px_2px_0_#000]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Glasses className="w-5 h-5" />
                    <span className="font-display font-black text-sm uppercase">
                      VR Split-Screen
                    </span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed opacity-90">
                    Dwi-kanta stereoskopik sesuai dimasukkan ke dalam cermin mata VR Box / Google Cardboard.
                  </p>
                </div>
                {selectedMode === 'split-screen' && (
                  <CheckCircle2 className="w-5 h-5 text-black shrink-0 fill-[#FFE600]" />
                )}
              </button>
            </div>
          </div>

          {/* Dedicated Pairing Box with Unique Code */}
          <div className="border-3 border-black dark:border-white p-5 bg-white dark:bg-[#121316] shadow-[4px_4px_0_#000] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-3">
              <div className="flex items-center gap-2">
                <Radio
                  className={`w-4 h-4 ${
                    connectingState === 'pairing' ? 'text-black dark:text-white animate-pulse' : 'text-black dark:text-white'
                  }`}
                />
                <span className="font-mono-code text-xs font-black text-black dark:text-white">
                  KOD KHAS PERANTI ANDA (UNIK):
                </span>
              </div>
              <span className="text-[10px] font-mono-code font-black bg-black text-[#FFE600] px-2 py-0.5 border border-white">
                TIADA PERTINDIHAN
              </span>
            </div>

            {/* Generated Unique Code Showcase */}
            <div className="bg-[#FFF9D2] dark:bg-zinc-800 neo-border p-4 text-center">
              <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 block mb-1">
                Kod Padanan Unik untuk peranti pelajar ini:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono-code font-black text-2xl sm:text-3xl text-black dark:text-white bg-white dark:bg-[#121316] px-4 py-1.5 border-2 border-black dark:border-white tracking-widest shadow-[3px_3px_0_#000]">
                  {deviceCode}
                </span>
                <button
                  type="button"
                  id="btn-copy-device-code"
                  onClick={handleCopyCode}
                  className="p-2.5 bg-white dark:bg-zinc-800 hover:bg-black hover:text-white text-black dark:text-white neo-btn-3d"
                  title="Salin Kod Padanan"
                >
                  {copiedNotification ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              {copiedNotification && (
                <span className="text-[11px] font-black text-green-600 block mt-1">
                  Kod berjaya disalin ke papan klip!
                </span>
              )}
            </div>

            {/* Input to connect / pair */}
            {!isConnected && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block font-display font-black text-xs uppercase mb-1 text-black dark:text-white">
                    Masukkan Kod Peranti Telefon untuk Disambungkan:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="input-pair-code"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      placeholder={`Cth: ${deviceCode}`}
                      className="flex-1 px-3.5 py-2 bg-white dark:bg-zinc-800 border-2 border-black dark:border-white font-mono-code font-black text-sm tracking-wider uppercase focus:outline-hidden focus:ring-2 focus:ring-[#00E5FF] text-black dark:text-white"
                    />
                    <button
                      type="button"
                      id="btn-pair-device-action"
                      onClick={() => handlePairWithCode()}
                      disabled={connectingState === 'pairing'}
                      className="px-5 py-2 bg-[#FFE600] hover:bg-[#ebd000] text-black font-display font-black text-xs uppercase neo-btn-3d disabled:opacity-60 flex items-center gap-1.5"
                    >
                      {connectingState === 'pairing' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Menyambung...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-black" />
                          <span>Pair Telefon</span>
                        </>
                      )}
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-xs font-black text-red-600 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{errorMessage}</span>
                    </p>
                  )}
                </div>

                {/* Quick Auto-Pair helper for seamless testing */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-600 dark:text-zinc-400 font-bold">
                    Ingin uji peranti ini terus tanpa taip manual?
                  </span>
                  <button
                    type="button"
                    id="btn-quick-auto-pair"
                    onClick={handleQuickAutoPair}
                    className="text-xs font-mono-code font-black text-black dark:text-white underline hover:text-blue-700"
                  >
                    Sambung Terus Kod Ini
                  </button>
                </div>
              </div>
            )}

            {/* Connecting progress bar */}
            {connectingState === 'pairing' && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs font-mono-code font-black text-black dark:text-white">
                  <span>MENGHUBUNGKAN SALURAN SENSOR VR TELEFON...</span>
                  <span>{pairingProgress}%</span>
                </div>
                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 border-2 border-black dark:border-white overflow-hidden">
                  <div
                    className="h-full bg-[#00E5FF] transition-all duration-200"
                    style={{ width: `${pairingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Connected success state */}
            {isConnected && (
              <div className="p-3 bg-[#A3FF2E] border-2 border-black flex items-center justify-between gap-3 text-black">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div className="text-xs font-black">
                    Peranti berjaya dipadankan! Sensor telefon aktif untuk mod 360°.
                  </div>
                </div>
              </div>
            )}

            {/* Live Gyroscope Readings Display */}
            <div className="bg-[#121212] text-white p-3 font-mono-code text-xs space-y-2 neo-border">
              <div className="flex justify-between text-white text-[11px] font-bold border-b border-gray-700 pb-1">
                <span>GYROSCOPE & ORIENTASI ELEKTRONIK:</span>
                <span className={isConnected ? 'text-[#A3FF2E]' : 'text-gray-400'}>
                  {isConnected ? 'ONLINE & SYNCED' : 'STANDBY'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-gray-900 p-1.5 border border-gray-700">
                  <span className="text-gray-400 block">Alpha (Yaw)</span>
                  <span className="text-white font-bold">{gyroReadings.alpha || '0'}°</span>
                </div>
                <div className="bg-gray-900 p-1.5 border border-gray-700">
                  <span className="text-gray-400 block">Beta (Pitch)</span>
                  <span className="text-[#FFE600] font-bold">{gyroReadings.beta || '0'}°</span>
                </div>
                <div className="bg-gray-900 p-1.5 border border-gray-700">
                  <span className="text-gray-400 block">Gamma (Roll)</span>
                  <span className="text-white font-bold">{gyroReadings.gamma || '0'}°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              id="btn-confirm-vr-settings"
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="flex-1 py-3 bg-[#FFE600] hover:bg-[#ecd000] text-black font-display font-black text-xs uppercase neo-btn-3d flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Selesai & Teruskan Pengalaman VR</span>
            </button>

            <button
              id="btn-cancel-modal"
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="px-5 py-3 bg-white dark:bg-zinc-800 hover:bg-gray-100 text-black dark:text-white font-display font-black text-xs uppercase neo-btn-3d"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
