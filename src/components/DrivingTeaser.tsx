import { Link } from "react-router-dom";
import { FileText, AlertTriangle, Shield, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  AlertTriangle,
  Shield,
};

interface DrivingTeaserProps {
  items: Array<{ icon: string; title: string; text: string; type: "info" | "warning" }>;
  ctaText?: string;
  ctaHref?: string;
}

const DrivingTeaser = ({ items, ctaText, ctaHref }: DrivingTeaserProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {items.map((item) => {
          const IconComponent = iconMap[item.icon];
          const boxClass = item.type === "warning" ? "warning-box" : "info-box";
          const iconColor = item.type === "warning" ? "text-accent" : "text-primary";

          return (
            <div key={item.title} className={`${boxClass} flex items-start gap-3`}>
              {IconComponent && (
                <IconComponent className={`${iconColor} mt-1 flex-shrink-0`} size={20} />
              )}
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      {ctaText && ctaHref && (
        <Link
          to={ctaHref}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-md no-underline hover:opacity-90 transition-opacity"
        >
          {ctaText} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default DrivingTeaser;
