import React, { useState } from "react";
import Link from "next/link";

interface Package {
  name: string;
  tagline: string;
  description: string;
  featured?: boolean;
}

const packages: Package[] = [
  {
    name: "Base Package",
    tagline: "Essential listing coverage",
    description:
      "Professional ground photography designed to showcase your property's best features. Perfect for clean, MLS-ready images that make your listing shine without extras. Delivered fully edited for web and print.",
  },
  {
    name: "Elevation Package",
    tagline: "Adds perspective & scale",
    description:
      "Ground photography plus aerial drone imagery to capture the full scope of your property. Aerials highlight location, lot size, and surroundings, creating listings that stand out in the market.",
  },
  {
    name: "Horizontal Video",
    tagline: "Bring the property to life",
    description:
      "Cinematic video coverage, including ground and drone footage, that tells a story and brings flow to your listing. Edited for MLS and online presentation, it's the perfect way to give buyers an immersive property experience.",
  },
  {
    name: "Signature Package",
    tagline: "Complete visual coverage",
    description:
      "The ultimate listing package: ground photography, drone photography, and both ground and aerial video. Fully edited and MLS-ready, ensuring every aspect of your property is presented with maximum impact.",
    featured: true,
  },
  {
    name: "Premium Package",
    tagline: "High-visibility marketing",
    description:
      "A full-scale marketing package designed to grab attention. Includes ground and drone photos, an MLS-style video tour, and two short-form vertical videos optimized for social media engagement. Perfect for listings that demand visibility and reach.",
  },
  {
    name: "Raw Land Package",
    tagline: "Visual clarity for land or underdeveloped properties",
    description:
      "Specialized coverage for land listings, focusing on scale, boundaries, and location. Includes drone photography and ground shots to define your property clearly, helping buyers see potential and value at a glance.",
  },
  {
    name: "Social Media Reels",
    tagline: "Show-stopping short-form video",
    description:
      "A cinematic 30–60 second reel crafted to capture attention instantly. Designed for social media, marketing campaigns, and high-impact listing promotion. Includes professional editing, music, and pacing optimized for maximum viewer retention.",
  },
];

const addOns = [
  "Virtual Staging",
  "Lawn Replacement",
  "On Camera Intro",
  "On Camera Intro + Highlights",
  "Property Outline",
  "Drop Pins",
  "Amenities",
  "Twilight",
  "Google Earth Satellite Imagery",
];

export default function Packages() {
  const signatureIndex = packages.findIndex(p => p.name === "Signature Package");
  const [currentIndex, setCurrentIndex] = useState(signatureIndex !== -1 ? signatureIndex : 0);

  const nextPackage = () => {
    setCurrentIndex((prev) => (prev + 1) % packages.length);
  };

  const prevPackage = () => {
    setCurrentIndex((prev) => (prev - 1 + packages.length) % packages.length);
  };

  const renderPackage = (pkg: Package) => (
    <div
      className={`relative p-8 flex flex-col justify-between h-full transition-all duration-500 min-h-[480px] md:min-h-0 ${
        pkg.featured
          ? "bg-zinc-900 text-white border border-[#D97706] shadow-xl"
          : "bg-white border border-zinc-200 shadow-sm"
      }`}
      style={{ borderRadius: '2px' }}
    >
      <div>
        {pkg.featured && (
          <div 
            className="absolute -top-3 left-8 bg-[#D97706] text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest z-20"
            style={{ borderRadius: '1px' }}
          >
            Signature Selection
          </div>
        )}
        <h3
          className={`text-xl font-bold mb-2 ${
            pkg.featured ? "text-white" : "text-zinc-900"
          }`}
        >
          {pkg.name}
        </h3>
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-6 ${
            pkg.featured ? "text-[#F59E0B]" : "text-[#D97706]"
          }`}
        >
          {pkg.tagline}
        </p>
        <p
          className={`text-sm leading-relaxed mb-8 ${
            pkg.featured ? "text-zinc-400 font-light" : "text-zinc-500 font-normal"
          }`}
        >
          {pkg.description}
        </p>
      </div>
      
      <div className={`pt-4 border-t ${pkg.featured ? 'border-zinc-800' : 'border-zinc-100'}`}>
        <Link
          href={`/book?package=${encodeURIComponent(pkg.name)}`}
          className={`flex items-center justify-center cursor-pointer border-black w-full py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
            pkg.featured 
              ? 'bg-[#D97706] text-white hover:bg-[#B45309]' 
              : 'bg-zinc-900 text-white hover:bg-zinc-700 border border-zinc-200 hover:border-zinc-900'
          }`}
        >
          Select Tier
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile Carousel View */}
      <div className="md:hidden overflow-hidden pt-4 pb-2">
        <div 
          className="flex transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${currentIndex * 100}% + 0px))` }}
        >
          {packages.map((pkg, idx) => {
            const isActive = currentIndex === idx;
            return (
              <div 
                key={idx} 
                className="w-full flex-shrink-0 px-4 transition-all duration-500 ease-in-out"
                style={{ 
                  transform: isActive ? 'scale(1)' : 'scale(0.92)',
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? 'blur(0)' : 'blur(1px)'
                }}
              >
                {renderPackage(pkg)}
              </div>
            );
          })}
        </div>
        
        {/* Navigation & Indicators Container */}
        <div className="flex items-center justify-between mt-8 px-4">
          <button 
            onClick={prevPackage}
            className="p-3 bg-white border border-zinc-200 rounded-full shadow-sm text-zinc-400 hover:text-zinc-900 active:scale-90 transition-all"
            aria-label="Previous package"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-1.5">
            {packages.map((_, idx) => (
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
            className="p-3 bg-white border border-zinc-200 rounded-full shadow-sm text-zinc-400 hover:text-zinc-900 active:scale-90 transition-all"
            aria-label="Next package"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        {packages.map((pkg, index) => {
          let colSpan = "md:col-span-4"; 
          if (index < 2 || index > 4) {
            colSpan = "md:col-span-6"; 
          }

          return (
            <div key={index} className={`${colSpan} ${pkg.featured ? 'md:scale-105 z-10' : ''}`}>
              {renderPackage(pkg)}
            </div>
          );
        })}
      </div>

      {/* Add-Ons Section - Infinite Marquee with 3D Focus */}
      <div className="mt-12 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 flex items-center gap-6">
          <div className="h-px flex-1 bg-zinc-100"></div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">Production Add-Ons</h3>
          <div className="h-px flex-1 bg-zinc-100"></div>
        </div>
        
        <div className="relative">          
          <div className="flex animate-marquee-infinite pt-12 items-center">
            {/* Multiplied array for seamless tiling */}
            {[...addOns, ...addOns, ...addOns, ...addOns].map((addon, index) => (
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
        // Higher exponent = more concentrated focus in the center
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
