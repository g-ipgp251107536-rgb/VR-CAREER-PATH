import React, { useState, useEffect, useRef } from 'react';
import { CareerItem, HollandCodeType, StudentProfile } from '../types';
import { HOLLAND_CATEGORIES } from '../data/hollandData';
import {
  Glasses,
  ArrowLeft,
  Rotate3d,
  Info,
  Smartphone,
  RotateCcw,
} from 'lucide-react';
import { playClickSound, playChirpSound } from '../utils/soundEffects';

interface VRPlayerProps {
  selectedCareer: CareerItem;
  student: StudentProfile | null;
  onBackToResults: () => void;
  onSelectAnotherCareer: (career: CareerItem) => void;
  onOpenVRSettings: () => void;
}

export const VRPlayer: React.FC<VRPlayerProps> = ({
  selectedCareer,
  student,
  onBackToResults,
  onSelectAnotherCareer,
  onOpenVRSettings,
}) => {
  const [vrDisplayMode, setVrDisplayMode] = useState<'panoramic' | 'split-screen'>(
    student?.vrModeUsed || 'panoramic'
  );
  const [playerType, setPlayerType] = useState<'youtube360' | 'interactiveSphere'>('youtube360');
  const [activeHotspot, setActiveHotspot] = useState<any | null>(
    selectedCareer.vrScene.hotspots[0] || null
  );

  // Panorama Canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [yaw, setYaw] = useState(0); // horizontal angle
  const [pitch, setPitch] = useState(0); // vertical angle
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Load panoramic image onto canvas
  useEffect(() => {
    let animationFrameId: number;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedCareer.vrScene.panoramicImageUrl;

    const render = () => {
      const renderToCanvas = (cvs: HTMLCanvasElement | null) => {
        if (!cvs) return;
        const ctx = cvs.getContext('2d');
        if (!ctx) return;

        const w = cvs.width;
        const h = cvs.height;

        ctx.fillStyle = selectedCareer.vrScene.fallbackColor || '#121316';
        ctx.fillRect(0, 0, w, h);

        if (img.complete && img.naturalWidth > 0) {
          const imgW = img.naturalWidth;
          const imgH = img.naturalHeight;

          const offsetX = ((yaw % 360) / 360) * imgW;
          const offsetY = (pitch / 90) * (imgH * 0.2);

          ctx.save();
          ctx.drawImage(img, offsetX, offsetY, imgW / 2, imgH / 2, 0, 0, w, h);
          if (offsetX + imgW / 2 > imgW) {
            ctx.drawImage(img, offsetX - imgW, offsetY, imgW / 2, imgH / 2, 0, 0, w, h);
          }
          ctx.restore();
        }

        // Draw HUD overlay (Reticle)
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 2;

        const cx = w / 2;
        const cy = h / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 16, cy);
        ctx.lineTo(cx + 16, cy);
        ctx.moveTo(cx, cy - 16);
        ctx.lineTo(cx, cy + 16);
        ctx.stroke();
      };

      renderToCanvas(canvasRef.current);
      if (vrDisplayMode === 'split-screen') {
        renderToCanvas(rightCanvasRef.current);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedCareer, yaw, pitch, vrDisplayMode]);

  // Handle phone gyroscope if available
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null && e.beta !== null) {
        setYaw(e.alpha);
        setPitch(Math.min(45, Math.max(-45, e.beta - 45)));
      }
    };

    if (window.DeviceOrientationEvent && student?.vrConnected) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [student?.vrConnected]);

  // Mouse & Touch Drag Controls for interactive sphere
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setYaw((prev) => (prev - deltaX * 0.4 + 360) % 360);
    setPitch((prev) => Math.min(60, Math.max(-60, prev + deltaY * 0.4)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDragging.current = true;
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - lastMousePos.current.x;
    const deltaY = e.touches[0].clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setYaw((prev) => (prev - deltaX * 0.4 + 360) % 360);
    setPitch((prev) => Math.min(60, Math.max(-60, prev + deltaY * 0.4)));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleCenterGyro = () => {
    playClickSound();
    setYaw(0);
    setPitch(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Header & Breadcrumb with 3D Brutalism */}
      <div className="bg-white dark:bg-[#1E2026] neo-border p-4 mb-6 shadow-[4px_4px_0_#000] flex flex-wrap items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="btn-back-to-results"
            onClick={() => {
              playClickSound();
              onBackToResults();
            }}
            className="px-3.5 py-2 bg-white dark:bg-zinc-800 hover:bg-[#FFE600] text-black dark:text-white dark:hover:text-black font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali Ke Keputusan</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#00E5FF] text-black font-mono-code text-[11px] font-black px-2 py-0.5 border border-black">
                MOD TEROKA VR 360°
              </span>
              <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                Kod Holland: <strong>{selectedCareer.category}</strong>
              </span>
            </div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-black dark:text-white uppercase tracking-tight">
              {selectedCareer.name} ({selectedCareer.nameEn})
            </h1>
          </div>
        </div>

        {/* VR Settings and Display Controls - 3D Brutalism */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Re-center view */}
          <button
            type="button"
            id="btn-recenter-vr"
            onClick={handleCenterGyro}
            className="px-3 py-2 bg-white dark:bg-zinc-800 hover:bg-gray-100 text-black dark:text-white font-mono-code font-black text-xs uppercase neo-btn-3d flex items-center gap-1"
            title="Pusatkan pandangan sudut pandang ke hadapan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Arah</span>
          </button>

          {/* Toggle Split-Screen for Google Cardboard */}
          <button
            type="button"
            id="btn-toggle-split-screen"
            onClick={() => {
              playClickSound();
              setVrDisplayMode((prev) => (prev === 'panoramic' ? 'split-screen' : 'panoramic'));
            }}
            className={`px-3.5 py-2 font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5 ${
              vrDisplayMode === 'split-screen'
                ? 'bg-[#FFE600] text-black shadow-[3px_3px_0_#000]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white'
            }`}
          >
            <Glasses className="w-4 h-4" />
            <span>{vrDisplayMode === 'split-screen' ? 'Mod Stereoskopik' : 'Mod Skrin 360°'}</span>
          </button>

          {/* Device Pairing Settings Trigger */}
          <button
            type="button"
            id="btn-vr-settings-top"
            onClick={() => {
              playClickSound();
              onOpenVRSettings();
            }}
            className={`px-3.5 py-2 font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5 ${
              student?.vrConnected
                ? 'bg-[#00E5FF] text-black shadow-[3px_3px_0_#000]'
                : 'bg-[#FFE600] text-black'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>
              {student?.vrConnected
                ? `Telefon Terhubung (${student?.pairingCode})`
                : 'Sambung Telefon VR'}
            </span>
          </button>

          {/* Source Switcher: YouTube 360 vs WebGL Interactive Sphere */}
          <div className="flex border-2 border-black dark:border-white bg-white dark:bg-zinc-800 p-0.5">
            <button
              type="button"
              id="btn-view-youtube-360"
              onClick={() => {
                playClickSound();
                setPlayerType('youtube360');
              }}
              className={`px-2.5 py-1 text-xs font-mono-code font-black ${
                playerType === 'youtube360'
                  ? 'bg-[#FF4B4B] text-white'
                  : 'text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Video VR 360°
            </button>
            <button
              type="button"
              id="btn-view-interactive-sphere"
              onClick={() => {
                playClickSound();
                setPlayerType('interactiveSphere');
              }}
              className={`px-2.5 py-1 text-xs font-mono-code font-black ${
                playerType === 'interactiveSphere'
                  ? 'bg-[#00E5FF] text-black'
                  : 'text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Simulasi Interaktif
            </button>
          </div>
        </div>
      </div>

      {/* Main VR Viewport Container */}
      <div className="bg-black neo-border-thick p-2 sm:p-4 neo-shadow-xl mb-8 relative">
        {/* VR HUD Header Overlay */}
        <div className="flex items-center justify-between px-3 py-2 bg-neutral-900/95 border border-neutral-700 text-white font-mono-code text-xs mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[#FFE600] font-black">
              LIVE VR FEED: {selectedCareer.vrScene.environmentName}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-gray-300">
            <span className="hidden sm:inline">
              ARAH: {Math.round(yaw % 360)}° | TILT: {Math.round(pitch)}°
            </span>
            <span className="bg-[#00E5FF] text-black px-2 py-0.5 font-black">
              {vrDisplayMode === 'split-screen' ? 'STEREO DUAL-LENS' : 'MONO 360'}
            </span>
          </div>
        </div>

        {/* Viewport content */}
        {playerType === 'youtube360' ? (
          selectedCareer.vrScene.videoUrl ? (
            /* Direct MP4 Cloudinary Video Player */
            vrDisplayMode === 'split-screen' ? (
              /* Dual-Lens Stereoscopic Split Screen for Cardboard VR Glasses */
              <div className="grid grid-cols-2 h-full aspect-video bg-neutral-950 neo-border overflow-hidden divide-x-4 divide-black relative">
                {/* Left Eye */}
                <div className="relative h-full overflow-hidden flex items-center justify-center bg-black">
                  <video
                    controls
                    autoPlay
                    playsInline
                    loop
                    className="w-full h-full object-contain"
                    src={selectedCareer.vrScene.videoUrl}
                  />
                  <span className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-0.5 text-[10px] font-mono-code border border-white font-bold pointer-events-none">
                    MATA KIRI (L)
                  </span>
                </div>
                {/* Right Eye */}
                <div className="relative h-full overflow-hidden flex items-center justify-center bg-black">
                  <video
                    controls
                    autoPlay
                    playsInline
                    loop
                    className="w-full h-full object-contain"
                    src={selectedCareer.vrScene.videoUrl}
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 text-[10px] font-mono-code border border-white font-bold pointer-events-none">
                    MATA KANAN (R)
                  </span>
                </div>
              </div>
            ) : (
              /* Single Panoramic Video Viewport */
              <div className="relative w-full aspect-video bg-neutral-950 neo-border overflow-hidden flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-full object-contain bg-black"
                  src={selectedCareer.vrScene.videoUrl}
                />
                {/* Overlay status tag */}
                <div className="absolute top-3 left-3 bg-black/85 text-[#10B981] text-xs font-mono-code font-black px-3 py-1 border border-[#10B981] flex items-center gap-1.5 shadow-[2px_2px_0_#000] pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>SIMULASI POV VIDEO VR AKTIF</span>
                </div>
              </div>
            )
          ) : (
            /* Notice when no video is provided (x) */
            <div className="relative w-full aspect-video bg-neutral-950 neo-border overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FF4B4B]/20 border-2 border-[#FF4B4B] flex items-center justify-center text-[#FF4B4B] mb-4 shadow-[2px_2px_0_#000]">
                <Glasses className="w-8 h-8" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#FF4B4B] text-white font-mono-code font-bold text-xs mb-2 border border-white shadow-[2px_2px_0_#000]">
                VIDEO VR DALAM PEMBANGUNAN (x)
              </span>
              <h3 className="text-white font-display font-black text-xl mb-2">
                Simulasi Video POV Bagi Kerjaya {selectedCareer.name} Sedang Disediakan
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-5">
                Video rakaman POV bagi kerjaya ini ditanda (x) dan sedang disiapkan. Anda masih boleh meneroka simulasi interaktif 360° di bawah.
              </p>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setPlayerType('interactiveSphere');
                }}
                className="px-5 py-2.5 rounded-full bg-[#00E5FF] hover:bg-[#00cce6] text-black font-display font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0_#000] cursor-pointer"
              >
                Teroka Simulasi Interaktif 360°
              </button>
            </div>
          )
        ) : (
          /* Interactive WebGL / Canvas 360 Panoramic Sphere */
          <div className="relative w-full aspect-video bg-neutral-950 neo-border overflow-hidden select-none cursor-grab active:cursor-grabbing">
            {vrDisplayMode === 'split-screen' ? (
              /* Dual-Lens Stereoscopic Split Screen for Cardboard VR Glasses */
              <div className="grid grid-cols-2 h-full divide-x-4 divide-black">
                {/* Left Eye */}
                <div className="relative h-full overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-0.5 text-[10px] font-mono-code border border-white font-bold">
                    MATA KIRI (L)
                  </span>
                </div>

                {/* Right Eye */}
                <div className="relative h-full overflow-hidden">
                  <canvas
                    ref={rightCanvasRef}
                    width={800}
                    height={600}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 text-[#FFE600] px-2 py-0.5 text-[10px] font-mono-code border border-yellow-400 font-bold">
                    MATA KANAN (R)
                  </span>
                </div>
              </div>
            ) : (
              /* Single 360 Panoramic Viewport */
              <div className="relative w-full h-full">
                <canvas
                  ref={canvasRef}
                  width={1280}
                  height={720}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Hotspots Overlay Buttons */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {selectedCareer.vrScene.hotspots.map((hs) => (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveHotspot(hs);
                  }}
                  className={`px-3 py-1 text-xs font-mono-code font-black neo-border transition-all ${
                    activeHotspot?.id === hs.id
                      ? 'bg-[#00E5FF] text-black shadow-[2px_2px_0_#fff]'
                      : 'bg-black/80 text-white hover:bg-black'
                  }`}
                >
                  {hs.title}
                </button>
              ))}
            </div>

            {/* Hotspot Info Drawer */}
            {activeHotspot && (
              <div className="absolute bottom-4 right-4 max-w-sm bg-black/95 text-white p-3.5 border-2 border-[#FFE600] font-mono-code text-xs space-y-1">
                <div className="flex items-center justify-between text-[#FFE600] font-black">
                  <span>TITIK INTERAKTIF:</span>
                  <span>{activeHotspot.title}</span>
                </div>
                <p className="text-gray-200 leading-relaxed font-sans text-xs">
                  {activeHotspot.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* VR Controls bar at bottom of viewport */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-white text-xs font-mono-code bg-neutral-900/90 p-3 border border-neutral-700">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-white" />
            <span className="text-gray-200">
              {student?.vrConnected
                ? `Telefon Terhubung (${student?.pairedDeviceName || 'Peranti Pelajar'}) - Kawalan Gyro 360° Berfungsi`
                : 'Peringatan: Anda boleh sambungkan telefon pintar untuk kawalan pergerakan 360° yang lebih lancar.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-viewport-pair-phone"
              onClick={() => {
                playClickSound();
                onOpenVRSettings();
              }}
              className={`px-3.5 py-1.5 font-display font-black text-xs uppercase neo-btn-3d flex items-center gap-1.5 ${
                student?.vrConnected
                  ? 'bg-[#00E5FF] text-black shadow-[2px_2px_0_#fff]'
                  : 'bg-[#FFE600] text-black shadow-[2px_2px_0_#000]'
              }`}
            >
              <Glasses className="w-4 h-4" />
              <span>
                {student?.vrConnected
                  ? `URUS SAMBUNGAN (${student?.pairingCode || 'PAIR'})`
                  : `PADANKAN TELEFON DENGAN KOD`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Career Information & Malaysian Prospects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Career Details */}
        <div className="lg:col-span-8 bg-[#FFFDF7] dark:bg-[#1E2026] neo-border p-6 neo-shadow transition-colors">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-black dark:border-white pb-3">
            <Info className="w-5 h-5 text-black dark:text-white" />
            <h2 className="font-display font-black text-xl text-black dark:text-white uppercase">
              Panduan Menyeluruh: {selectedCareer.name}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Description */}
            <p className="text-sm font-semibold text-black dark:text-zinc-200 leading-relaxed bg-white dark:bg-[#121316] p-4 neo-border">
              {selectedCareer.description}
            </p>

            {/* Education path in Malaysia */}
            <div className="bg-white dark:bg-[#121316] p-5 neo-border">
              <h3 className="font-display font-black text-sm uppercase text-black dark:text-white mb-2">
                Laluan Akademik & TVET di Malaysia:
              </h3>
              <p className="text-sm font-semibold text-gray-800 dark:text-zinc-300 leading-relaxed">
                {selectedCareer.educationPath}
              </p>
            </div>

            {/* Skills & Employers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white dark:bg-[#121316] p-3.5 neo-border">
                <span className="font-display font-black text-xs uppercase text-black dark:text-white block mb-2">
                  Kemahiran Utama Diperlukan:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.keySkills.map((sk, i) => (
                    <span
                      key={i}
                      className="bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-2.5 py-1 font-mono-code font-black border border-black dark:border-white text-[11px]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#121316] p-3.5 neo-border">
                <span className="font-display font-black text-xs uppercase text-black dark:text-white block mb-2">
                  Syarikat & Majikan Utama di Malaysia:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.topEmployersMY.map((emp, i) => (
                    <span
                      key={i}
                      className="bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-2.5 py-1 font-black border border-black dark:border-white text-[11px]"
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Other Careers to Explore */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#00E5FF] dark:bg-[#1E2026] neo-border p-4 neo-shadow transition-colors">
            <h3 className="font-display font-black text-sm text-black dark:text-white uppercase mb-3 border-b-2 border-black dark:border-white pb-2">
              Kerjaya Lain Dalam Holland Code:
            </h3>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {Object.values(HOLLAND_CATEGORIES).flatMap((cat) =>
                cat.careers.map((car) => {
                  const isSelected = car.id === selectedCareer.id;
                  return (
                    <button
                      key={car.id}
                      type="button"
                      id={`btn-switch-career-${car.id}`}
                      onClick={() => {
                        playChirpSound();
                        onSelectAnotherCareer(car);
                      }}
                      className={`w-full p-2.5 text-left neo-border transition-all flex items-center justify-between cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
                        isSelected
                          ? 'bg-black text-[#FFE600] shadow-[3px_3px_0_#000]'
                          : 'bg-white dark:bg-[#121316] hover:bg-yellow-50 dark:hover:bg-zinc-800 text-black dark:text-white shadow-[2px_2px_0_#000]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-5 h-5 text-[10px] font-mono-code font-black border border-black flex items-center justify-center text-black"
                            style={{ backgroundColor: HOLLAND_CATEGORIES[car.category].color }}
                          >
                            {car.category}
                          </span>
                          <span className="font-display font-black text-xs truncate max-w-[170px]">
                            {car.name.split('(')[0]}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-code block mt-0.5 opacity-80">
                          {car.nameEn}
                        </span>
                      </div>

                      <Glasses className="w-4 h-4 shrink-0" />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
