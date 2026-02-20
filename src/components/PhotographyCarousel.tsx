import React, { useState, useRef, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

// ─────────────────────────────────────────────
// PHOTOGRAPHY CAROUSEL
// ─────────────────────────────────────────────
function PhotographyCarousel({ items }: { items: any[] }) {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <section className="w-full mb-12 group">
      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 font-semibold mb-6">
        {siteConfig.portfolio.photographyTitle}
      </p>
      <div className="relative w-full overflow-hidden" style={{ borderRadius: "3px" }}>
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / visibleItems)}%)` }}
        >
          {items.map((item, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 px-1 md:px-2"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="aspect-[16/9] bg-zinc-100 relative overflow-hidden" style={{ borderRadius: "2px" }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={prev}
          className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-100 hover:bg-white/20 transition-all duration-300 z-10"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-100 hover:bg-white/20 transition-all duration-300 z-10"
          aria-label="Next image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Caption & Counter / Indicators */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6 md:gap-4 px-2">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] order-3 md:order-1 text-center md:text-left">
          {items[index] ? items[index].alt : ""}
        </p>
        
        <div className="flex flex-col md:flex-row items-center gap-6 order-1 md:order-2 w-full md:w-auto">
            {/* Dots for mobile - Centered */}
            <div className="flex flex-wrap justify-center gap-1.5 md:hidden max-w-[240px]">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                            index === i ? "w-6 bg-[#D97706]" : "w-1.5 bg-zinc-200"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            <div className="flex items-center gap-3 order-2">
                <p className="text-[10px] text-zinc-900 tracking-[0.3em] font-bold bg-zinc-50 px-4 py-1.5 border border-zinc-100" style={{ borderRadius: '1px' }}>
                    {String(index + 1).padStart(2, "0")} <span className="text-zinc-300 mx-1">/</span> {String(items.length).padStart(2, "0")}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}

export default PhotographyCarousel;