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
  { id: 1,  src: "/horizontal-images/DJI_20260217162409_0049_D.JPG", alt: "Aerial Shot 1",   span: "col-span-12 md:col-span-8", aspect: "aspect-[16/9]" },
  { id: 2,  src: "/horizontal-images/DJI_20260217162515_0058_D.JPG", alt: "Aerial Shot 2",   span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 3,  src: "/horizontal-images/DJI_20260217182621_0144_D.JPG", alt: "Aerial Shot 3",   span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 4,  src: "/horizontal-images/DJI_20260217182922_0161_D.JPG", alt: "Aerial Shot 4",   span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 5,  src: "/horizontal-images/DJI_20260217182958_0164_D.JPG", alt: "Aerial Shot 5",   span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 6,  src: "/horizontal-images/DJI_20260217183106_0165_D.JPG", alt: "Aerial Shot 6",   span: "col-span-12 md:col-span-6", aspect: "aspect-[16/9]" },
  { id: 7,  src: "/horizontal-images/DSC00364.JPG",                  alt: "Photo 1",         span: "col-span-12 md:col-span-6", aspect: "aspect-[16/9]" },
  { id: 8,  src: "/horizontal-images/DSC00373.JPG",                  alt: "Photo 2",         span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 9,  src: "/horizontal-images/DSC00390 copy.JPG",             alt: "Photo 3",         span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 10, src: "/horizontal-images/DSC00397.JPG",                  alt: "Photo 4",         span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 11, src: "/horizontal-images/DSC00412.JPG",                  alt: "Photo 5",         span: "col-span-12 md:col-span-6", aspect: "aspect-[16/9]" },
  { id: 12, src: "/horizontal-images/DSC00415.JPG",                  alt: "Photo 6",         span: "col-span-12 md:col-span-6", aspect: "aspect-[16/9]" },
  { id: 13, src: "/horizontal-images/DSC00420.JPG",                  alt: "Photo 7",         span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 14, src: "/horizontal-images/DSC00424 copy.JPG",             alt: "Photo 8",         span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 15, src: "/horizontal-images/DSC00451.JPG",                  alt: "Photo 9",         span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 16, src: "/horizontal-images/DSC00511.JPG",                  alt: "Photo 10",        span: "col-span-12 md:col-span-8", aspect: "aspect-[16/9]" },
  { id: 17, src: "/horizontal-images/DSC00517.JPG",                  alt: "Photo 11",        span: "col-span-12 md:col-span-4", aspect: "aspect-[16/9]" },
  { id: 18, src: "/horizontal-images/DSC00522.JPG",                  alt: "Photo 12",        span: "col-span-12 md:col-span-6", aspect: "aspect-[16/9]" },
  { id: 19, src: "/horizontal-images/DSC00526.JPG",                  alt: "Photo 13",        span: "col-span-12 md:col-span-6", aspect: "aspect-[16/9]" },
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
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Subtle architectural framing corner */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md" onClick={closeLightbox}>
          <div className="absolute inset-0 bg-white/80 pointer-events-none" />
          
          <button className="absolute top-8 right-8 text-zinc-400 hover:text-zinc-900 transition-colors z-[110]" onClick={closeLightbox}>
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
