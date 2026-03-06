import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "../config/siteConfig";
import PhoneFrame from "../components/PhoneFrame";
import Navbar from "../components/Navbar";
import { Outfit, DM_Sans } from "next/font/google";
import SEO from "../components/SEO";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
export default function Gallery() {
  const { portfolio, global } = siteConfig;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-zinc-50 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-200 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`${outfit.variable} ${dmSans.variable} font-body bg-zinc-50 min-h-screen pb-32`}>
      <SEO 
        title="Full Portfolio" 
        description="Explore our complete collection of high-end real estate photography, cinematic walkthroughs, and social media reels."
      />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Page Content */}
      <main className="pt-40 max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <header className="mb-24 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6">
            The Full Archive
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 mb-8 leading-tight tracking-tighter font-heading">
                All <span className="text-accent">Work</span>
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
              <FilmCard key={film.id} film={film} />
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
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-12 tracking-tighter">Ready to showcase <br /><span className="text-accent">your listing?</span></h2>
            <Link 
              href="/book" 
              className="inline-block hover:bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold bg-accent transition-all duration-300"
              style={{ borderRadius: '1px' }}
            >
              Book Your Production
            </Link>
        </footer>

      </main>
    </div>
  );
}

function FilmCard({ film }: { film: any }) {
  const [isPaused, setIsPaused] = useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const videoId = getYouTubeId(film.src);

  const togglePlay = () => {
    if (!iframeRef.current) return;
    
    const command = isPaused ? 'playVideo' : 'pauseVideo';
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
    setIsPaused(!isPaused);
  };

  return (
    <div className="group">
      <div 
        className="aspect-video bg-zinc-900 relative overflow-hidden mb-6 cursor-pointer group/card" 
        style={{ borderRadius: '3px' }}
        onClick={togglePlay}
      >
        {videoId ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1&autoplay=1&mute=1`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            title={film.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video 
            src={film.src} 
            className="w-full h-full object-cover" 
            controls 
            playsInline
          />
        )}

        {/* Play/Pause Indicator Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none z-10 ${isPaused ? 'bg-black/20 opacity-100' : 'opacity-0'}`}>
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-100 group-hover/card:scale-110 transition-transform">
            {isPaused ? (
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-zinc-900 mb-1">{film.title}</h3>
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">{film.tagline}</p>
        <p className="text-sm text-zinc-500">{film.address}</p>
      </div>
    </div>
  );
}
