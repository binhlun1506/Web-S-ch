import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-700/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
           <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h1 className="text-2xl font-bold text-white tracking-tight">
               <span className="text-gradient">TechGalaxy</span>
            </h1>
          </div>
          <div className="text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} TechGalaxy Store. All rights reserved.</p>
            <p className="mt-1">A Modern E-commerce Experience.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;