import { useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "होम", path: "/" },
  { label: "हमारे बारे में", path: "/about" },
  { label: "कार्यक्रम", path: "/programs" },
  { label: "दर्शन", path: "/philosophy" },
  { label: "हमारा सफ़लता", path: "/safalta" },
  { label: "संसाधन", path: "/resources" },
  { label: "संपर्क करें", path: "/contact" },
  { label: "हमारा समर्थन करें", path: "/donate" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0"
            onClick={() => navigate({ to: "/" })}
          >
            <img
              src="/assets/kattar sanatani yodha logo.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-primary"
            />
            <span className="font-display text-lg font-bold text-primary hidden sm:block">
              कट्टर सनातनी योद्धा
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                data-ocid={`nav.${link.path.replace("/", "") || "home"}.link`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* हमसे जुड़ें button — Form */}
            <a
              href="https://te8dzxj2.forms.app/untitled-form"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-bold text-white transition-all shadow-sm hover:opacity-90 hover:shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
              }}
            >
              हमसे जुड़ें
            </a>

            {/* Admin */}
            <button
              type="button"
              onClick={() => navigate({ to: "/admin" })}
              className="ml-1 p-2 rounded-md text-foreground/50 hover:text-primary hover:bg-primary/5 transition-colors"
              title="प्रबंधन"
            >
              <Shield className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.path}
              onClick={() => {
                navigate({ to: link.path });
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* हमसे जुड़ें — Mobile */}
          <a
            href="https://te8dzxj2.forms.app/untitled-form"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md text-sm font-bold text-white transition-all hover:opacity-90 mt-1"
            style={{
              background:
                "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
            }}
          >
            हमसे जुड़ें
          </a>

          <button
            type="button"
            onClick={() => {
              navigate({ to: "/admin" });
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground/50 hover:text-primary hover:bg-primary/5 transition-colors"
          >
            प्रबंधन
          </button>
        </div>
      )}
    </nav>
  );
}
