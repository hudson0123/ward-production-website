import React, { useState, useRef, useEffect } from "react";

interface VideoItem {
  id: number;
  title: string;
  tagline: string;
  videoSrc: string;
  span: string;
  aspect: string;
}

const portfolioVideos: VideoItem[] = [
  { 
    id: 1, 
    title: "Modern Dwelling", 
    tagline: "Architectural Cinematography", 
    videoSrc: "/placeholder.mp4",
    span: "col-span-12 md:col-span-8",
    aspect: "aspect-[16/9]"
  },
  { 
    id: 2, 
    title: "Urban Loft", 
    tagline: "Interior Showcase", 
    videoSrc: "/placeholder.mp4",
    span: "col-span-12 md:col-span-4",
    aspect: "aspect-square"
  },
  { 
    id: 3, 
    title: "The Heritage", 
    tagline: "Drone & Exterior", 
    videoSrc: "/placeholder.mp4",
    span: "col-span-12 md:col-span-5",
    aspect: "aspect-[4/5]"
  },
  { 
    id: 4, 
    title: "Minimalist Space", 
    tagline: "Short Form Social", 
    videoSrc: "/placeholder.mp4",
    span: "col-span-12 md:col-span-7 my-auto",
    aspect: "aspect-[16/9]"
  },
];

export default function VideoGrid() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const handlePlayClick = (id: number) => {
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

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
        {portfolioVideos.map((video, index) => (
          <div 
            key={video.id}
            className={`${video.span} group relative overflow-hidden cursor-pointer`}
            style={{ borderRadius: '2px' }}
            onClick={() => handlePlayClick(video.id)}
          >
            <div className={`${video.aspect} bg-zinc-100 relative overflow-hidden`}>
              <video
                ref={(el) => { videoRefs.current[video.id] = el; }}
                className={`w-full h-full object-cover transition-all duration-1000 ${playingId === video.id ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                src={video.videoSrc}
                playsInline
                muted={playingId !== video.id}
                onEnded={() => handleVideoEnd(video.id)}
              />
              
              {/* Architectural Overlay */}
              <div className={`video-overlay absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${playingId === video.id ? "opacity-0" : "opacity-100"}`}>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                 <div className="relative w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                 </div>
              </div>

              {/* Dynamic Labeling */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 ${playingId === video.id ? 'hidden' : 'block'}`}>
                 <div className="bg-white/90 backdrop-blur-md p-6 max-w-xs border-l-2 border-[#D97706]">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#D97706] mb-2 font-bold">{video.tagline}</p>
                    <h3 className="text-lg font-bold text-zinc-900 leading-tight">{video.title}</h3>
                 </div>
              </div>
            </div>

            {/* Always visible mobile/desktop label fallback for very small screens or consistent bottom layout */}
            <div className="mt-4 md:hidden">
               <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">{video.tagline}</p>
               <h4 className="text-sm font-bold text-zinc-900">{video.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
