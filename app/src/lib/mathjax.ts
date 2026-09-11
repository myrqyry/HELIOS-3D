import { useEffect, type RefObject } from 'react';

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: (HTMLElement | Element | null)[]) => Promise<void>;
      typesetClear?: (elements?: (HTMLElement | Element | null)[]) => void;
      startup?: {
        promise?: Promise<void>;
        defaultPageReady?: () => Promise<void>;
      };
    };
  }
}

/**
 * Checks if MathJax is currently loaded and ready to typeset.
 */
export function isMathJaxReady(): boolean {
  return typeof window !== 'undefined' && typeof window.MathJax?.typesetPromise === 'function';
}

/**
 * Waits for MathJax to be loaded and initialized, resolving true if ready or false on timeout.
 */
export function waitForMathJax(timeoutMs = 3000): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (isMathJaxReady()) return Promise.resolve(true);

  // If no MathJax object or script is registered in the DOM, MathJax is not present.
  const hasScript =
    typeof document !== 'undefined' &&
    !!document.querySelector('script[src*="mathjax"], script#MathJax-script');
  if (!window.MathJax && !hasScript) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    let resolved = false;

    const onReady = () => {
      if (!resolved) {
        resolved = true;
        resolve(true);
      }
    };

    if (window.MathJax?.startup?.promise) {
      window.MathJax.startup.promise.then(onReady).catch(() => {
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      });
    }

    const interval = setInterval(() => {
      if (isMathJaxReady()) {
        clearInterval(interval);
        onReady();
      }
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!resolved) {
        resolved = true;
        resolve(isMathJaxReady());
      }
    }, timeoutMs);
  });
}

/**
 * Typesets mathematical expressions in the specified container or the whole document.
 */
export async function typesetMathJax(
  container?: HTMLElement | null,
  timeoutMs = 3000
): Promise<void> {
  if (typeof window === 'undefined') return;

  const ready = await waitForMathJax(timeoutMs);
  if (!ready || !window.MathJax?.typesetPromise) {
    return;
  }

  const elements = container ? [container] : undefined;

  try {
    if (window.MathJax.typesetClear && elements) {
      window.MathJax.typesetClear(elements);
    }
    await window.MathJax.typesetPromise(elements);
  } catch (error) {
    console.warn('MathJax typesetting error:', error);
  }
}

/**
 * React hook that triggers MathJax typesetting on a target container whenever dependencies change.
 */
export function useMathJax(containerRef?: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    let active = true;

    const frameId = requestAnimationFrame(() => {
      if (!active) return;
      const target = containerRef ? containerRef.current : null;
      typesetMathJax(target);
    });

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
