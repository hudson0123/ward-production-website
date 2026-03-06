
// ─────────────────────────────────────────────
// PHONE FRAME (for reels)

import { useEffect, useRef, useState } from "react";

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// ─────────────────────────────────────────────
function PhoneFrame({ reel, isCenter, isMiddle }: { reel: any, isCenter: boolean, isMiddle?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoId = getYouTubeId(reel.src);

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePlay = () => {
    if (!iframeRef.current) return;
    
    const command = isPaused ? 'playVideo' : 'pauseVideo';
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
    setIsPaused(!isPaused);
  };

  if (!mounted) {
    return (
      <div className="relative flex-shrink-0 w-full" style={{ aspectRatio: "9/18.5" }}>
        <div className="relative bg-zinc-950 rounded-[12px] md:rounded-[18px] p-[2px] shadow-2xl">
          <div className="relative overflow-hidden rounded-[12px] md:rounded-[16px] bg-zinc-900 h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex-shrink-0 w-full transition-all duration-500 ${
        isMiddle ? "scale-110 z-10" : "scale-100 opacity-100"
      }`}
    >
      {/* Phone shell */}
      <div
        className="relative bg-zinc-950 rounded-[12px] md:rounded-[18px] p-[2px] shadow-2xl"
        style={{
          boxShadow: isMiddle
            ? "0 25px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)"
            : "0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Dynamic island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-14 h-[14px] bg-zinc-950 rounded-full z-20" />

        {/* Screen */}
        <div 
          className="relative overflow-hidden rounded-[12px] md:rounded-[16px] bg-zinc-900 cursor-pointer group/screen" 
          style={{ aspectRatio: "9/18.5" }}
          onClick={togglePlay}
        >
          {videoId ? (
            <iframe
              ref={iframeRef}
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
              className="absolute inset-0 w-full h-full pointer-events-none scale-[1.18] object-cover"
              title={reel.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-[8px]">Video unavailable</div>
          )}

          {/* Indicator Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none z-10 ${isPaused ? 'bg-black/20 opacity-100' : 'opacity-0'}`}>
             <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                {isPaused ? (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneFrame;
