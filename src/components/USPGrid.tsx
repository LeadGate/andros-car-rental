import { Car, CreditCard, Mountain, Plane, Shield, Clock, MapPin, Star, Fuel, Settings, CheckCircle, AlertTriangle, FileText, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Car,
  CreditCard,
  Mountain,
  Plane,
  Shield,
  Clock,
  MapPin,
  Star,
  Fuel,
  Settings,
  CheckCircle,
  AlertTriangle,
  FileText,
  Info,
};

interface USPGridProps {
  items: Array<{ icon: string; title: string; description: string }>;
  columns?: 3 | 4;
}

const USPGrid = ({ items, columns = 4 }: USPGridProps) => {
  const colClass = columns === 3
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid ${colClass} gap-6`}>
      {items.map((item) => {
        const IconComponent = iconMap[item.icon];
        return (
          <div
            key={item.title}
            className="bg-background card-shadow rounded-lg p-6 border border-border hover:card-shadow-hover transition-shadow"
          >
            <div className="mb-4">
              {IconComponent ? (
                <IconComponent className="text-accent" size={32} />
              ) : (
                <span className="text-3xl">{item.icon}</span>
              )}
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default USPGrid;
