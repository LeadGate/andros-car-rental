interface HeroOverlayProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  description?: string;
  badges?: Array<{ icon: string; text: string }>;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage: string;
  backgroundAlt?: string;
}

const HeroOverlay = ({
  title,
  subtitle,
  lastUpdated,
  description,
  badges,
  ctaText,
  ctaHref,
  backgroundImage,
  backgroundAlt,
}: HeroOverlayProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <img
        src={backgroundImage}
        alt={backgroundAlt || ""}
        width={1600}
        height={900}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay, linear-gradient(to bottom, hsla(213,61%,27%,0.75), hsla(213,61%,27%,0.85)))" }}
      />
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
          {title}
        </h1>
        <h2 className="text-lg md:text-xl text-primary-foreground/80 font-normal mb-3 max-w-3xl mx-auto">
          {subtitle}
        </h2>
        {lastUpdated && (
          <p className="text-sm text-primary-foreground/50 mb-6">Last updated: {lastUpdated}</p>
        )}
        {description && (
          <p className="text-primary-foreground/70 mb-8 max-w-2xl mx-auto">{description}</p>
        )}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {badges.map((badge) => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm px-4 py-2 rounded-full backdrop-blur-sm"
              >
                <span>{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>
        )}
        {ctaText && (
          <a
            href={ctaHref || "#affiliate-widget"}
            className="inline-block bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity no-underline text-lg"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
};

export default HeroOverlay;
