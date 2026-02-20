import { Outfit, DM_Sans } from "next/font/google";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PortfolioGallery from "../components/PortfolioGallery";
import Packages from "../components/Packages";
import Contact from "../components/Contact";
import { siteConfig } from "../config/siteConfig";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export default function Home() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isHeroClear, setIsHeroClear] = useState(false);
  const [showMobileFAB, setShowMobileFAB] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after 200px and only on mobile
      setShowMobileFAB(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className={`${outfit.variable} ${dmSans.variable} font-sans min-h-screen bg-white arch-grid-container`}>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Persistent Architectural Lines */}
      <div className="arch-line-v left-[10%] opacity-50 bottom-0" />
      <div className="arch-line-v left-[90%] opacity-50 bottom-0" />
      <div className="arch-line-v left-1/2 -translate-x-1/2 opacity-30 hidden md:block bottom-0" />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full h-screen flex items-end overflow-hidden"
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={siteConfig.hero.videoSrc} type="video/mp4" />
        </video>
        
        {/* Cinematic Gradient Overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${isHeroClear ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.75) 100%)'
          }} 
        />

        {/* Geometric Accents */}
        <div 
          className={`absolute top-20 right-10 w-32 h-32 border border-white/10 transition-opacity duration-700 ${isHeroClear ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: 'rotate(45deg)' }}
        />
        <div 
          className={`absolute bottom-32 left-16 w-20 h-20 border border-white/10 transition-opacity duration-700 hidden md:block ${isHeroClear ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: 'rotate(45deg)' }}
        />

        {/* Hero Content - Left-aligned editorial layout */}
        <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 pb-28 md:pb-32 transition-opacity duration-700 ${isHeroClear ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <p 
            className="text-[10px] uppercase tracking-[0.4em] text-white/70 mb-5 font-medium flex items-center gap-4 hero-stagger-1"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            <span className="w-8 h-px bg-white/40" />
            {siteConfig.hero.tagline}
          </p>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight hero-stagger-2"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4), 0 4px 40px rgba(0,0,0,0.2)' }}
          >
            {siteConfig.hero.titlePrimary}
            <br />
            <span className="text-[#D97706]" style={{ textShadow: '0 2px 20px rgba(217,119,6,0.3), 0 4px 40px rgba(0,0,0,0.3)' }}>
              {siteConfig.hero.titleSecondary}
            </span>
          </h1>
          <p 
            className="text-sm md:text-base lg:text-lg text-white/80 mb-8 max-w-lg leading-relaxed font-light hero-stagger-3"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            {siteConfig.hero.description}
          </p>
          <div className="flex items-center gap-6 hero-stagger-4">
            <Link
              href="/book"
              className="btn-primary"
            >
              Book Now
            </Link>
            <Link 
              href="/gallery" 
              className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors font-semibold flex items-center gap-3 group"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
            >
              View Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Clear View Toggle */}
        <button 
          onClick={() => setIsHeroClear(!isHeroClear)}
          className="absolute bottom-10 right-10 z-20 text-white/40 hover:text-white transition-all duration-300 flex items-center gap-3 group cursor-pointer"
          aria-label={isHeroClear ? "Show content" : "Clear view"}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isHeroClear ? "Show UI" : "Clear View"}
          </span>
          {isHeroClear ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
             </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>

        {/* Scroll Indicator */}
        <div className={`scroll-indicator absolute bottom-10 left-1/2 transition-opacity duration-700 ${isHeroClear ? 'opacity-0' : 'opacity-100'}`}>
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative section bg-white grid-pattern overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div 
            ref={addToRefs}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 px-6"
          >
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-zinc-200" />
                {siteConfig.portfolio.tagline}
              </p>
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 leading-tight tracking-tighter">
                {siteConfig.portfolio.titlePrimary} <br />
                <span className="text-[#D97706] leading-tight">{siteConfig.portfolio.titleSecondary}</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed mb-2 md:mb-6">
              {siteConfig.portfolio.description}
            </p>
          </div>
          
          <div className="px-6">
            <PortfolioGallery />
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="relative section bg-zinc-50 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div 
            ref={addToRefs}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20"
          >
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-zinc-200" />
                {siteConfig.packages.tagline}
              </p>
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-tight tracking-tighter">
                {siteConfig.packages.titlePrimary} <br />
                <span className="text-zinc-400">{siteConfig.packages.titleSecondary}</span>
              </h2>
            </div>
            <div className="md:w-px md:h-24 bg-zinc-200 hidden md:block" />
            <p className="text-zinc-500 max-w-xs text-sm leading-relaxed mb-2 md:mb-6 uppercase tracking-widest">
              {siteConfig.packages.description}
            </p>
          </div>
          <Packages />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative section bg-white overflow-hidden py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-y-16 md:gap-12 items-center">
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-zinc-200" />
              {siteConfig.about.tagline}
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-2 leading-tight tracking-tighter">
              {siteConfig.about.titlePrimary} <br />
              <span className="text-[#D97706] leading-tight">{siteConfig.about.titleSecondary}</span>
            </h2>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-10 pb-1 border-b border-zinc-100 inline-block">
              {siteConfig.about.subtitle}
            </p>
            <p className="text-zinc-600 leading-relaxed max-w-md text-base md:text-lg">
              {siteConfig.about.bio}
            </p>
          </div>
          
          <div ref={addToRefs} className="col-span-12 lg:col-span-7 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group w-full max-w-md lg:max-w-xl">
               <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-zinc-200" />
               <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-zinc-200" />
               <div className="w-full aspect-[4/5] bg-zinc-100 relative transition-all duration-700 overflow-hidden" style={{ borderRadius: '2px' }}>
                  <Image
                    src={siteConfig.about.imageSrc}
                    alt={siteConfig.about.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <footer className="relative bg-[#0A0A0A] text-white py-16 md:py-12 z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6 text-center md:text-left">
            <div className="order-2 md:order-1">
              <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 font-medium">
                {siteConfig.footer.copyright}
              </p>
            </div>
            
            <div className="hidden md:flex order-1 md:order-2 items-center gap-4 md:gap-3">
              <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 font-medium whitespace-nowrap">
                {siteConfig.global.location}
              </p>
              <div className="h-4 w-px bg-white/10" />
              <Image
                src={siteConfig.global.logo}
                alt={siteConfig.global.logoAlt}
                width={36}
                height={24}
                className="w-9 h-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </footer>

      <Link
        href="/book"
        className={`fixed bottom-6 right-6 z-[60] md:hidden px-6 py-4 bg-[#D97706] text-white text-[12px] font-bold uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 flex items-center gap-3 ${
          showMobileFAB && !isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        } cursor-pointer`}
        style={{ borderRadius: '2px' }}
      >
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        Book Production
      </Link>
    </div>
  );
}
