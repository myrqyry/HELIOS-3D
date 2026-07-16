import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react';

export type DeferredSceneLoader<SceneProps extends object> = () => Promise<{ default: ComponentType<SceneProps> }>;

export function shouldActivateDeferredScene(isIntersecting: boolean, intersectionRatio: number): boolean {
  return isIntersecting || intersectionRatio > 0;
}

interface DeferredSceneProps<SceneProps extends object> {
  loader: DeferredSceneLoader<SceneProps>;
  sceneProps: SceneProps;
  fallback: ReactNode;
  rootMargin?: string;
}

export function DeferredScene<SceneProps extends object>({
  loader,
  sceneProps,
  fallback,
  rootMargin = '400px',
}: DeferredSceneProps<SceneProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const LazyScene = useMemo(() => lazy(loader), [loader]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && shouldActivateDeferredScene(entry.isIntersecting, entry.intersectionRatio)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {active ? <Suspense fallback={fallback}><LazyScene {...sceneProps} /></Suspense> : fallback}
    </div>
  );
}
