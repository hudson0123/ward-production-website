
// ─────────────────────────────────────────────
// REAL ESTATE FILMS
// ─────────────────────────────────────────────
import { useRef, useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

function RealEstateFilms({ films }: { films: any[] }) {
  const [currentFilm, setCurrentFilm] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prev = () => {
    setCurrentFilm((i) => (i === 0 ? films.length - 1 : i - 1));
  };
  const next = () => {
    setCurrentFilm((i) => (i === films.length - 1 ? 0 : i + 1));
  };

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked by browser until user interaction
      });
    }
  }, [currentFilm]);

  const film = films[currentFilm];

  return (
    <section className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 font-semibold mb-6">
        {siteConfig.portfolio.filmsTitle}
      </p>
      <div className="relative group/container" style={{ borderRadius: "3px" }}>
        <div className="aspect-video bg-zinc-900 relative overflow-hidden" onClick={togglePlay}>
          <video
            ref={videoRef}
            key={film.src}
            src={film.src}
            className="w-full h-full object-cover"
            playsInline
            muted
            loop
            autoPlay
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          {/* Dark overlay when paused */}
          {!playing && <div className="absolute inset-0 bg-black/30" />}

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

          {/* Play button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              playing ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/25 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
              <svg className="w-6 h-6 text-white ml-0.4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>


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