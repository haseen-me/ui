import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { themeNames } from './theme';

// ─── Types ──────────────────────────────────────────────────────────────────────

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum StorageOnlyThemeMode {
  SYSTEM = 'system',
}

export type LocalStorageThemeMode = ThemeMode | StorageOnlyThemeMode;

function isThemeMode(value: LocalStorageThemeMode): value is ThemeMode {
  return value === ThemeMode.LIGHT || value === ThemeMode.DARK;
}

// ─── Context ────────────────────────────────────────────────────────────────────

interface ThemeContextType {
  theme: ThemeMode;
  storedTheme: LocalStorageThemeMode;
  setStoredTheme: (mode: LocalStorageThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeMode.LIGHT,
  storedTheme: StorageOnlyThemeMode.SYSTEM,
  setStoredTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ─── Constants ──────────────────────────────────────────────────────────────────

export const THEME_LOCAL_STORAGE_KEY = 'HASEEN_THEME_MODE';
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

// ─── Utility ────────────────────────────────────────────────────────────────────

function applyThemeTokens(mode: ThemeMode) {
  const tokens = themeNames[mode];
  const body = document.body;
  for (const key in tokens) {
    body.style.setProperty(key, tokens[key]);
  }
  body.setAttribute('data-haseen-theme', mode);
}

// ─── Provider ───────────────────────────────────────────────────────────────────

export interface HaseenThemeProviderProps {
  defaultTheme?: LocalStorageThemeMode;
  children: React.ReactNode;
}

export const HaseenThemeProvider: React.FC<HaseenThemeProviderProps> = ({
  defaultTheme = StorageOnlyThemeMode.SYSTEM,
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeMode>(ThemeMode.DARK);
  const [storedThemeState, setStoredThemeState] = useState<LocalStorageThemeMode>(defaultTheme);

  const darkMediaQuery =
    typeof window !== 'undefined' ? window.matchMedia(DARK_MEDIA_QUERY) : undefined;

  const resolveAndApply = useCallback(
    (mode: LocalStorageThemeMode, mq?: MediaQueryList) => {
      setStoredThemeState(mode);
      if (isThemeMode(mode)) {
        setThemeName(mode);
        applyThemeTokens(mode);
      } else if (mq !== undefined) {
        const resolved = mq.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
        setThemeName(resolved);
        applyThemeTokens(resolved);
      }
    },
    []
  );

  const setStoredTheme = useCallback(
    (mode: LocalStorageThemeMode) => {
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, mode);
      resolveAndApply(mode, darkMediaQuery);
    },
    [darkMediaQuery, resolveAndApply]
  );

  // Initialize from localStorage
  useEffect(() => {
    const stored =
      (localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as LocalStorageThemeMode) || defaultTheme;
    resolveAndApply(stored, darkMediaQuery);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (storedThemeState !== StorageOnlyThemeMode.SYSTEM || !darkMediaQuery) return;
    const handler = () => resolveAndApply(StorageOnlyThemeMode.SYSTEM, darkMediaQuery);
    darkMediaQuery.addEventListener('change', handler);
    return () => darkMediaQuery.removeEventListener('change', handler);
  }, [storedThemeState, darkMediaQuery, resolveAndApply]);

  return (
    <ThemeContext.Provider value={{ theme: themeName, storedTheme: storedThemeState, setStoredTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
