import React from 'react';

const PromoBanners: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div 
                className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
            >
                <img src="https://picsum.photos/seed/promo1/600/300" alt="Promotion 1" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                    <div>
                        <h4 className="text-white font-bold text-lg">Gaming Gear Sale</h4>
                        <p className="text-slate-300 text-sm">Up to 30% off</p>
                    </div>
                </div>
            </div>
            <div 
                className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
            >
                <img src="https://picsum.photos/seed/promo2/600/300" alt="Promotion 2" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                    <div>
                        <h4 className="text-white font-bold text-lg">New UltraBooks</h4>
                        <p className="text-slate-300 text-sm">Power meets portability</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoBanners;
