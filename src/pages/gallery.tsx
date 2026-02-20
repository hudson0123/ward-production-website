import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "../config/siteConfig";
import PhoneFrame from "../components/PhoneFrame";
import { Outfit, DM_Sans } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export default function Gallery() {
  const { portfolio, global } = siteConfig;

  return (
    <div className={`${outfit.variable} ${dmSans.variable} font-body bg-zinc-50 min-h-screen pb-32`}>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/ward.png"
              alt="Ward Creatives Logo"
              width={100}
              height={80}
              className="cursor-pointer"
            />
          </Link>
          <Link 
            href="/"
            className="text-[11px] uppercase tracking-widest font-bold text-zinc-400 hover:text-[#D97706] transition-all flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-40 max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <header className="mb-24 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6">
            The Full Archive
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 mb-8 leading-tight tracking-tighter font-heading">
                All <span className="text-[#D97706]">Work</span>
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed text-lg">
            An exhaustive collection of our architectural photography, cinematic property tours, and high-impact social media content.
          </p>
        </header>

        {/* Photography Grid */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-900 whitespace-nowrap">Photography</h2>
            <div className="h-px w-full bg-zinc-100" />
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {portfolio.photography.map((photo) => (
              <div 
                key={photo.id} 
                className="relative group bg-zinc-100 overflow-hidden"
                style={{ borderRadius: '2px' }}
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-[10px] uppercase tracking-widest font-bold">
                    {photo.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Estate Films */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-900 whitespace-nowrap">Cinematic Films</h2>
            <div className="h-px w-full bg-zinc-100" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {portfolio.films.map((film) => (
              <div key={film.id} className="group">
                <div className="aspect-video bg-zinc-900 relative overflow-hidden mb-6" style={{ borderRadius: '3px' }}>
                  <video 
                    src={film.src} 
                    className="w-full h-full object-cover" 
                    controls 
                    playsInline
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">{film.title}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D97706] font-bold mb-2">{film.tagline}</p>
                  <p className="text-sm text-zinc-500">{film.address}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Media Reels */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-900 whitespace-nowrap">Social Reels</h2>
            <div className="h-px w-full bg-zinc-100" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {portfolio.reels.map((reel) => (
              <div key={reel.id} className="flex flex-col items-center">
                <div className="w-full max-w-[280px]">
                  <PhoneFrame reel={reel} isCenter={false} isMiddle={false} />
                </div>
                <div className="mt-6 text-center">
                   <h4 className="text-sm font-bold text-zinc-900 mb-1">{reel.title}</h4>
                   <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{reel.views} Views</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <footer className="mt-48 text-center ">
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-12 tracking-tighter">Ready to showcase <br /><span className="text-[#D97706]">your listing?</span></h2>
            <Link 
              href="/book" 
              className="inline-block hover:bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold bg-[#D97706] transition-all duration-300"
              style={{ borderRadius: '1px' }}
            >
              Book Your Production
            </Link>
        </footer>

      </main>
    </div>
  );
}
