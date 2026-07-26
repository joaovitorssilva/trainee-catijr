import { useState, useEffect } from "react";
import { getColorSync } from "colorthief";

interface GradientColors {
  top: string;
  bottom: string;
}

const FALLBACK: GradientColors = { top: "#2E4057", bottom: "#1A2634" };

function darken(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16); 
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.round(r * factor); 
  const dg = Math.round(g * factor);
  const db = Math.round(b * factor);
  return `#${dr.toString(16).padStart(2, "0")}${dg.toString(16).padStart(2, "0")}${db.toString(16).padStart(2, "0")}`;
}

export function useDominantColor(url: string | undefined): GradientColors {
  const [gradient, setGradient] = useState<GradientColors>(FALLBACK);

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;

    img.onload = () => {
      try {
        const color = getColorSync(img, { colorCount: 5, quality: 5 });
        if (color) {
          setGradient({
            top: color.hex(),
            bottom: darken(color.hex(), 0.25),
          });
        }
      } catch {
        setGradient(FALLBACK);
      }
    };

    img.onerror = () => setGradient(FALLBACK);
  }, [url]);

  return url ? gradient : FALLBACK;
}
