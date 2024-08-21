import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import {useBreakpoint} from '../../../hook/useBreakpoint';
import {FramePanel} from "../FramePanel.tsx";

describe('FramePanel with mocked useBreakpoint', () => {
  beforeEach(() => {
    (useBreakpoint as Mock).mockReturnValue(() => ({
      current: 'sm',
      isDesktop: false,
      isMobile: false,
      isTablet: false,
    }));
  });

  it('renders correctly on desktop', () => {
    const {container} = render(
      <FramePanel
        title="Desktop Test"
        renderHeader={<div>Header</div>}
        renderFooter={<div>Footer</div>}
      >
        <div className="h-96 bg-background-contrast-primary-500 w-full rounded-lg"/>
      </FramePanel>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Desktop Test')).toBeInTheDocument();
  });

  it('renders correctly on mobile', () => {
    // Simulate mobile view
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'sm',
      isDesktop: false,
      isMobile: true,
      isTablet: false,
    });

    const {container} = render(
      <FramePanel
        title="Mobile Test"
        renderHeader={<div>Header</div>}
        renderFooter={<div>Footer</div>}
      >
        <div className="h-96 bg-background-contrast-primary-500 w-full rounded-lg"/>
      </FramePanel>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Mobile Test')).toBeInTheDocument();
  });

  it('renders correctly on tablet', () => {
    // Simulate tablet view
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'md',
      isDesktop: false,
      isMobile: false,
      isTablet: true,
    });
    const {container} = render(
      <FramePanel
        title="Tablet Test"
        renderHeader={<div>Header</div>}
        renderFooter={<div>Footer</div>}
      >
        <div className="h-96 bg-background-contrast-primary-500 w-full rounded-lg"/>
      </FramePanel>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Tablet Test')).toBeInTheDocument();
  });
});
