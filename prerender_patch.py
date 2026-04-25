"""Post-build patcher per rule #179.

Overrides prerender.mjs's slug-derived titles with real per-route SEOHead titles
(rule #156), upserts per-route meta description/OG/Twitter (rule #83), injects
FAQPage JSON-LD (rule #136/#176), and Article JSON-LD on guide pages (rule #112).
"""
import re
from pathlib import Path

DOMAIN = "andros-car-rental.com"
BRAND = "Andros Car Rental"

DIST = Path("dist")

# Per-route metadata (canonical from src/pages/*.tsx SEOHead)
ROUTES = {
    "/": {
        "title": "Andros Car Rental — Compare Local Deals 2026",
        "desc": "Compare independent local rental agencies on Andros island. Pricing, fleet, ferry pickup at Gavrio, 2WD vs 4×4 advice and the new 2025 Greek KOK rules.",
        "type": "WebSite",
    },
    "/gavrio-port-pickup-guide": {
        "title": "Gavrio Port Car Pickup — Andros Ferry Guide",
        "desc": "How car rental pickup works at Gavrio Port on Andros: ferry timing from Rafina, the meet-and-greet routine, peak bottlenecks, and what to do if your ferry is cancelled.",
        "type": "Article",
    },
    "/choosing-the-right-car": {
        "title": "Choosing a Car on Andros — 2WD vs 4×4 Verdict",
        "desc": "Honest 2WD vs 4×4 verdict for Andros: which beach you can reach in a Cat A 2WD, when a small SUV is enough, and the only drives that genuinely need a Suzuki Jimny.",
        "type": "Article",
    },
    "/driving-in-andros": {
        "title": "Driving on Andros — KOK 2025 Rules & Roads",
        "desc": "What is different about driving on Andros: the September 2025 Greek KOK speed and BAC fines, the meltemi wind, mountain passes and the aggressive Batsi-Gavrio stretch.",
        "type": "Article",
    },
    "/day-trips-from-andros": {
        "title": "Andros Day Trips by Car — Routes & Times",
        "desc": "Realistic Andros drives with km, minutes and road type: west-coast beach loop, Chora cultural day, Korthi south, Vitali, and the Achla 4×4 verdict.",
        "type": "Article",
    },
    "/parking-on-andros": {
        "title": "Parking on Andros — Chora, Batsi, Gavrio Lots",
        "desc": "Where to park on Andros: Chora pedestrianised core, Batsi back-of-beach blue zone, Gavrio port logistics, and the KOK 2025 €20-150 fines for incorrect display.",
        "type": "Article",
    },
    "/andros-car-rental-faq": {
        "title": "Andros Car Rental FAQ — Pricing, Ferry, Parking",
        "desc": "Answers to the 10 most common questions about renting a car on Andros: pricing, ferry, IDP, parking, insurance, driver age, and Gavrio Port pickup.",
        "type": "FAQPage",
    },
    "/about": {
        "title": "About Andros Car Rental — Methodology and Sources",
        "desc": "An independent comparison guide for car rental on Andros — driving notes, ELSTAT and Andros Routes data, KOK 2025 references, and the consumer protection routes.",
        "type": "AboutPage",
    },
    "/contact": {
        "title": "Contact Andros Car Rental",
        "desc": "Contact andros-car-rental.com by email at info@andros-car-rental.com. Response within 48 hours weekdays. For booking issues contact the rental agency directly.",
        "type": "ContactPage",
    },
    "/privacy": {
        "title": "Privacy Policy | Andros Car Rental",
        "desc": "Privacy policy for andros-car-rental.com — what data we collect, cookies, affiliate tracking, and how you can request data removal.",
        "type": "WebPage",
    },
}


