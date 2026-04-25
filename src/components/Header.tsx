import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Port Pickup", path: "/gavrio-port-pickup-guide" },
  { label: "Choose Your Car", path: "/choosing-the-right-car" },
  { label: "Driving", path: "/driving-in-andros" },
  { label: "Day Trips", path: "/day-trips-from-andros" },
  { label: "Parking", path: "/parking-on-andros" },
  { label: "FAQ", path: "/andros-car-rental-faq" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDisclosure, setShowDisclosure] = useState(true);

  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Focus trap
  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;

    const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
    if (focusable.length) focusable[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {showDisclosure && (
        <div className="bg-accent/10 border-b border-accent/20 text-sm text-muted-foreground relative">
          <div className="container mx-auto py-2 pr-10 text-center">
            <span className="font-medium">Affiliate disclosure:</span> This site contains affiliate links. We may earn a commission at no extra cost to you.
          </div>
          <button
            onClick={() => setShowDisclosure(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close disclosure"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <nav className="container mx-auto flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary no-underline">
            Andros Car Rental
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium no-underline transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile overlay + slide-in */}
        <div
          className={`lg:hidden fixed inset-0 top-16 z-40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={closeMobile}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={menuRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`absolute top-0 right-0 w-72 h-full bg-background border-l border-border shadow-xl transition-transform duration-300 ease-out ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <ul className="flex flex-col p-6 gap-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobile}
                    className={`block px-4 py-3 rounded-md text-lg font-medium no-underline transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
