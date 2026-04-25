import { useEffect, useRef } from "react";

// Mykonos (city=184451) preselected -- Andros is NOT in the Localrent widget catalog
// (verified 2026-04-25 via widget.localrent.com/api/cities/18). Mykonos is the
// nearest in-catalog Cycladic island, ferry-connected via Tinos, similar fleet.
const WIDGET_URL = "https://tpembd.com/content?trs=517071&shmarker=713621.andros-car-rental&country=18&city=184451&lang=en&width=100&background=transparent&logo=false&header=false&gearbox=false&cars=false&border=false&footer=false&campaign_id=87&promo_id=4322";

export default function AffiliateWidget() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const script = document.createElement("script");
    script.src = WIDGET_URL;
    script.async = true;
    script.charset = "utf-8";
    ref.current.appendChild(script);
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, []);
  return <div ref={ref} className="my-8 mx-auto max-w-4xl px-4" />;
}
