import {createContext, useContext} from 'react';

export type FlashColor = 'error' | 'success';

export type FlashOptions = {
  /** How many times the UI blinks (default 2). */
  repeats?: number;
  /** Duration of each blink phase in ms (default 100). */
  duration?: number;
};

export type FlashContextValue = {
  flash: (color: FlashColor, options?: FlashOptions) => void;
};

export const FlashContext = createContext<FlashContextValue | null>(null);

/** Trigger a temporary color flash (e.g. error/success feedback) on the whole UI. */
export const useFlash = (): FlashContextValue => {
  const ctx = useContext(FlashContext);
  if (!ctx) {
    throw new Error('useFlash must be used within a <FlashProvider>');
  }
  return ctx;
};
