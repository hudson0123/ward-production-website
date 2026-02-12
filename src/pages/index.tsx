import { Outfit, DM_Sans } from "next/font/google";
import Link from "next/link";
import Navbar from "../components/Navbar";
import PortfolioGrid from "../components/PortfolioGrid";
import Packages from "../components/Packages";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export default function Home() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isHeroClear, setIsHeroClear] = useState(false);
  const [showMobileFAB, setShowMobileFAB] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after 200px and only on mobile (using window.innerWidth for simplicity or just CSS)
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
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder.mp4" type="video/mp4" />
        </video>
        
        {/* No Overlay - Always Clear */}
        
        {/* Geometric Accents */}
        <div 
          className={`absolute top-20 right-10 w-32 h-32 border border-white/10 transition-opacity duration-700 ${isHeroClear ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: 'rotate(45deg)' }}
        />
        <div 
          className={`absolute bottom-32 left-16 w-20 h-20 border border-white/10 transition-opacity duration-700 ${isHeroClear ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: 'rotate(45deg)' }}
        />

        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-opacity duration-700 ${isHeroClear ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-6 font-medium">
            Real Estate Photography & Videography
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            Built to be seen.
            <br />
            Shot to be remembered.
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            At Ward Creatives, we believe strong ideas demand strong execution.
            Our work is built on precision, discipline, and clarity. Every shot
            is intentional, and every structure, space, or moment is designed to
            make an impact.
          </p>
          <div className="md:hidden mt-8 cursor-pointer">
            <Link
              href="/book"
              className="btn-primary"
            >
              Book Now
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
             <svg className="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
             </svg>
          ) : (
            <svg className="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>

        {/* Scroll Indicator - Arrow Only */}
        <div className={`scroll-indicator absolute bottom-10 left-1/2 transition-opacity duration-700 ${isHeroClear ? 'opacity-0' : 'opacity-100'}`}>
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Portfolio/Gallery Section */}
      <section id="portfolio" className="relative section bg-white grid-pattern overflow-hidden">
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div 
            ref={addToRefs}
            className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 px-6"
          >
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-zinc-200" />
                Portfolio
              </p>
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 leading-tight tracking-tighter">
                Visual <br />
                <span className="text-[#D97706] italic mixed-case">Storytelling</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed mb-2 md:mb-6">
              Capturing spaces with architectural precision and cinematic clarity. Every frame is a studied composition.
            </p>
          </div>
          
          {/* Unified Portfolio Grid */}
          <div className="px-6">
            <PortfolioGrid />
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="relative section bg-zinc-50 overflow-hidden">
        {/* Giant Background Initial */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div 
            ref={addToRefs}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20"
          >
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-zinc-200" />
                Services
              </p>
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-tight tracking-tighter">
                Tailored <br />
                <span className="text-zinc-400">Productions</span>
              </h2>
            </div>
            <div className="md:w-px md:h-24 bg-zinc-200 hidden md:block" />
            <p className="text-zinc-500 max-w-xs text-sm leading-relaxed mb-2 md:mb-6 uppercase tracking-widest">
              Professional real estate media tiers designed for maximum impact.
            </p>
          </div>
          <Packages />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative section bg-white overflow-hidden py-24 md:py-32">
        {/* Giant Background Initial */}        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-y-16 md:gap-12 items-center">
          <div 
            className="col-span-12 lg:col-span-5 order-2 lg:order-1"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-zinc-200" />
              The Creator
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-2 leading-tight tracking-tighter">
              Keegan <br />
              <span className="text-[#D97706] italic mixed-case">Ward</span>
            </h2>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-10 pb-1 border-b border-zinc-100 inline-block">
              Photographer / Videographer / Editor
            </p>
            <p className="text-zinc-600 leading-relaxed max-w-md text-base md:text-lg">
              Born and raised in Athens, Georgia, Keegan has spent over 4 years perfecting the art of real estate production. 
              His approach is defined by precision, discipline, and a deep understanding of how spaces communicate through a lens. 
              It's more than snapping a photo; it's about creating a feeling that people can connect with.
            </p>
          </div>
          
          <div 
            ref={addToRefs}
            className="col-span-12 lg:col-span-7 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative group w-full max-w-md lg:max-w-xl">
               {/* Architectural framing lines for portrait */}
               <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-zinc-200" />
               <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-zinc-200" />
               
               <div 
                  className="w-full aspect-[4/5] bg-zinc-100 relative transition-all duration-700 overflow-hidden"
                  style={{ borderRadius: '2px' }}
                >
                  <Image
                    src="/keegan.png"
                    alt="Keegan Ward"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative section bg-zinc-50 overflow-hidden py-24 md:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-y-20 lg:gap-12">
          <div 
            className="col-span-12 lg:col-span-6"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-zinc-200" />
              Collaboration
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-8 leading-tight tracking-tighter">
              Start The <br />
              <span className="text-zinc-400 italic mixed-case">Inquiry</span>
            </h2>
            <p className="text-zinc-500 max-w-sm mb-12 leading-relaxed text-base md:text-lg">
              Have a project that requires a meticulous eye for detail? We are ready to bring it to life with precision and cinematic clarity.
            </p>
            
            {/* Social Links - Architectural Row */}
            <div className="flex flex-col gap-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Find Us</p>
              <div className="flex flex-wrap gap-x-8 gap-y-6">
                <a href="https://instagram.com/wardcreatives" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#D97706] transition-colors uppercase text-[11px] tracking-widest font-bold border-b border-zinc-200 hover:border-[#D97706] pb-1">Instagram</a>
                <a href="https://facebook.com/wardcreatives" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#D97706] transition-colors uppercase text-[11px] tracking-widest font-bold border-b border-zinc-200 hover:border-[#D97706] pb-1">Facebook</a>
                <a href="https://tiktok.com/@wardcreatives" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#D97706] transition-colors uppercase text-[11px] tracking-widest font-bold border-b border-zinc-200 hover:border-[#D97706] pb-1">TikTok</a>
              </div>
            </div>
          </div>

          <div 
            ref={addToRefs}
            className="col-span-12 lg:col-span-6 bg-white p-6 sm:p-8 md:p-12 shadow-sm border border-zinc-100"
            style={{ borderRadius: '2px' }}
          >
            <form>
              <div className="mb-8">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Name</label>
                <input type="text" className="form-input" placeholder="Enter name" />
              </div>
              <div className="mb-8">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Email</label>
                <input type="email" className="form-input" placeholder="email@address.com" />
              </div>
              <div className="mb-10">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Project Details</label>
                <textarea className="form-input resize-none" rows={4} placeholder="Describe the scope..." />
              </div>
              <button type="submit" className="btn-primary w-full py-5 text-[11px] tracking-[0.2em] cursor-pointer">Initiate Request</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#0A0A0A] text-white py-12 z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              © {new Date().getFullYear()} Ward Creatives. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
              Athens, Georgia
              <Image
                src="/bulldogs-logo.png"
                alt="Georgia Bulldogs"
                width={40}
                height={40}
                className="w-10 h-7 opacity-100 ml-2"
              />
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Action Button (FAB) */}
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
