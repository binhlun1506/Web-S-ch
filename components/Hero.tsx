import React from 'react';

interface HeroProps {
  onShopNowClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNowClick }) => {
  return (
    <div className="relative bg-slate-900 h-[400px] flex items-center justify-center text-center overflow-hidden rounded-lg shadow-2xl">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://picsum.photos/seed/techbg/1200/600')" }}
      >
        <div className="absolute inset-0 bg-black/60 animated-gradient-overlay opacity-50"></div>
      </div>
      <div className="relative z-10 px-4 animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Discover the Future of <span className="text-gradient">Tech</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-md sm:text-lg text-slate-300">
          High-performance laptops and accessories for everyone.
        </p>
        <div className="mt-8">
          <button
            onClick={onShopNowClick}
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Khám phá ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;