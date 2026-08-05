import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {ThemeProvider} from '../ThemeProvider.tsx';
import {themes, useTheme} from '../themeContext.ts';

const Consumer = () => {
  const {theme} = useTheme();
  return <div data-testid="consumer">{theme}</div>;
};

describe('ThemeProvider', () => {
  it('renders data-nb-theme="light" by default', () => {
    const {container} = render(
      <ThemeProvider>
        <Consumer/>
      </ThemeProvider>
    );
    expect(container.querySelector('[data-nb-theme="light"]')).toBeTruthy();
    expect(screen.getByTestId('consumer')).toHaveTextContent('light');
  });

  it('renders data-nb-theme="dark" when theme="dark"', () => {
    const {container} = render(
      <ThemeProvider theme="dark">
        <Consumer/>
      </ThemeProvider>
    );
    expect(container.querySelector('[data-nb-theme="dark"]')).toBeTruthy();
    expect(screen.getByTestId('consumer')).toHaveTextContent('dark');
  });

  it('lets an inner provider override the outer one in its subtree only', () => {
    render(
      <ThemeProvider theme="dark">
        <div>
          <Consumer/>
        </div>
        <ThemeProvider theme="light">
          <Consumer/>
        </ThemeProvider>
      </ThemeProvider>
    );
    const consumers = screen.getAllByTestId('consumer');
    expect(consumers[0]).toHaveTextContent('dark');
    expect(consumers[1]).toHaveTextContent('light');
  });

  it('useTheme returns the default outside a provider', () => {
    const Readout = () => {
      const {theme, themes: registry} = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <span data-testid="registry">{registry.join(',')}</span>
        </div>
      );
    };
    render(<Readout/>);
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('registry')).toHaveTextContent('light,dark');
  });

  it('setTheme updates the wrapper attribute', () => {
    const Toggle = () => {
      const {theme, setTheme} = useTheme();
      return (
        <button type="button" onClick={() => setTheme('dark')}>
          {theme}
        </button>
      );
    };
    const {container} = render(
      <ThemeProvider theme="light">
        <Toggle/>
      </ThemeProvider>
    );
    expect(container.querySelector('[data-nb-theme="light"]')).toBeTruthy();
    fireEvent.click(screen.getByRole('button'));
    expect(container.querySelector('[data-nb-theme="dark"]')).toBeTruthy();
  });

  it('exposes the themes registry', () => {
    expect(themes).toEqual(['light', 'dark']);
  });
});
