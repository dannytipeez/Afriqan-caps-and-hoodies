'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Moon, Sun } from 'lucide-react';
import { useTheme, ACCENT_PALETTES, AccentColor } from '@/context/ThemeContext';

export default function ThemeSelector() {
  const { accent, setAccent, mode, toggleMode, accentConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const paletteKeys: AccentColor[] = ['blue', 'green', 'orange', 'pink', 'purple'];

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button: Palette Icon with Active Color Pip */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Customize theme and accent color"
        title="Customize theme color and mode"
        className="relative p-1.5 rounded-full text-[#5B586E] dark:text-[#B6B0D1] hover:text-[var(--primary)] transition-all cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
      >
        <Palette size={19} strokeWidth={2.2} style={{ color: accentConfig.hex }} />
        {/* Small active color pip */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white dark:border-[#0F1011]"
          style={{ backgroundColor: accentConfig.hex }}
        />
      </button>

      {/* Popover Card Matching User Attachment */}
      {isOpen && (
        <div
          className="absolute right-0 top-11 z-50 w-72 sm:w-80 p-4 sm:p-5 bg-white dark:bg-[#161424] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-150"
          style={{
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2), 0 0 1px 1px rgba(0,0,0,0.05)',
          }}
        >
          {/* SECTION 1: ACCENT COLOR */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              ACCENT COLOR
            </h4>

            {/* Horizontal Row of Swatches with Concentric Ring & Checkmark */}
            <div className="flex items-center justify-between pt-1 pb-1">
              {paletteKeys.map((key) => {
                const item = ACCENT_PALETTES[key];
                const isSelected = accent === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAccent(key)}
                    aria-label={`Select ${item.label}`}
                    title={item.label}
                    className="group relative flex items-center justify-center p-0.5 transition-all focus:outline-none cursor-pointer"
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'scale-105 ring-2 ring-offset-2 shadow-sm'
                          : 'hover:scale-110 opacity-90 hover:opacity-100 ring-1 ring-black/10 dark:ring-white/10'
                      }`}
                      style={{
                        backgroundColor: item.hex,
                        // @ts-ignore
                        '--tw-ring-color': item.hex,
                        '--tw-ring-offset-color': mode === 'dark' ? '#161424' : '#ffffff',
                      }}
                    >
                      {isSelected && (
                        <Check size={18} strokeWidth={3} className="text-white drop-shadow-sm animate-in zoom-in-50 duration-150" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: DISPLAY MODE */}
          <div className="space-y-2.5 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
            <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              DISPLAY MODE
            </h4>

            <div className="flex items-center justify-between gap-3 pt-1">
              {/* Illustrated Sliding Toggle Switch (Sun & Cloud / Moon & Stars) */}
              <button
                type="button"
                onClick={toggleMode}
                aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
                className={`relative w-[86px] h-[38px] rounded-full p-1 transition-all duration-300 border-2 cursor-pointer shadow-inner flex items-center overflow-hidden ${
                  mode === 'light'
                    ? 'bg-[#C5A896] border-[#A38573]'
                    : 'bg-[#120F20] border-[#322D4B]'
                }`}
              >
                {/* Sun & Cloud in Light Mode */}
                <div
                  className={`absolute inset-0 flex items-center px-2 transition-all duration-300 ${
                    mode === 'light' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
                  }`}
                >
                  {/* Fluffy white cloud */}
                  <div className="relative z-10 w-7 h-4 bg-white/95 rounded-full shadow-xs flex items-center justify-center -mr-1">
                    <span className="w-2.5 h-2.5 bg-white/95 rounded-full absolute -top-1 left-2" />
                    <span className="w-2 h-2 bg-white/95 rounded-full absolute -top-0.5 left-4" />
                  </div>
                  {/* Glowing golden sun */}
                  <div className="ml-auto w-6 h-6 rounded-full bg-[#EAB308] border border-[#CA8A04] shadow-sm flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#FACC15]" />
                  </div>
                </div>

                {/* Moon & Stars in Dark Mode */}
                <div
                  className={`absolute inset-0 flex items-center px-2 transition-all duration-300 ${
                    mode === 'dark' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                  }`}
                >
                  {/* Glowing silver crescent moon */}
                  <div className="w-6 h-6 rounded-full bg-indigo-200/90 shadow-sm flex items-center justify-center text-indigo-950">
                    <Moon size={13} className="fill-indigo-950" />
                  </div>
                  {/* Little stars */}
                  <div className="ml-auto flex flex-col gap-0.5 text-indigo-200/80 pr-1 text-[9px] font-mono leading-none">
                    <span>✦</span>
                    <span className="text-[7px] ml-1">✧</span>
                  </div>
                </div>
              </button>

              {/* Mode Pill Button with Accent Highlight */}
              <button
                type="button"
                onClick={toggleMode}
                className="flex-grow py-2 px-3 sm:px-4 rounded-full border text-center transition-all cursor-pointer font-bold text-xs uppercase tracking-wider shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: accentConfig.hex,
                  color: accentConfig.hex,
                  backgroundColor: mode === 'dark' ? accentConfig.darkLight : accentConfig.light,
                }}
              >
                {mode === 'light' ? 'LIGHT MODE' : 'DARK MODE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

