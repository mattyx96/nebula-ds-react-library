import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {useBreakpoint} from '../../../hook/useBreakpoint';
import {FramePanel} from "../FramePanel.tsx";

vi.mock('../../../hook/useBreakpoint', () => ({
  useBreakpoint: vi.fn(),
}));

const mockBreakpoint = (overrides = {}) => {
  vi.mocked(useBreakpoint).mockReturnValue({
    current: 'lg',
    isDesktop: true,
    isMobile: false,
    isTablet: false,
    ...overrides,
  });
};

describe('FramePanel', () => {
  beforeEach(() => {
    mockBreakpoint();
  });

  it('renders title, header and footer content', () => {
    render(
      <FramePanel
        title="Desktop Test"
        renderHeader={<div>Header</div>}
        renderFooter={<div>Footer</div>}
      >
        <div>Body</div>
      </FramePanel>
    );
    expect(screen.getByText('Desktop Test')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('does not set data-inverse by default', () => {
    const {container} = render(
      <FramePanel title="T">
        <div>Body</div>
      </FramePanel>
    );
    const root = container.querySelector('.nb-frame-panel');
    expect(root).not.toHaveAttribute('data-inverse');
  });

  it('sets data-inverse when inverse is true', () => {
    const {container} = render(
      <FramePanel title="T" inverse>
        <div>Body</div>
      </FramePanel>
    );
    const root = container.querySelector('.nb-frame-panel');
    expect(root).toHaveAttribute('data-inverse', 'true');
    expect(root).toHaveClass('nb-frame-panel--inverse');
  });

  it('renders the grid sections (header/body/footer)', () => {
    const {container} = render(
      <FramePanel
        title="T"
        renderHeader={<div>H</div>}
        renderFooter={<div>F</div>}
      >
        <div>B</div>
      </FramePanel>
    );
    expect(container.querySelector('.nb-frame-panel__header')).toBeTruthy();
    expect(container.querySelector('.nb-frame-panel__body')).toBeTruthy();
    expect(container.querySelector('.nb-frame-panel__footer')).toBeTruthy();
    expect(container.querySelector('.nb-frame-panel__main')).toBeTruthy();
  });

  it('renders header and footer frame connectors', () => {
    const {container} = render(
      <FramePanel
        title="T"
        renderHeader={<div>H</div>}
        renderFooter={<div>F</div>}
      >
        <div>B</div>
      </FramePanel>
    );
    expect(container.querySelector('.nb-frame-panel__header-connector .nb-frame-connector')).toBeTruthy();
    expect(container.querySelector('.nb-frame-panel__footer-connector .nb-frame-connector')).toBeTruthy();
  });

  it('uses desktop connector size on desktop breakpoint', () => {
    const {container} = render(
      <FramePanel title="T">
        <div>B</div>
      </FramePanel>
    );
    const connector = container.querySelector('.nb-frame-panel__header-connector .nb-frame-connector');
    expect(connector).toHaveClass('nb-frame-connector--size-m');
  });

  it('uses small connector size on mobile breakpoint', () => {
    mockBreakpoint({current: 'sm', isMobile: true, isDesktop: false});
    const {container} = render(
      <FramePanel title="T">
        <div>B</div>
      </FramePanel>
    );
    const connector = container.querySelector('.nb-frame-panel__header-connector .nb-frame-connector');
    expect(connector).toHaveClass('nb-frame-connector--size-s');
  });
});
