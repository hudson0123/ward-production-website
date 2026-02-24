import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "../config/siteConfig";

interface Package {
  name: string;
  tagline: string;
  description: string;
  featured?: boolean;
  mediaSrc: string;
  mediaType: string;
}

export default function Packages() {
  const { packages } = siteConfig;
  const signatureIndex = packages.list.findIndex(p => p.name === "Signature Package");
  const [currentIndex, setCurrentIndex] = useState(signatureIndex !== -1 ? signatureIndex : 0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const nextPackage = () => {
    setCurrentIndex((prev: number) => (prev + 1) % packages.list.length);
  };

  const prevPackage = () => {
    setCurrentIndex((prev: number) => (prev - 1 + packages.list.length) % packages.list.length);
  };

  const renderPackage = (pkg: Package) => (
    <div
      className={`relative p-0 flex flex-col justify-between h-full transition-all duration-500 min-h-[420px] md:min-h-[480px] ${
        pkg.featured
          ? "bg-zinc-900 text-white border border-[#D97706] shadow-xl"
          : "bg-white border border-zinc-200 shadow-sm"
      }`}
      style={{ borderRadius: '2px' }}
    >
      <div className="p-7">
        {pkg.featured && (
          <div 
            className="absolute -top-3 left-8 bg-[#D97706] text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest z-20"
            style={{ borderRadius: '1px' }}
          >
            Signature Selection
          </div>
        )}
        <h3
          className={`text-lg font-bold mb-1.5 ${
            pkg.featured ? "text-white" : "text-zinc-900"
          }`}
        >
          {pkg.name}
        </h3>
        <p
          className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-4 ${
            pkg.featured ? "text-[#F59E0B]" : "text-[#D97706]"
          }`}
        >
          {pkg.tagline}
        </p>
        <p
          className={`text-[13px] leading-relaxed ${
            pkg.featured ? "text-zinc-400 font-bold " : "text-zinc-500 font-normal"
          }`}
        >
          {pkg.description}
        </p>
      </div>
      
      <div className="mt-auto w-full aspect-video bg-zinc-100 relative group overflow-hidden" style={{ borderBottomLeftRadius: '2px', borderBottomRightRadius: '2px' }}>
        <Link href="/book" className="block w-full h-full cursor-pointer">
          {pkg.mediaType === 'video' ? (
            <video
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={pkg.mediaSrc}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img 
              src={pkg.mediaSrc} 
              alt={pkg.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
             <span className="text-white text-[10px] uppercase tracking-widest font-bold border-b border-white pb-1">
               Book Now
             </span>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full md:px-12 relative group/section">
      {/* Navigation Arrows for Desktop */}
      <button 
        onClick={prevPackage}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white border border-zinc-200 rounded-full shadow-lg items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 active:scale-95 transition-all opacity-100 cursor-pointer"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={nextPackage}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white border border-zinc-200 rounded-full shadow-lg items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 active:scale-95 transition-all opacity-100 cursor-pointer"
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden pt-8 pb-4">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` 
          }}
        >
          {packages.list.map((pkg: Package, idx: number) => {
            return (
              <div 
                key={idx} 
                className="flex-shrink-0 px-3 md:px-4"
                style={{ width: `${100 / visibleCards}%` }}
              >
                {renderPackage(pkg)}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation Indicators */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-6">
        {/* Mobile controls (hidden on desktop except indicators) */}
        <div className="flex md:hidden items-center justify-between w-full">
          <button 
            onClick={prevPackage}
            className="p-3 bg-white border border-zinc-200 rounded-full shadow-sm text-zinc-400 hover:text-zinc-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-1.5">
            {packages.list.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-[#D97706]" : "w-1.5 bg-zinc-200"
                }`}
                style={{ borderRadius: '10px' }}
              />
            ))}
          </div>

          <button 
            onClick={nextPackage}
            className="p-3 bg-white border border-zinc-200 rounded-full shadow-sm text-zinc-400 hover:text-zinc-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop Indicators */}
        <div className="hidden md:flex justify-center flex-1 gap-2">
          {packages.list.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 ${
                currentIndex === idx ? "w-12 bg-[#D97706]" : "w-4 bg-zinc-100 hover:bg-zinc-200"
              }`}
              style={{ borderRadius: '10px' }}
            />
          ))}
        </div>
      </div>

      {/* Infinite Marquee of Add-Ons */}
      <div className="mt-16 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 flex items-center gap-6">
          <div className="h-px flex-1 bg-zinc-100"></div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">Production Add-Ons</h3>
          <div className="h-px flex-1 bg-zinc-100"></div>
        </div>
        
        <div className="relative">          
          <div className="flex animate-marquee-infinite pt-12 items-center">
            {/* Multiplied array for seamless tiling */}
            {[...packages.addOns, ...packages.addOns, ...packages.addOns, ...packages.addOns].map((addon, index) => (
              <AddOnTag key={index} name={addon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddOnTag({ name }: { name: string }) {
  const tagRef = React.useRef<HTMLSpanElement>(null);
  const [scale, setScale] = React.useState(1);
  const [opacity, setOpacity] = React.useState(0.5);

  React.useEffect(() => {
    let frameId: number;
    
    const updateScale = () => {
      if (tagRef.current) {
        const rect = tagRef.current.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const itemCenter = rect.left + rect.width / 2;
        const isMobile = window.innerWidth < 768;
        
        // Calculate distance from center (0 to 1)
        const maxDist = window.innerWidth / 2;
        const dist = Math.abs(centerX - itemCenter);
        const normalizedDist = Math.min(dist / maxDist, 1);
        
        // Responsive curve logic
        const exponent = isMobile ? 3.5 : 1.5;
        const scaleIntensity = isMobile ? 0.3 : 0.2;
        
        const newScale = 1 + (scaleIntensity * (1 - Math.pow(normalizedDist, exponent)));
        const newOpacity = (isMobile ? 0.3 : 0.35) + (0.65 * (1 - normalizedDist));
        
        setScale(newScale);
        setOpacity(newOpacity);
      }
      frameId = requestAnimationFrame(updateScale);
    };
    
    frameId = requestAnimationFrame(updateScale);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <span
      ref={tagRef}
      className="mx-12 px-5 py-2 bg-white text-zinc-800 text-[9px] font-bold uppercase tracking-[0.25em] border border-zinc-100 shadow-md transition-transform duration-100 ease-out whitespace-nowrap inline-block"
      style={{ 
        borderRadius: '1px',
        transform: `scale(${scale})`,
        opacity: opacity,
        boxShadow: scale > 1.1 ? '0 10px 30px -10px rgba(217,119,6,0.12)' : 'none'
      }}
    >
      {name}
    </span>
  );
}
