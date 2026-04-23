import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

/**
 * Signal Dot — mouse-reactive 24x24 cyan orb with spring-inertia follow.
 * Pinia eye-tracking inspired (not copied). Source: BOAA-281 §8.
 */
export default function SignalDot(): JSX.Element | null {
  const dotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Hide on touch / coarse pointer devices.
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const container = containerRef.current;
    if (!dot || !container) return;

    let dotX = 0;
    let dotY = 0;
    let targetX = 0;
    let targetY = 0;
    const MAX_RADIUS = 48;
    const STIFFNESS = 0.06;

    let hovered = false;
    let rafId = 0;
    let lastMoveAt = Date.now();

    const heroEl =
      container.closest('section') ?? container.parentElement ?? container;

    const onMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Scale pointer delta down, clamp to radius.
      const scale = 0.15;
      let tx = dx * scale;
      let ty = dy * scale;
      const mag = Math.hypot(tx, ty);
      if (mag > MAX_RADIUS) {
        tx = (tx / mag) * MAX_RADIUS;
        ty = (ty / mag) * MAX_RADIUS;
      }
      targetX = tx;
      targetY = ty;
      lastMoveAt = Date.now();
      if (!hovered) {
        hovered = true;
        dot.style.opacity = '0.7';
      }
    };

    const onLeave = () => {
      hovered = false;
      targetX = 0;
      targetY = 0;
      dot.style.opacity = '0.3';
    };

    const tick = () => {
      dotX += (targetX - dotX) * STIFFNESS;
      dotY += (targetY - dotY) * STIFFNESS;

      // Idle drift — if no mouse movement for 3s, nudge target slowly.
      const idle = Date.now() - lastMoveAt > 3000;
      if (idle && !hovered) {
        const t = Date.now() / 1000;
        targetX = Math.sin(t * 0.4) * 6;
        targetY = Math.cos(t * 0.5) * 4;
      }

      dot.style.transform = `translate(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px)`;
      rafId = window.requestAnimationFrame(tick);
    };

    heroEl.addEventListener('mousemove', onMove as EventListener);
    heroEl.addEventListener('mouseleave', onLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      heroEl.removeEventListener('mousemove', onMove as EventListener);
      heroEl.removeEventListener('mouseleave', onLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.signalDotAnchor} ref={containerRef} aria-hidden="true">
      <div className={styles.signalDot} ref={dotRef} />
    </div>
  );
}
