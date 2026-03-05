import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/siteConfig";

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = siteConfig.global;

  return (
    <div
      style={
        {
          "--accent": theme.accent,
          "--accent-hover": theme.accentHover,
          "--accent-rgb": theme.accentRgb,
          "--secondary": theme.secondaryAccent,
          "--secondary-hover": theme.secondaryAccentHover,
          "--secondary-rgb": theme.secondaryAccentRgb,
        } as React.CSSProperties
      }
    >
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
