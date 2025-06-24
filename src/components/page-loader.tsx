'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // On new page load, hide the loader
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // Effect to detect navigation start (for client-side navigation)
  useEffect(() => {
    const handleStart = () => setIsLoading(true);

    const originalPushState = history.pushState;
    // Wrap pushState to detect when a new page is being navigated to
    history.pushState = function (...args) {
      handleStart();
      originalPushState.apply(history, args);
    };

    // For browser back/forward buttons
    window.addEventListener('popstate', handleStart);

    return () => {
      // Restore original functions on component unmount
      history.pushState = originalPushState;
      window.removeEventListener('popstate', handleStart);
    };
  }, []);

  // Effect to manage the progress bar simulation
  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (isLoading) {
      setProgress(10); // Start immediately with a small value
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressTimer);
            return prev;
          }
          // Simulate a non-linear progress animation
          const diff = 100 - prev;
          const increment = diff / 15;
          return Math.min(prev + increment, 95);
        });
      }, 250);
    } else {
      // When loading finishes, jump to 100%
      setProgress(100);
      // And then hide it after a short delay to allow the animation to complete
      hideTimer = setTimeout(() => {
        setProgress(0);
      }, 500); // This duration should match the transition-opacity duration
    }

    return () => {
      clearInterval(progressTimer);
      clearTimeout(hideTimer);
    };
  }, [isLoading]);

  // The container's visibility is controlled by opacity for smooth transitions
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none transition-opacity duration-500',
        isLoading || progress > 0 ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Progress
        value={progress}
        className="h-full w-full rounded-none bg-primary shadow-[0_0_10px_theme(colors.primary),0_0_5px_theme(colors.primary)]"
      />
    </div>
  );
}
