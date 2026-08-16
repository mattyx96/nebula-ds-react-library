import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {
  FlashContext,
  type FlashColor,
  type FlashOptions,
} from './flashContext';
import './Flash.css';

export type {FlashColor, FlashOptions} from './flashContext';

export type FlashProviderProps = {
  children?: ReactNode;
  className?: string;
};

type ActiveFlash = {
  color: FlashColor;
  on: boolean;
  seq: number;
};

export const FlashProvider = (props: FlashProviderProps) => {
  const {children, className} = props;
  const [active, setActive] = useState<ActiveFlash | null>(null);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  const flash = useCallback((color: FlashColor, options?: FlashOptions) => {
    const {repeats = 2, duration = 300} = options ?? {};

    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];

    const seq = Date.now() + Math.random();
    // Number of on/off transitions to apply before returning to normal.
    // `repeats` full flashes = (repeats * 2 - 1) transitions.
    let remaining = Math.max(0, Math.floor(repeats)) * 2 - 1;

    setActive({color, on: true, seq});

    const tick = () => {
      timers.current.push(
        setTimeout(() => {
          setActive((prev) => (prev && prev.seq === seq ? {...prev, on: !prev.on} : prev));
          remaining -= 1;
          if (remaining > 0) {
            tick();
          } else {
            setActive((prev) => (prev && prev.seq === seq ? null : prev));
          }
        }, duration)
      );
    };

    tick();
  }, []);

  const tone = active?.on ? `nb-flash--${active.color}` : undefined;

  return (
    <FlashContext.Provider value={{flash}}>
      <div className={clsxMerge('nb-flash', tone, className)}>
        {children}
      </div>
    </FlashContext.Provider>
  );
};
