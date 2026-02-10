import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const sections = [
  { id: "portfolio", label: "Gallery" },
  { id: "packages", label: "Packages" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function scrollToSection(id: string) {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-zinc-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/ward-creatives.png"
              alt="Ward Creatives Logo"
              width={40}
              height={40}
              className="cursor-pointer"
              onClick={scrollToTop}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`cursor-pointer text-sm font-medium tracking-wide transition-colors link-underline ${
                  isScrolled
                    ? "text-zinc-700 hover:text-zinc-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {section.label}
              </button>
            ))}
            <Link
              href="/book"
              className={`btn-primary ${isScrolled ? '' : 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20'}`}
            >
              Book Now
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 ${
              isMenuOpen ? "hamburger-open" : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`hamburger-line block w-6 h-0.5 ${
                isScrolled || isMenuOpen ? "bg-zinc-800" : "bg-white"
              }`}
            />
            <span
              className={`hamburger-line block w-6 h-0.5 ${
                isScrolled || isMenuOpen ? "bg-zinc-800" : "bg-white"
              }`}
            />
            <span
              className={`hamburger-line block w-6 h-0.5 ${
                isScrolled || isMenuOpen ? "bg-zinc-800" : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden ${
          isMenuOpen ? "open" : ""
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-zinc-800 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col pt-20 px-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className="text-left py-4 text-base font-medium text-zinc-800 hover:text-zinc-600 border-b border-zinc-100"
            >
              {section.label}
            </button>
          ))}
          <Link
            href="/book"
            className="btn-primary mt-6 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
