'use client';
import { useEffect, useRef } from 'react';

export default function GamePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadGame = async () => {
      const { initGame } = await import('@/game/GameManager.js');
      if (typeof window !== 'undefined' && initGame && containerRef.current) {
        initGame(containerRef.current);
      }
    };
    loadGame();
  }, []);

  return <div ref={containerRef} className="w-screen h-screen overflow-hidden" />;
}
