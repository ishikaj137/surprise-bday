export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
}

// Augment window for canvas-confetti
declare global {
  interface Window {
    confetti: (options?: ConfettiOptions) => Promise<null> | null;
  }
}

export enum AppStage {
  START = 'START',
  CAKE = 'CAKE',
  MEMORIES = 'MEMORIES',
  SECRET = 'SECRET'
}

export interface Memory {
  id: number;
  imageUrl: string;
  caption: string;
  rotation: number;
}