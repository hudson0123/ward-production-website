
// ─────────────────────────────────────────────
// REAL ESTATE FILMS
// ─────────────────────────────────────────────
import { useRef, useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

function RealEstateFilms({ films }: { films: any[] }) {
  const [mounted, setMounted] = useState(false);
  const [currentFilm, setCurrentFilm] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset pause state when film changes
  useEffect(() => {
    setIsPaused(false);
  }, [currentFilm]);

  if (!mounted) {
    return (
      <section className="mb-8">
        <div className="aspect-video bg-zinc-900 rounded-[3px]" />
      </section>
    );
  }

  const prev = () => {
    setCurrentFilm((i) => (i === 0 ? films.length - 1 : i - 1));
  };
  const next = () => {
    setCurrentFilm((i) => (i === films.length - 1 ? 0 : i + 1));
  };

  const togglePlay = () => {
    if (!iframeRef.current) return;
    
    const command = isPaused ? 'playVideo' : 'pauseVideo';
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
    setIsPaused(!isPaused);
  };

  const film = films[currentFilm];
  const videoId = getYouTubeId(film.src);

  return (
    <section className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 font-semibold mb-6 px-4 md:px-0">
        {siteConfig.portfolio.filmsTitle}
      </p>
      <div className="relative group/container" style={{ borderRadius: "3px" }}>
        <div 
          className="aspect-video bg-zinc-900 relative overflow-hidden cursor-pointer"
          onClick={togglePlay}
        >
          {videoId ? (
            <iframe
              ref={iframeRef}
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              title={film.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-xs">Video unavailable</div>
          )}

          {/* Play/Pause Indicator Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none z-10 ${isPaused ? 'bg-black/20 opacity-100' : 'opacity-0'}`}>
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-100 group-hover/container:scale-110 transition-transform">
              {isPaused ? (
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </div>
          </div>

          {/* Navigation Buttons Inside */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-75 group-hover/container:opacity-100 hover:bg-white/20 transition-all duration-300 z-20 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-75 group-hover/container:opacity-100 hover:bg-white/20 transition-all duration-300 z-20 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>



        </div>
      </div>

      {/* Film info below */}
      <div className="mt-4 flex justify-between items-end">
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">{film.title}</h4>
          {film.address && <p className="text-[11px] text-zinc-400 mt-0.5">{film.address}</p>}
          {film.tagline && <p className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-widest">{film.tagline}</p>}
        </div>
        <p className="text-[10px] text-zinc-400 tracking-widest">
          {String(currentFilm + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}

export default RealEstateFilms;