def patch_html(html: str, route: str, meta: dict) -> str:
    title = meta["title"]
    desc = meta["desc"]
    canonical = f"https://{DOMAIN}{route if route != '/' else '/'}"
    og_url = canonical

    # 1. <title>
    html = re.sub(r"<title>[^<]*</title>", f"<title>{title}</title>", html, count=1)
    # 2. meta description
    html = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*"\s*/?>',
        f'<meta name="description" content="{desc}" />',
        html, count=1,
    )
    # 3. canonical
    if re.search(r'<link\s+rel="canonical"', html):
        html = re.sub(
            r'<link\s+rel="canonical"\s+href="[^"]*"\s*/?>',
            f'<link rel="canonical" href="{canonical}" />',
            html, count=1,
        )
    else:
        html = html.replace("</head>", f'    <link rel="canonical" href="{canonical}" />\n  </head>', 1)

    # 4. og:title / og:description / og:url / twitter:title / twitter:description
    OG_TW = [
        ('property="og:title"', title),
        ('property="og:description"', desc),
        ('property="og:url"', og_url),
        ('name="twitter:title"', title),
        ('name="twitter:description"', desc),
    ]
    for attr, val in OG_TW:
        pat = rf'<meta\s+{attr}\s+content="[^"]*"\s*/?>'
        new = f'<meta {attr} content="{val}" />'
        if re.search(pat, html):
            html = re.sub(pat, new, html, count=1)
        else:
            html = html.replace("</head>", f"    {new}\n  </head>", 1)
    return html


def inject_faq_schema(html: str, faq_tsx: Path) -> str:
    """Read FAQ.tsx items array, build FAQPage JSON-LD, inject as <script>."""
    if not faq_tsx.exists():
        return html
    src = faq_tsx.read_text(encoding="utf-8")
    # Match question:/answer: pairs in items={[...]}
    items = re.findall(
        r'\{\s*question:\s*"([^"]+)"\s*,\s*answer:\s*"([\s\S]*?)"\s*\}',
        src,
    )
    if not items:
        return html

    def clean_answer(a: str) -> str:
        # Strip HTML tags from answer for schema text
        a = re.sub(r"<[^>]+>", "", a)
        a = re.sub(r"\\([\"\\])", r"\1", a)  # unescape \"
        a = re.sub(r"\s+", " ", a).strip()
        return a[:500]

    main_entity = []
    for q, a in items:
        clean_q = re.sub(r"\\([\"\\])", r"\1", q).strip()
        main_entity.append({
            "@type": "Question",
            "name": clean_q,
            "acceptedAnswer": {"@type": "Answer", "text": clean_answer(a)},
        })

    import json
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": main_entity,
    }
    script = f'<script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>'
    return html.replace("</head>", f"    {script}\n  </head>", 1)


def inject_article_schema(html: str, route: str, meta: dict) -> str:
    canonical = f"https://{DOMAIN}{route}"
    import json
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta["title"],
        "description": meta["desc"],
        "url": canonical,
        "mainEntityOfPage": canonical,
        "author": {"@type": "Organization", "name": BRAND, "url": f"https://{DOMAIN}"},
        "publisher": {
            "@type": "Organization",
            "name": BRAND,
            "url": f"https://{DOMAIN}",
            "logo": {
                "@type": "ImageObject",
                "url": f"https://{DOMAIN}/favicon-512.png",
            },
        },
        "datePublished": "2026-04-25",
        "dateModified": "2026-04-25",
    }
    script = f'<script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>'
    return html.replace("</head>", f"    {script}\n  </head>", 1)


# Map route -> dist path
def route_to_path(route: str) -> Path:
    if route == "/":
        return DIST / "index.html"
    return DIST / route.lstrip("/") / "index.html"


# Apply patches
patched = 0
for route, meta in ROUTES.items():
    p = route_to_path(route)
    if not p.exists():
        print(f"SKIP {route}: {p} not found")
        continue
    html = p.read_text(encoding="utf-8")
    html = patch_html(html, route, meta)
    if meta["type"] == "FAQPage":
        html = inject_faq_schema(html, Path("src/pages/FAQ.tsx"))
    elif meta["type"] == "Article":
        html = inject_article_schema(html, route, meta)
    p.write_text(html, encoding="utf-8")
    print(f"OK   {route} -> {p}")
    patched += 1

print(f"\nDone: {patched} routes patched")
