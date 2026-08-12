import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {clsxMerge} from '../../common/utils/classNameUtils';
import {ThemeContext, themes, type Theme} from './themeContext';

import './ThemeProvider.css';

export type ThemeProviderProps = {
  /** Active theme (defaults to light). Controlled prop; also seeds internal state. */
  theme?: Theme;
  className?: string;
  children?: ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const {theme = 'light', className, children} = props;
  const [current, setCurrent] = useState<Theme>(theme);

  useEffect(() => {
    setCurrent(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setCurrent(next);
  }, []);

  const value = useMemo(
    () => ({theme: current, setTheme, themes}),
    [current, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-nb-theme={current}
        className={clsxMerge('nb-theme-provider', className)}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
