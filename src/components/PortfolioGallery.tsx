import SocialMediaReels from "./SocialMediaReels";
import RealEstateFilms from "./RealEstateFilms";
import PhotographyCarousel from "./PhotographyCarousel";
import { siteConfig } from "../config/siteConfig";

export default function PortfolioGallery() {
  const { portfolio } = siteConfig;
  
  // Filter items that are only meant for the full portfolio
  const homePhotography = portfolio.photography.filter(item => !item.onlyPortfolio);
  const homeFilms = portfolio.films.filter(item => !item.onlyPortfolio);
  const homeReels = portfolio.reels.filter(item => !item.onlyPortfolio);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 font-sans">
      <PhotographyCarousel items={homePhotography} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RealEstateFilms films={homeFilms} />
        <SocialMediaReels reels={homeReels} />
      </div>

      {/* View Full Gallery CTA */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <a
          href="/gallery"
          className="inline-flex items-center gap-2 border border-zinc-900 text-zinc-900 px-8 py-3 text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-zinc-900 hover:text-white transition-all duration-300"
        >
          View Full Gallery
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}