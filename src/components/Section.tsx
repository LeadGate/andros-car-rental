import type { ReactNode } from "react";

interface SectionProps {
  title?: string;
  icon?: ReactNode;
  alt?: boolean;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, icon, alt, children, className = "" }: SectionProps) => {
  const bgClass = alt ? "section-alt" : "";

  return (
    <section className={`py-14 ${bgClass} ${className}`.trim()}>
      <div className="container mx-auto">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">
            {icon && <span className="inline-flex items-center gap-2">{icon}</span>}
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
