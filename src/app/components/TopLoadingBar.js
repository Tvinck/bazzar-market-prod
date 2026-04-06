'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TopLoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(30);
    
    const t1 = setTimeout(() => setProgress(60), 100);
    const t2 = setTimeout(() => setProgress(90), 300);
    const t3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    }, 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      zIndex: 99999,
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #00E676, #33FF99, #00E676)',
        backgroundSize: '200% 100%',
        animation: 'loadingShimmer 1.5s ease-in-out infinite',
        borderRadius: '0 2px 2px 0',
        boxShadow: '0 0 10px rgba(0,230,118,0.5), 0 0 30px rgba(0,230,118,0.2)',
        transition: progress === 0 ? 'none' : 'width 0.3s ease-out',
        opacity: loading ? 1 : 0,
      }} />
    </div>
  );
}
