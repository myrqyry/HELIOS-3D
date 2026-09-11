import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isMathJaxReady, waitForMathJax, typesetMathJax } from './mathjax';

describe('mathjax utility in node / SSR environment', () => {
  it('safely handles missing window in SSR without throwing', async () => {
    expect(isMathJaxReady()).toBe(false);
    await expect(waitForMathJax(100)).resolves.toBe(false);
    await expect(typesetMathJax()).resolves.toBeUndefined();
  });
});

describe('mathjax utility with window mock', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    (global as unknown as { window: unknown }).window = {
      MathJax: undefined,
    };
  });

  afterEach(() => {
    (global as unknown as { window: unknown }).window = originalWindow;
  });

  it('reports MathJax as not ready when window.MathJax is missing', () => {
    expect(isMathJaxReady()).toBe(false);
  });

  it('reports MathJax as ready when typesetPromise function is present', () => {
    window.MathJax = {
      typesetPromise: vi.fn().mockResolvedValue(undefined),
    };
    expect(isMathJaxReady()).toBe(true);
  });

  it('gracefully completes typesetMathJax when MathJax is not present', async () => {
    await expect(typesetMathJax()).resolves.toBeUndefined();
  });

  it('invokes typesetPromise and typesetClear when MathJax is present', async () => {
    const typesetPromise = vi.fn().mockResolvedValue(undefined);
    const typesetClear = vi.fn();
    window.MathJax = {
      typesetPromise,
      typesetClear,
    };

    const dummyEl = {} as HTMLElement;
    await typesetMathJax(dummyEl);

    expect(typesetClear).toHaveBeenCalledWith([dummyEl]);
    expect(typesetPromise).toHaveBeenCalledWith([dummyEl]);
  });

  it('resolves waitForMathJax when startup promise resolves', async () => {
    let resolveStartup: () => void = () => {};
    const startupPromise = new Promise<void>((resolve) => {
      resolveStartup = resolve;
    });

    window.MathJax = {
      startup: {
        promise: startupPromise,
      },
    };

    const waitPromise = waitForMathJax(1000);

    // Simulate MathJax finishing initialization and assigning typesetPromise
    window.MathJax.typesetPromise = vi.fn().mockResolvedValue(undefined);
    resolveStartup();

    const ready = await waitPromise;
    expect(ready).toBe(true);
  });
});
