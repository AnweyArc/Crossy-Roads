'use client';
import { useEffect, useRef } from 'react';
import GameUI from '@/components/GameUI'; // ✅ import your UI


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

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-black">
      <GameUI />
    </div>
  );
}
