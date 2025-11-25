import React, { useState } from 'react';
import Background from './components/Background';
import Cake from './components/Cake';
import PolaroidGallery from './components/PolaroidGallery';
import SecretMessage from './components/SecretMessage';
import { AppStage } from './types';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.START);

  const startApp = () => {
      setStage(AppStage.CAKE);
  };

  const handleBlowout = () => {
    setStage(AppStage.MEMORIES);
  };

  const handleNext = () => {
    setStage(AppStage.SECRET);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      {/* Background stays persistent */}
      <Background />

      <main className="flex-grow flex items-center justify-center relative z-10 w-full">
        {stage === AppStage.START && (
            <div className="text-center animate-fade-in p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm mx-4">
                <h1 className="font-hand text-6xl md:text-7xl text-rose-500 mb-2 drop-shadow-sm">Hello Mitaashi!</h1>
                <p className="font-script text-3xl text-gray-700 mb-8">A little surprise awaits you...</p>
                <button 
                    onClick={startApp}
                    className="bg-white px-10 py-4 rounded-full shadow-lg font-hand text-3xl text-rose-400 hover:bg-rose-50 transition transform hover:scale-105 active:scale-95 border-2 border-rose-100 hover:text-rose-500"
                >
                    Let's Start ✨
                </button>
            </div>
        )}

        {stage === AppStage.CAKE && (
          <Cake onBlowout={handleBlowout} />
        )}

        {stage === AppStage.MEMORIES && (
          <PolaroidGallery onNext={handleNext} />
        )}

        {stage === AppStage.SECRET && (
          <SecretMessage />
        )}
      </main>

      {/* Footer/Music Control could go here */}
      <footer className="relative z-10 p-4 text-center font-body text-gray-500 text-xs">
        Made with 💖 for you
      </footer>
    </div>
  );
};

export default App;