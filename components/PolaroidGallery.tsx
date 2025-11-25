import React from 'react';
import { Memory } from '../types';

// Import images directly so Vite includes them in the build and resolves correct URLs
import bestdayImg from './bestday.jpg';
import coffeeImg from './coffee.jpg';
import oldusImg from './oldus.jpg';
import usImg from './us.jpg';

const MEMORIES: Memory[] = [
  { id: 1, imageUrl: bestdayImg, caption: 'Best day ever!', rotation: -3 },
  { id: 2, imageUrl: coffeeImg, caption: 'Coffee dates ☕️', rotation: 2 },
  { id: 3, imageUrl: oldusImg, caption: 'Old us', rotation: -1 },
  { id: 4, imageUrl: usImg, caption: 'Us <3', rotation: 4 },
];

interface GalleryProps {
  onNext: () => void;
}

const PolaroidGallery: React.FC<GalleryProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in z-10 relative">
      <div className="text-center mb-10">
        <h1 className="font-script text-6xl md:text-8xl text-black mb-2 drop-shadow-sm p-2 animate-pulse">
          Happy Birthday Mitaashi!
        </h1>
        <p className="font-script text-2xl text-gray-700">
          Here&apos;s a little glimpse of our beautiful memories...
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 place-items-center mb-12">
        {MEMORIES.map((mem, i) => (
          <div
            key={mem.id}
            style={{ transform: `rotate(${mem.rotation}deg)` }}
            className="relative"
          >
            <div className="group bg-white p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:z-20 cursor-pointer relative max-w-[280px]">
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/80 transform -rotate-1 shadow-sm z-10" />

              {/* Cute stickers randomly placed */}
              {i % 2 === 0 && <div className="absolute -top-4 -right-2 text-3xl z-30 animate-pulse">💖</div>}
              {i % 3 === 0 && <div className="absolute -bottom-2 -left-2 text-3xl z-30">✨</div>}

              <div className="aspect-square w-full overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                <img
                  src={mem.imageUrl}
                  alt={mem.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to Unsplash if local image is missing
                    console.warn(`Image not found: ${mem.imageUrl}, using fallback.`);
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>

              <p className="font-script text-3xl text-center text-gray-700 -rotate-1">
                {mem.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onNext}
          className="bg-pastel-pink hover:bg-pink-200 text-rose-600 font-hand text-2xl px-8 py-3 rounded-full shadow-md transition transform hover:-translate-y-1 active:translate-y-0 border-2 border-white"
        >
          One last surprise... 💌
        </button>
      </div>
    </div>
  );
};

export default PolaroidGallery;