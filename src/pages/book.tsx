import { Outfit, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

// Replace this with your Aryeo booking URL when ready
const BOOKING_URL = "https://app.aryeo.com/YOUR_BOOKING_LINK";

export default function Book() {
  return (
    <div className={`${outfit.variable} ${dmSans.variable} font-sans min-h-screen bg-zinc-50`}>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/ward-creatives.png"
              alt="Ward Creatives Logo"
              width={40}
              height={40}
            />
          </Link>
          <Link 
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-3">
              Schedule a Session
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Book Now
            </h1>
            <p className="text-zinc-600 max-w-lg mx-auto">
              Select a time that works for you and let's discuss your project.
            </p>
          </div>

          {/* Booking iframe Container */}
          <div 
            className="bg-white border border-zinc-200 overflow-hidden"
            style={{ borderRadius: '6px' }}
          >
            <iframe
              src={BOOKING_URL}
              width="100%"
              height="700"
              frameBorder="0"
              title="Book a session with Ward Creatives"
              className="w-full"
              style={{ minHeight: '700px' }}
            />
          </div>

          {/* Alternative Contact */}
          <div className="mt-10 text-center">
            <p className="text-sm text-zinc-500">
              Prefer to reach out directly?{" "}
              <Link href="/#contact" className="text-[#D97706] hover:underline">
                Send a message
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-zinc-500 tracking-wider">
            © {new Date().getFullYear()} Ward Creatives. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
