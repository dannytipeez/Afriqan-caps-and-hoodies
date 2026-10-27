'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type AccentColor = 'blue' | 'green' | 'orange' | 'pink' | 'purple';
export type DisplayMode = 'light' | 'dark';

export interface AccentConfig {
  id: AccentColor;
  label: string;
  hex: string;
  hover: string;
  light: string;
  darkLight: string;
  text: string;
  glow: string;
}

export const ACCENT_PALETTES: Record<AccentColor, AccentConfig> = {
  blue: {
    id: 'blue',
    label: 'Ocean Blue',
    hex: '#4F86C6',
    hover: '#3D74B4',
    light: '#EDF4FC',
    darkLight: '#14273E',
    text: '#1C4677',
    glow: 'rgba(79, 134, 198, 0.45)',
  },
  green: {
    id: 'green',
    label: 'Sage Green',
    hex: '#48A97A',
    hover: '#379467',
    light: '#EAF7F0',
    darkLight: '#102B1E',
    text: '#155B37',
    glow: 'rgba(72, 169, 122, 0.45)',
  },
  orange: {
    id: 'orange',
    label: 'Sunset Orange',
    hex: '#E5833B',
    hover: '#D36F26',
    light: '#FEF4EB',
    darkLight: '#391B08',
    text: '#8E400E',
    glow: 'rgba(229, 131, 59, 0.45)',
  },
  pink: {
    id: 'pink',
    label: 'Berry Pink',
    hex: '#E4386E',
    hover: '#CF265B',
    light: '#FDEEF3',
    darkLight: '#380B19',
    text: '#91123B',
    glow: 'rgba(228, 56, 110, 0.45)',
  },
  purple: {
    id: 'purple',
    label: 'Royal Purple',
    hex: '#7C3AED',
    hover: '#6D28D9',
    light: '#F5F3FF',
    darkLight: '#240F47',
    text: '#4C1D95',
    glow: 'rgba(124, 58, 237, 0.45)',
  },
};

interface ThemeContextType {
  accent: AccentColor;
  accentConfig: AccentConfig;
  mode: DisplayMode;
  setAccent: (accent: AccentColor) => void;
  setMode: (mode: DisplayMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentColor>('orange');
  const [mode, setModeState] = useState<DisplayMode>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const savedAccent = localStorage.getItem('afriqan_accent') as AccentColor;
      if (savedAccent && ACCENT_PALETTES[savedAccent]) {
        setAccentState(savedAccent);
      }
      const savedTheme = localStorage.getItem('afriqan_theme') as DisplayMode;
      if (savedTheme === 'dark') {
        setModeState('dark');
      }
    } catch (e) {
      console.warn('Could not read theme settings from localStorage', e);
    }
    setIsMounted(true);
  }, []);

  const applyThemeToDOM = (activeAccent: AccentColor, activeMode: DisplayMode) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;
    const cfg = ACCENT_PALETTES[activeAccent] || ACCENT_PALETTES.orange;

    root.style.setProperty('--primary', cfg.hex);
    root.style.setProperty('--primary-hover', cfg.hover);
    root.style.setProperty(
      '--primary-light',
      activeMode === 'dark' ? cfg.darkLight : cfg.light
    );
    root.style.setProperty('--primary-text', cfg.text);
    root.style.setProperty('--primary-glow', cfg.glow);
    root.style.setProperty('--primary-ring', cfg.hex);

    if (activeMode === 'dark') {
      body.classList.add('dark');
      root.classList.add('dark');
    } else {
      body.classList.remove('dark');
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    applyThemeToDOM(accent, mode);
  }, [accent, mode]);

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
    try {
      localStorage.setItem('afriqan_accent', newAccent);
    } catch (e) {}
    applyThemeToDOM(newAccent, mode);
  };

  const setMode = (newMode: DisplayMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem('afriqan_theme', newMode);
    } catch (e) {}
    applyThemeToDOM(accent, newMode);
  };

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        accentConfig: ACCENT_PALETTES[accent] || ACCENT_PALETTES.orange,
        mode,
        setAccent,
        setMode,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
