import { Outfit, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

// Replace this with your Aryeo booking URL when ready
const BOOKING_URL = "https://flash-visuals.aryeo.com/order";

export default function Book() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const pkg = router.query.package;
      if (typeof pkg === "string") {
        setSelectedPackage(pkg);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className={`${outfit.variable} ${dmSans.variable} font-sans min-h-screen bg-zinc-50 flex flex-col`}>
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

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tighter">
              Project <span className="text-[#D97706] italic mixed-case">Initiation</span>
            </h1>
            
            {selectedPackage ? (
              <div className="inline-flex flex-col items-center bg-white border border-zinc-200 py-3 px-8 shadow-sm relative group overflow-hidden" style={{ borderRadius: '2px' }}>
                 {/* Internal architectural accents */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D97706]" />
                <div className="absolute top-0 right-0 w-1 h-full bg-zinc-100 group-hover:bg-[#D97706]/20 transition-colors" />

                <div className="flex items-center gap-3">
                  <p className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] font-bold">Selection:</p>
                  <p className="text-zinc-900 text-lg font-bold">
                     {selectedPackage}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 max-w-lg mx-auto text-[11px] leading-relaxed uppercase tracking-widest">
                Select your parameters and secure your production window.
              </p>
            )}
          </div>

          {/* Booking Container with Glassmorphism and Loading */}
          <div className="relative bg-white shadow-xl border border-zinc-100 overflow-hidden" style={{ borderRadius: '4px' }}>
            {/* Minimalist Top Bar */}
            <div className="bg-zinc-50 border-b border-zinc-100 px-4 py-2 flex items-center justify-between">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-200" />
                <div className="w-2 h-2 rounded-full bg-zinc-200" />
                <div className="w-2 h-2 rounded-full bg-zinc-200" />
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">Secure Booking Portal</span>
              </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-zinc-100 border-t-[#D97706] rounded-full animate-spin" />
                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-bold animate-pulse">Loading Portal...</p>
              </div>
            )}

            {/* Booking iframe */}
            <iframe
              src="https://ward-creatives.aryeo.com/order"
              title="Book a session with Ward Creatives"
              className="w-full transition-opacity duration-700 h-[650px] md:h-[750px] bg-white"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Alternative Contact */}
          <div className="mt-5 text-center pt-8">
            <p className="text-[12px] text-zinc-400 uppercase tracking-widest font-medium">
              Complex Request?{"  "}
              <Link href="/#contact" className="text-[12px] text-[#D97706] hover:underline font-bold underline-offset-4 tracking-normal">
                Direct Inquiry
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Ward Creatives. Built with Precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
