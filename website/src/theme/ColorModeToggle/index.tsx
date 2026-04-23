import React, { useCallback } from 'react';
import OriginalColorModeToggle from '@theme-original/ColorModeToggle';
import type ColorModeToggleType from '@theme/ColorModeToggle';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof ColorModeToggleType>;

/**
 * Swizzled ColorModeToggle — wraps the default toggle to add a gradient-blur
 * bloom transition on click. Per BOAA-281 design-spec §3.
 */
export default function ColorModeToggleWrapper(props: Props): JSX.Element {
  const { value, onChange } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        onChange(value === 'dark' ? 'light' : 'dark');
        return;
      }

      // Respect reduced-motion preference — skip the bloom entirely.
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        onChange(value === 'dark' ? 'light' : 'dark');
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      const overlay = document.createElement('div');
      overlay.className = 'theme-transition-overlay';
      overlay.style.setProperty('--x', `${x}px`);
      overlay.style.setProperty('--y', `${y}px`);
      document.body.appendChild(overlay);

      // Swap theme mid-bloom so the change happens under the blur.
      window.setTimeout(() => {
        onChange(value === 'dark' ? 'light' : 'dark');
      }, 180);

      // Remove overlay after the full bloom animation completes.
      window.setTimeout(() => {
        overlay.remove();
      }, 430);
    },
    [value, onChange],
  );

  return (
    <span onClickCapture={handleClick}>
      <OriginalColorModeToggle {...props} />
    </span>
  );
}
