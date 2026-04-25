import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

interface LocationCardsProps {
  locations: Array<{ name: string; slug: string; hook: string }>;
}

const LocationCards = ({ locations }: LocationCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {locations.map((loc) => (
        <Link
          key={loc.slug}
          to={`/${loc.slug}`}
          className="bg-background card-shadow rounded-lg p-6 border border-border hover:card-shadow-hover transition-shadow no-underline group"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="text-accent" size={20} />
            <h3 className="text-lg font-bold text-primary m-0">{loc.name}</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">{loc.hook}</p>
          <span className="inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
            See Guide <ArrowRight size={14} />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default LocationCards;
