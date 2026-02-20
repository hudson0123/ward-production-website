
// ─────────────────────────────────────────────
// PHONE FRAME (for reels)

import { useRef, useState } from "react";

// ─────────────────────────────────────────────
function PhoneFrame({ reel, isCenter, isMiddle }: { reel: any, isCenter: boolean, isMiddle?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className={`relative flex-shrink-0 w-full transition-all duration-500 ${
        isMiddle ? "scale-110 z-10" : "scale-100 opacity-100"
      }`}
      onClick={togglePlay}
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
        <div className="relative overflow-hidden rounded-[12px] md:rounded-[16px] bg-zinc-900" style={{ aspectRatio: "9/19.5" }}>
          <video
            ref={videoRef}
            src={reel.src}
            className="w-full h-full object-cover"
            playsInline
            muted
            loop
            autoPlay={isMiddle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          {!playing && <div className="absolute inset-0 bg-black/20" />}

          {/* Play button */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="cursor-pointer w-9 h-9 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Reel label at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-[8px] font-semibold leading-tight line-clamp-2">{reel.title}</p>
            {reel.views && (
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-2.5 h-2.5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-white/60 text-[7px]">{reel.views}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneFrame;
