"""Post-md_to_tsx + pre-build patches for Andros BOSS site.
Implements rules #87, #100, #111, #118, #122, #126, #129, #132, #158, #159,
#160, #165, #166, #170, #181 from project memory.
"""
import re
from pathlib import Path

PAGES = Path("src/pages")
PUBLIC = Path("public")
SRC = Path("src")

# 1. Strip Netlify redirect from _redirects (rule #129/#181)
red = PUBLIC / "_redirects"
if red.exists():
    txt = red.read_text(encoding="utf-8")
    new = "\n".join(l for l in txt.splitlines() if ".netlify.app" not in l)
    if not new.strip().endswith("200"):
        new = new.rstrip() + "\n/* /index.html 200\n"
    red.write_text(new, encoding="utf-8")
    print("1. _redirects cleaned (CF Pages)")

# 2. Title length gate <=60 (rule #122/#166)
def truncate_title_in_seohead(s):
    m = re.search(r'<SEOHead[\s\S]*?title="([^"]+)"', s)
    if not m:
        return s
    t = m.group(1)
    if len(t) <= 60:
        return s
    if " | " in t:
        base, brand = t.rsplit(" | ", 1)
        new = base[: 60 - len(brand) - 3].rstrip() + " | " + brand
    else:
        new = t[:57].rstrip() + "..."
    if len(new) > 60:
        new = new[:60]
    print(f'   trunc title: "{t}" -> "{new}" ({len(new)}c)')
    return s.replace(f'title="{t}"', f'title="{new}"', 1)


for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    s2 = truncate_title_in_seohead(s)
    if s2 != s:
        f.write_text(s2, encoding="utf-8")

# 3. Hero subtitle white text (rule #158)
for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    s2 = re.sub(r"subtitle=\{<><p>", r'subtitle={<><p className="text-white drop-shadow-md">', s)
    if s2 != s:
        f.write_text(s2, encoding="utf-8")
        print(f"3. hero subtitle whitened in {f.name}")

# 4. Strip <a> from hero subtitles (rule #159)
for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    def strip_a(m):
        body = m.group(1)
        body = re.sub(r"<a [^>]*>([^<]*)</a>", r"\1", body)
        return f"subtitle={{<>{body}</>}}"
    s2 = re.sub(r"subtitle=\{<>([\s\S]*?)</>\}", strip_a, s)
    if s2 != s:
        f.write_text(s2, encoding="utf-8")
        print(f"4. stripped <a> from hero subtitle in {f.name}")

# 5. Strip **bold** in JSX text nodes and JSON-LD scalar fields (rule #87/#165)
for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    orig = s
    # In JSX text between > and <
    s = re.sub(r">([^<]*?)\*\*([^*<]+)\*\*([^<]*?)<",
               lambda m: f">{m.group(1)}<strong>{m.group(2)}</strong>{m.group(3)}<", s)
    # In schema scalar fields
    s = re.sub(r'("(?:headline|name|title)"\s*:\s*")\*\*([^"*]+?)\*\*"', r'\1\2"', s)
    s = re.sub(r'(title=")\*\*([^"*]+?)\*\*"', r'\1\2"', s)
    if s != orig:
        f.write_text(s, encoding="utf-8")
        print(f"5. stripped **bold** in {f.name}")

# 6. *italic* foreign words -> curly quotes (rule #170)
for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    orig = s
    s = re.sub(
        r"(?<![\*\w])\*([a-zA-Z][a-zA-Z\s'-]{1,40}?)\*(?![\*\w])",
        lambda m: "“" + m.group(1) + "”",
        s,
    )
    if s != orig:
        f.write_text(s, encoding="utf-8")
        print(f"6. *italic* -> curly quotes in {f.name}")

# 7. Strip "source text" leaks (rule #118)
for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    orig = s
    s = re.sub(
        r"\b(?:according to |as )?the source text (?:shows|notes|states|reveals|confirms|says)?,?\s*",
        "", s, flags=re.IGNORECASE,
    )
    s = re.sub(r"(?:as|per|in)\s+the\s+source\s+text", "", s, flags=re.IGNORECASE)
    if s != orig:
        f.write_text(s, encoding="utf-8")
        print(f'7. stripped "source text" in {f.name}')

