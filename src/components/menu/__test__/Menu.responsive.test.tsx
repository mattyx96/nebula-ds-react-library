import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Menu} from '../Menu.tsx';
import type {MenuItem} from '../../../common/types';
import * as breakpointHook from '../../../hook/useBreakpoint';

vi.mock('../../../hook/useBreakpoint', () => ({
  useBreakpoint: vi.fn(),
}));

const mockUseBreakpoint = vi.mocked(breakpointHook.useBreakpoint);

const desktopBreakpoint = {
  current: 'lg',
  isDesktop: true,
  isMobile: false,
  isTablet: false,
} as ReturnType<typeof breakpointHook.useBreakpoint>;

const mobileBreakpoint = {
  current: 'sm',
  isDesktop: false,
  isMobile: true,
  isTablet: false,
} as ReturnType<typeof breakpointHook.useBreakpoint>;

const items: MenuItem[] = [
  {value: 'edit', text: 'Edit'},
  {value: 'duplicate', text: 'Duplicate'},
  {value: 'delete', text: 'Delete'},
];

describe('Menu (responsive)', () => {
  beforeEach(() => {
    mockUseBreakpoint.mockReturnValue(desktopBreakpoint);
  });

  it('renders a dropdown on desktop by default', () => {
    render(<Menu text="Actions" items={items}/>);

    expect(screen.getByRole('button', {name: 'Actions'})).toBeInTheDocument();
    expect(screen.getByRole('menu', {hidden: true})).toBeInTheDocument();
  });

  it('renders a bottom sheet below the breakpoint by default', async () => {
    mockUseBreakpoint.mockReturnValue(mobileBreakpoint);

    render(<Menu text="Actions" items={items}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));

    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(dialog).not.toHaveAttribute('hidden'));
    expect(screen.queryByRole('menu', {hidden: true})).not.toBeInTheDocument();
  });

  it('mode="sheet" forces the bottom sheet on desktop', async () => {
    render(<Menu text="Actions" mode="sheet" items={items}/>);

    fireEvent.click(screen.getByRole('button', {name: 'Actions'}));

    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(dialog).not.toHaveAttribute('hidden'));
  });

  it('mode="menu" forces the dropdown on mobile', () => {
    mockUseBreakpoint.mockReturnValue(mobileBreakpoint);

    render(<Menu text="Actions" mode="menu" items={items}/>);

    expect(screen.getByRole('menu', {hidden: true})).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a dropdown on md (only sm and xs use the sheet by default)', () => {
    mockUseBreakpoint.mockReturnValue({
      current: 'md',
      isDesktop: false,
      isMobile: false,
      isTablet: true,
    } as ReturnType<typeof breakpointHook.useBreakpoint>);

    render(<Menu text="Actions" items={items}/>);

    expect(screen.getByRole('menu', {hidden: true})).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('breakpoint prop controls the switch point', () => {
    // current is 'lg'; with breakpoint="xl" the menu should render a sheet
    mockUseBreakpoint.mockReturnValue({
      ...desktopBreakpoint,
      current: 'lg',
    });

    render(<Menu text="Actions" breakpoint="xl" items={items}/>);

    expect(screen.getByRole('dialog', {hidden: true})).toBeInTheDocument();
    expect(screen.queryByRole('menu', {hidden: true})).not.toBeInTheDocument();
  });
});
