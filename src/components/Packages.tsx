import React from "react";

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
  return (
    <div className="w-full">
      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
        {packages.map((pkg, index) => {
          // Determine column span for 2-3-2 layout
          let colSpan = "md:col-span-4"; // Default for middle row
          if (index < 2 || index > 4) {
            colSpan = "md:col-span-6"; // Row 1 and Row 3
          }

          return (
            <div
              key={index}
              className={`relative p-8 transition-all duration-500 ${colSpan} flex flex-col justify-between ${
                pkg.featured
                  ? "bg-zinc-900 text-white border border-[#D97706] md:scale-105 z-10 shadow-xl"
                  : "bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm"
              }`}
              style={{ borderRadius: '2px' }}
            >
              <div>
                {pkg.featured && (
                  <div 
                    className="absolute -top-3 left-8 bg-[#D97706] text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest"
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
                <button className={`cursor-pointer border-black w-full py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  pkg.featured 
                    ? 'bg-[#D97706] text-white hover:bg-[#B45309]' 
                    : 'bg-zinc-900 text-white hover:bg-zinc-700 border border-zinc-200 hover:border-zinc-900'
                }`}>
                  Select Tier
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-Ons Section */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-zinc-200"></div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Add-Ons</h3>
          <div className="h-px flex-1 bg-zinc-200"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {addOns.map((addon, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-zinc-100 text-zinc-700 text-sm font-medium hover:bg-zinc-200 hover:text-zinc-900 transition-colors cursor-default"
              style={{ borderRadius: '4px' }}
            >
              {addon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
