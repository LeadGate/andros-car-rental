import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Port Pickup", path: "/gavrio-port-pickup-guide" },
  { label: "Choose Your Car", path: "/choosing-the-right-car" },
  { label: "Driving", path: "/driving-in-andros" },
  { label: "Day Trips", path: "/day-trips-from-andros" },
  { label: "Parking", path: "/parking-on-andros" },
  { label: "FAQ", path: "/andros-car-rental-faq" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy" },
];

const Footer = () => (
  <footer className="py-12" style={{ backgroundColor: "hsl(var(--footer-bg))", color: "hsl(var(--footer-foreground))" }}>
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Left — Brand */}
        <div>
          <Link to="/" className="text-xl font-bold no-underline" style={{ color: "hsl(var(--footer-foreground))" }}>
            Andros Car Rental
          </Link>
          <p className="text-sm mt-3 opacity-70">
            <a href="mailto:info@andros-car-rental.com" className="no-underline hover:opacity-100 transition-opacity" style={{ color: "hsl(var(--footer-foreground))" }}>
              info@andros-car-rental.com
            </a>
          </p>
        </div>

        {/* Center — Quick Links */}
        <div>
          <h3 className="uppercase tracking-wider mb-4 font-semibold" style={{ color: "hsl(var(--footer-foreground))", fontSize: "13px" }}>Quick Links</h3>
          <ul className="space-y-2">
            {footerLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-sm no-underline opacity-70 hover:opacity-100" style={{ color: "hsl(var(--footer-foreground))" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Partners */}
        <div>
          <h3 className="uppercase tracking-wider mb-4 font-semibold" style={{ color: "hsl(var(--footer-foreground))", fontSize: "13px" }}>Trusted Partners & Resources</h3>
          <ul className="space-y-3">
                        <li>
              <a href="https://www.visitgreece.gr/islands/cyclades/andros/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Visit Greece — Andros
              </a>
            </li>
            <li>
              <a href="https://www.androsroutes.gr/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Andros Routes — Hiking Trails
              </a>
            </li>
            <li>
              <a href="https://www.hcg.gr/en/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Hellenic Coast Guard
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t pt-6 text-center text-xs opacity-60" style={{ borderColor: "hsl(var(--footer-foreground) / 0.2)" }}>
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <span>&copy; {new Date().getFullYear()} andros-car-rental.com &middot; All rights reserved</span>
          <Link to="/privacy-policy" className="no-underline hover:opacity-100" style={{ color: "hsl(var(--footer-foreground))" }}>Privacy Policy</Link>
          <span>&middot;</span>
          <Link to="/terms" className="no-underline hover:opacity-100" style={{ color: "hsl(var(--footer-foreground))" }}>Terms of Use</Link>
        </div>
        <p className="m-0 opacity-70">
          Affiliate disclosure: This site contains affiliate links. When you book through our links, we may earn a small commission at no extra cost to you.
        </p>
        <p className="mt-2 opacity-50 text-xs">Last updated: April 2026</p>
      </div>
    </div>
  </footer>
);

export default Footer;
