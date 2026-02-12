import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

type MediaType = 'video' | 'image';

interface PortfolioItem {
  id: number;
  type: MediaType;
  title?: string;
  tagline?: string; // For videos
  alt?: string; // For images
  src: string; // videoSrc or image src
  span: string;
  aspect: string;
  offset?: string; // Keeping for potential backward compatibility or future use
}

const portfolioItems: PortfolioItem[] = [
  // Videos
  { 
    id: 1, 
    type: 'video',
    title: "Modern Dwelling", 
    tagline: "Architectural Cinematography", 
    src: "/placeholder.mp4",
    span: "col-span-12 md:col-span-6",
    aspect: "aspect-[16/9]"
  },
  { 
    id: 2, 
    type: 'video',
    title: "Urban Loft", 
    tagline: "Interior Showcase", 
    src: "/placeholder.mp4",
    span: "col-span-12 md:col-span-6",
    aspect: "aspect-[16/9]"
  },
  { 
    id: 3, 
    type: 'video',
    title: "The Heritage", 
    tagline: "Drone & Exterior", 
    src: "/placeholder.mp4",
    span: "col-span-6 md:col-span-3",
    aspect: "aspect-[9/16] w-80"
  },
  { 
    id: 4, 
    type: 'video',
    title: "Minimalist Space", 
    tagline: "Short Form Social", 
    src: "/placeholder.mp4",
    span: "col-span-6 md:col-span-3",
    aspect: "aspect-[9/16] w-80"
  },
  { 
    id: 5, 
    type: 'video',
    title: "Minimalist Space", 
    tagline: "Short Form Social", 
    src: "/placeholder.mp4",
    span: "col-span-6 md:col-span-3",
    aspect: "aspect-[9/16] w-80"
  },
  { 
    id: 6, 
    type: 'video',
    title: "Minimalist Space", 
    tagline: "Short Form Social", 
    src: "/placeholder.mp4",
    span: "col-span-6 md:col-span-3",
    aspect: "aspect-[9/16] w-80"
  },
  // Images
  { 
    id: 7, 
    type: 'image',
    src: "/ward-creatives.png", 
    alt: "Modern Architecture 1", 
    span: "col-span-12 md:col-span-6", 
    aspect: "aspect-[16/9]" 
  },
  { 
    id: 8, 
    type: 'image',
    src: "/ward-creatives.png", 
    alt: "Detail Shot", 
    span: "col-span-12 md:col-span-6", 
    aspect: "aspect-[16/9]" 
  },
  { 
    id: 9, 
    type: 'image',
    src: "/ward-creatives.png", 
    alt: "Living Space", 
    span: "col-span-6 md:col-span-3", 
    aspect: "aspect-[9/16]" 
  },
  { 
    id: 10, 
    type: 'image',
    src: "/ward-creatives.png", 
    alt: "Exterior Dusk", 
    span: "col-span-6 md:col-span-3", 
    aspect: "aspect-[9/16]" 
  },
  { 
    id: 11, 
    type: 'image',
    src: "/ward-creatives.png", 
    alt: "Exterior Dusk", 
    span: "col-span-6 md:col-span-3", 
    aspect: "aspect-[9/16]" 
  },
  { 
    id: 12, 
    type: 'image',
    src: "/ward-creatives.png", 
    alt: "Exterior Dusk", 
    span: "col-span-6 md:col-span-3", 
    aspect: "aspect-[9/16]" 
  },
];

export default function PortfolioGrid() {
  // Video State
  const [playingId, setPlayingId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter only images for lightbox navigation
  const imageItems = portfolioItems.filter(item => item.type === 'image');

  // Video Handlers
  const handlePlayClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (playingId !== null && playingId !== id) {
      const prevVideo = videoRefs.current[playingId];
      if (prevVideo) prevVideo.pause();
    }

    const video = videoRefs.current[id];
    if (video) {
      if (playingId === id) {
        video.pause();
        setPlayingId(null);
      } else {
        video.play();
        setPlayingId(id);
      }
    }
  };

  const handleVideoEnd = (id: number) => {
    if (playingId === id) setPlayingId(null);
  };

  // Lightbox Handlers
  const openLightbox = (src: string) => {
    const relativeIndex = imageItems.findIndex(item => item.src === src); // Find index in the image-only array
    // Since multiple images share src in placeholder, ideally use ID.
    // The items have IDs 7-12 for images.
    // Let's passed the ID to openLightbox
  };
  
  const openLightboxById = (id: number) => {
    const index = imageItems.findIndex(item => item.id === id);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imageItems.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imageItems.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setCurrentImageIndex((prev) => (prev === 0 ? imageItems.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setCurrentImageIndex((prev) => (prev === imageItems.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, imageItems.length]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
        {portfolioItems.map((item) => (
          <div 
            key={item.id}
            className={`${item.span} group relative overflow-hidden cursor-pointer`}
            style={{ borderRadius: '2px' }}
            onClick={() => item.type === 'image' ? openLightboxById(item.id) : handlePlayClick({ stopPropagation: () => {} } as React.MouseEvent, item.id)}
          >
            <div className={`${item.aspect} bg-zinc-100 relative overflow-hidden`}>
              {item.type === 'video' ? (
                <>
                  <video
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    className={`w-full h-full object-cover transition-all duration-1000`}
                    src={item.src}
                    playsInline
                    muted={playingId !== item.id}
                    onEnded={() => handleVideoEnd(item.id)}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className={`video-overlay absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${playingId === item.id ? "opacity-0" : "opacity-100"}`}>
                     <div className="relative w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                     </div>
                  </div>
    
                  {/* Video Labeling */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 ${playingId === item.id ? 'hidden' : 'block'}`}>
                     <div className="bg-white/90 backdrop-blur-md p-6 max-w-xs border-l-2 border-[#D97706]">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#D97706] mb-2 font-bold">{item.tagline}</p>
                        <h3 className="text-lg font-bold text-zinc-900 leading-tight">{item.title}</h3>
                     </div>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={item.src}
                    alt={item.alt || "Portfolio Image"}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Architectural framing corners for images */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}
            </div>

            {/* Mobile/Fallback Label for Videos */}
            {item.type === 'video' && (
                <div className="mt-4 md:hidden">
                   <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">{item.tagline}</p>
                   <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox for Images */}
      {lightboxOpen && imageItems.length > 0 && (
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
                 src={imageItems[currentImageIndex].src}
                 alt={imageItems[currentImageIndex].alt || "Gallery Image"}
                 fill
                 className="object-contain"
               />
            </div>
            {/* Meta info in lightbox */}
            <div className="absolute bottom-[-40px] left-0 right-0 text-center">
               <p className="text-black/40 text-[10px] uppercase tracking-[0.4em]">
                 {currentImageIndex + 1} / {imageItems.length} — {imageItems[currentImageIndex].alt}
               </p>
            </div>
          </div>

          <button className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110]" onClick={goToNext}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
