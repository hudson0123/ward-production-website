import PhoneFrame from "./PhoneFrame";
import { siteConfig } from "../config/siteConfig";

function SocialMediaReels({ reels }: { reels: any[] }) {
  return (
    <section className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 font-semibold mb-6">
        {siteConfig.portfolio.reelsTitle}
      </p>

      {/* Equal-width phone grid — fills full section width */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${reels.length}, 1fr)` }}
      >
        {reels.map((reel, i) => (
          <PhoneFrame key={i} reel={reel} isCenter={false} isMiddle={i === 1} />
        ))}
      </div>
    </section>
  );
}

export default SocialMediaReels;