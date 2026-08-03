import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

// Mobile-resilience pattern (memory: feedback_widget_mobile_resilience.md, 2026-05-08)
// - requestIdleCallback defer (LCP/CLS budget)
// - visible fallback link to www.localrent.com for Telegram WebView / Safari ITP
//   environments that block tpembd.com
// - 8s descendant-count failure detector (widget renders via <div>+<a> only,
//   so iframe/input/button/form selectors do NOT work)
//
// Andros is not in the Localrent catalog and no hub can deliver a car here, so
// preselecting a neighbouring island is not an option (anafi lesson).
// An empty or omitted `city=` does NOT give a neutral picker, contrary to what this
// comment used to claim: the tpembd loader maps both to data-city="" and the widget
// then silently selects the FIRST city of the country — "Agios Nikolaos (Zakynthos)"
// for country=18. Verified live on all eight affected sites, 2026-08-03.
// An out-of-catalog id makes the widget render the neutral "Greece" state instead; the
// visitor picks a city and the CTA is built correctly from that point on. Caveat:
// clicking "Find" before choosing a city is a dead click, and this is undocumented
// vendor behaviour — hence the guard below, which hides the widget if it ever goes
// back to preselecting a city.
const WIDGET_SRC =
  "https://tpembd.com/content?trs=517071&shmarker=713621.andros-car-rental&country=18&city=999999999&lang=en&width=100&background=transparent&logo=false&header=false&gearbox=false&cars=false&border=false&footer=false&campaign_id=87&promo_id=4322";

const FALLBACK_URL = "https://www.localrent.com/en/greece/?marker=713621.andros";
const FALLBACK_LABEL = "Or browse Greece rentals on Localrent →";

const AffiliateWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [preselectWrong, setPreselectWrong] = useState(false);
  const touchedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = containerRef.current;
    if (!node) return;
    if (node.querySelector("script")) return;

    node.addEventListener("pointerdown", () => {
      touchedRef.current = true;
    });

    const load = () => {
      if (!containerRef.current) return;
      const script = document.createElement("script");
      script.async = true;
      script.src = WIDGET_SRC;
      script.charset = "utf-8";
      script.onerror = () => setScriptFailed(true);
      containerRef.current.appendChild(script);
      window.setTimeout(() => {
        if (!containerRef.current) return;
        if (containerRef.current.querySelectorAll("*").length < 6) {
          setScriptFailed(true);
          return;
        }
        // Verdict on the rendered text, not on a selector: the neutral state spells
        // out "Greece". Anything else means a city got preselected — fail closed.
        // Skipped once the visitor has touched the widget: by then a city name in
        // the field is their own choice, not a preselect.
        if (touchedRef.current) return;
        if (!/\bGreece\b/.test(containerRef.current.innerText || "")) {
          setPreselectWrong(true);
        }
      }, 8000);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(load, { timeout: 2000 });
    } else {
      window.setTimeout(load, 1500);
    }
  }, []);

  return (
    <section className="py-8" id="compare-cars">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-background rounded-lg p-6 text-center border border-border shadow-sm">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Search className="text-primary" size={24} />
            <h3 className="text-lg font-bold m-0">Search &amp; Compare Car Rentals in Greece</h3>
          </div>
          <div
            ref={containerRef}
            className={`my-4 rounded-lg max-w-3xl mx-auto overflow-visible${
              preselectWrong ? " hidden" : ""
            }`}
          />
          {(scriptFailed || preselectWrong) && (
            <p className="text-muted-foreground text-sm mb-2">
              Widget couldn't load. Use the direct link below.
            </p>
          )}
          <p className="text-muted-foreground text-xs italic mt-3">
            Free cancellation on most vehicles
          </p>
          <p className="text-sm mt-3">
            <a
              href={FALLBACK_URL}
              target="_blank"
              rel="noopener nofollow sponsored"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              {FALLBACK_LABEL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AffiliateWidget;
