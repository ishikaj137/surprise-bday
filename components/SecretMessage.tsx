import React, { useState } from 'react';

const SecretMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (window.confetti) {
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        window.confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.5 },
          colors: ['#FFD1DC', '#E6E6FA']
        });
        window.confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.5 },
          colors: ['#D7F4D2', '#D4F1F4']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 animate-fade-in z-10 relative">
      {!isOpen ? (
        <div 
            onClick={handleOpen}
            className="cursor-pointer group transform transition-all duration-500 hover:scale-110"
        >
             {/* Simple CSS Envelope */}
            <div className="relative w-72 h-52 bg-pastel-pink shadow-xl flex items-center justify-center rounded-lg overflow-hidden border-2 border-white/50">
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[144px] border-r-[144px] border-t-[110px] border-l-transparent border-r-transparent border-t-rose-300 transform origin-top transition-transform duration-500 group-hover:rotate-x-180 z-20"></div>
                <div className="text-5xl animate-bounce"></div>
                <div className="absolute bottom-4 font-script text-2xl text-rose-800 opacity-0 group-hover:opacity-100 transition-opacity">Tap to open</div>
            </div>
        </div>
      ) : (
        <div className="bg-white/95 backdrop-blur-sm p-8 max-w-lg w-full rounded-lg shadow-xl border-4 border-pastel-pink animate-pop transform rotate-1 relative">
           {/* Decorative corner */}
           <div className="absolute -top-3 -right-3 text-4xl transform rotate-12">🌸</div>

          <h2 className="font-hand text-4xl text-rose-500 mb-6 text-center">To My Dearest Mitaashi,</h2>
          <div className="font-script text-gray-700 leading-relaxed text-2xl space-y-4">
            <p>
              Happy Birthday! 🎉
            </p>
            <p>
              I am so incredibly lucky to have you in my life. You bring so much sunshine, laughter, and chaos (the good kind!) into my world. 
            </p>
            <p>
              From our endless coffee dates to our late-night talks, every memory with you is a treasure I hold close to my heart. May this year bring you all the love, success, and cute outfits you deserve!
            </p>
            <p>
              Love you to the moon and back! 🌙✨
            </p>
          </div>
          <div className="mt-8 text-right font-hand text-3xl text-rose-400">
            - Your Bestie Ishika
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretMessage;