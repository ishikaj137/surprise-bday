import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-lime opacity-60" />
      
      {/* Animated floating hearts/shapes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-30 text-pastel-pink"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${20 + Math.random() * 40}px`,
          }}
        >
          {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '🌸'}
        </div>
      ))}
    </div>
  );
};

export default Background;