# 8. FAQ schema strip "H3:" / "### " prefix (rule #111)
faq = PAGES / "FAQ.tsx"
if faq.exists():
    s = faq.read_text(encoding="utf-8")
    orig = s
    s = re.sub(r'"H3:\s*', '"', s)
    s = re.sub(r'"#+\s+', '"', s)
    if s != orig:
        faq.write_text(s, encoding="utf-8")
        print("8. FAQ H3:/### prefix stripped")

# 9. Section icon-title gap fix (rule #132)
section = SRC / "components" / "Section.tsx"
if section.exists():
    s = section.read_text(encoding="utf-8")
    orig = s
    new = re.sub(
        r"\{icon && <span className=\"inline-flex items-center gap-2\">\{icon\}</span>\}\{title\}",
        r'<span className="inline-flex items-center justify-center gap-3">{icon}<span>{title}</span></span>',
        s,
    )
    if new != s:
        section.write_text(new, encoding="utf-8")
        print("9. Section icon-title gap fixed")

# 10. Real Localrent widget — Mykonos fallback for Andros (rule #160/#180)
aw = SRC / "components" / "AffiliateWidget.tsx"
WIDGET_TSX = '''import { useEffect, useRef } from "react";

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
'''
aw.write_text(WIDGET_TSX, encoding="utf-8")
print("10. AffiliateWidget = real Localrent (Mykonos fallback)")

# 11. Inject <AffiliateWidget /> after each <HeroSection /> on content pages (rule #160)
CONTENT_PAGES = ["Index.tsx", "GavrioPortPickupGuide.tsx", "ChoosingTheRightCar.tsx",
                 "DrivingGuide.tsx", "DayTrips.tsx", "ParkingOnAndros.tsx", "FAQ.tsx"]
for pname in CONTENT_PAGES:
    p = PAGES / pname
    if not p.exists():
        continue
    s = p.read_text(encoding="utf-8")
    if "<AffiliateWidget" in s:
        continue
    # Line-based parser per rule #151
    lines = s.split("\n")
    out = []
    in_hero = False
    inserted = False
    for line in lines:
        out.append(line)
        if not inserted and not in_hero and re.match(r"\s*<HeroSection\b", line.strip()):
            # If single-line self-closing
            if line.rstrip().endswith("/>"):
                indent = re.match(r"(\s*)", line).group(1)
                out.append(f"{indent}<AffiliateWidget />")
                inserted = True
            else:
                in_hero = True
        elif in_hero and line.strip() == "/>":
            indent = re.match(r"(\s*)", line).group(1)
            out.append(f"{indent[:-2]}<AffiliateWidget />")
            in_hero = False
            inserted = True
    if inserted:
        new_s = "\n".join(out)
        # Add import if missing
        if 'import AffiliateWidget' not in new_s:
            new_s = re.sub(
                r"^((?:import [^\n]+\n)+)",
                r'\1import AffiliateWidget from "@/components/AffiliateWidget";\n',
                new_s, count=1,
            )
        p.write_text(new_s, encoding="utf-8")
        print(f"11. <AffiliateWidget /> injected after Hero in {pname}")

# 12. Verify each page has H1 (rule #23/#99)
print()
for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    has_h1 = re.search(r"<h1[\s>]", s)
    has_hero = re.search(r"<HeroSection\s+title=", s)
    if not has_h1 and not has_hero:
        print(f"12. WARN no H1 in {f.name}")

# 13. Title summary
print()
print("=== title gate ===")
for f in sorted(PAGES.glob("*.tsx")):
    s = f.read_text(encoding="utf-8")
    m = re.search(r'<SEOHead[\s\S]*?title="([^"]+)"', s)
    title = m.group(1) if m else "(none)"
    flag = "OK" if len(title) <= 60 else "LONG"
    print(f"  {f.name:40s} ({len(title):>3}c) [{flag}] {title[:60]}")
