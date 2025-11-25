import React, { useEffect, useState, useRef, useCallback } from 'react';

interface CakeProps {
  onBlowout: () => void;
}

const Cake: React.FC<CakeProps> = ({ onBlowout }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const flameRef = useRef<HTMLDivElement>(null);

  const cleanupAudio = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(e => console.error("Error closing AudioContext:", e));
      }
      audioContextRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      setMicPermission(true);

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const microphone = audioContext.createMediaStreamSource(stream);
      sourceRef.current = microphone;
      microphone.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      dataArrayRef.current = dataArray;

      detectBlow();
    } catch (err) {
      console.error("Microphone access denied or error", err);
      setMicPermission(false);
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current || !dataArrayRef.current || !candlesLit) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      sum += dataArrayRef.current[i];
    }
    const average = sum / dataArrayRef.current.length;

    // Threshold for "blowing"
    if (average > 40) { // Adjust sensitivity as needed
      extinguishCandles();
    } else {
      requestAnimationFrame(detectBlow);
    }
  };

  const extinguishCandles = () => {
    setCandlesLit(false);
    cleanupAudio();
    
    // Confetti explosion
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#FFD1DC', '#E6E6FA', '#D7F4D2', '#FFFFFF']
      });
    }

    setTimeout(() => {
      onBlowout();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in relative z-10 w-full">
      
      {/* Instruction/Status - Increased bottom margin to prevent overlapping */}
      <div className="mb-24 text-center h-20 px-4 relative z-20">
        {candlesLit && (
          <div className="font-script text-3xl md:text-5xl text-gray-700 animate-pulse leading-relaxed">
            {micPermission === false 
              ? "Tap the flames to make a wish!" 
              : micPermission === true 
                ? "Blow on your screen!" 
                : <button onClick={startListening} className="bg-white/60 hover:bg-white/90 backdrop-blur-sm transition px-8 py-3 rounded-full shadow-md text-2xl font-script text-rose-500 border-2 border-white">Tap to light & make a wish ✨</button>
            }
          </div>
        )}
        {!candlesLit && (
            <p className="font-hand text-5xl text-pastel-purple drop-shadow-md">Yay! Make a wish!</p>
        )}
      </div>

      {/* The Cake - Added mt-12 for extra safety spacing */}
      <div className="relative mt-12 scale-110 md:scale-125">
        {/* Plate */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-4 bg-white rounded-full shadow-md z-0" />

        {/* Base Tier */}
        <div className="w-56 h-24 bg-rose-200 rounded-lg relative border-4 border-rose-300 z-10 flex items-center justify-center shadow-inner">
             {/* Icing drips */}
             <div className="absolute top-0 w-full h-4">
                <div className="w-full h-full flex">
                    {Array.from({length: 7}).map((_, i) => (
                        <div key={i} className="flex-1 bg-white rounded-b-full h-6 mx-1 opacity-90 shadow-sm" />
                    ))}
                </div>
             </div>
        </div>

        {/* Top Tier */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-40 h-20 bg-rose-100 rounded-lg border-4 border-rose-200 z-20 flex items-center justify-center shadow-sm">
            {/* Icing */}
             <div className="absolute top-0 w-full h-4">
                <div className="w-full h-full flex">
                    {Array.from({length: 5}).map((_, i) => (
                        <div key={i} className="flex-1 bg-white rounded-b-full h-5 mx-1 opacity-90 shadow-sm" />
                    ))}
                </div>
             </div>
             <span className="font-hand text-rose-400 text-2xl mt-4 tracking-wider">Mitaashi</span>
        </div>

        {/* Candle */}
        <div className="absolute bottom-[176px] left-1/2 -translate-x-1/2 w-4 h-16 bg-stripes-pink rounded-sm z-10" 
             style={{ background: 'repeating-linear-gradient(45deg, #FFF, #FFF 5px, #FFD1DC 5px, #FFD1DC 10px)' }}>
          
          {/* Flame */}
          <div 
            ref={flameRef}
            onClick={extinguishCandles}
            className={`absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-8 bg-orange-300 rounded-[50%] 
                       ${candlesLit ? 'opacity-100 animate-flicker cursor-pointer' : 'opacity-0 duration-500'} 
                       shadow-[0_0_20px_#ff9900] origin-bottom transition-all`}
          >
            <div className="w-full h-full bg-yellow-200 rounded-[50%] scale-75 blur-[1px]" />
          </div>
        </div>

      </div>

      {!candlesLit && (
        <div className="mt-16 animate-fade-in">
            <p className="text-rose-500 font-script text-xl">Redirecting to party...</p>
        </div>
      )}
    </div>
  );
};

export default Cake;