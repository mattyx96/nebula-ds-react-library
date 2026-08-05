import {createContext, useContext} from 'react';

export const themes = ['light', 'dark'] as const;

export type Theme = (typeof themes)[number];

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: readonly Theme[];
};

const defaultContext: ThemeContextValue = {
  theme: 'light',
  setTheme: () => {},
  themes,
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue =>
  useContext(ThemeContext) ?? defaultContext;
