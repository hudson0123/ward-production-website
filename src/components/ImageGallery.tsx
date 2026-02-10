import React, { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  span: string; // Tailwind span class
  aspect: string; // Tailwind aspect class
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: "/ward-creatives.png", alt: "Modern Architecture 1", span: "col-span-12 md:col-span-7", aspect: "aspect-[16/10]" },
  { id: 2, src: "/ward-creatives.png", alt: "Detail Shot", span: "col-span-12 md:col-span-5 -my-10", aspect: "aspect-square" },
  { id: 3, src: "/ward-creatives.png", alt: "Living Space", span: "col-span-12 md:col-span-5", aspect: "aspect-[3/4]" },
  { id: 4, src: "/ward-creatives.png", alt: "Exterior Dusk", span: "col-span-12 md:col-span-7", aspect: "aspect-[16/9]" },
];

export default function ImageGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      <div className="grid grid-cols-12 gap-6 items-start">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={`${image.span} group relative overflow-hidden cursor-pointer`}
            style={{ borderRadius: '4px' }}
            onClick={() => openLightbox(index)}
          >
            <div className={`${image.aspect} bg-zinc-50 relative overflow-hidden`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
              />
              {/* Subtle architectural framing corner */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center glass-panel" onClick={closeLightbox}>
          <div className="absolute inset-0 bg-black/90 pointer-events-none" />
          
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]" onClick={closeLightbox}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button className="absolute left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110]" onClick={goToPrevious}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="relative max-w-[85vw] max-h-[85vh] w-full h-full flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full">
               <Image
                 src={galleryImages[currentIndex].src}
                 alt={galleryImages[currentIndex].alt}
                 fill
                 className="object-contain"
               />
            </div>
            {/* Meta info in lightbox */}
            <div className="absolute bottom-[-40px] left-0 right-0 text-center">
               <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">{currentIndex + 1} / {galleryImages.length} — {galleryImages[currentIndex].alt}</p>
            </div>
          </div>

          <button className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110]" onClick={goToNext}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
