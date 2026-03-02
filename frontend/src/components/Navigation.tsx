import { useState } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Menu, X, Shield } from 'lucide-react';
import { useMemberAuth } from '../hooks/useMemberAuth';

const navLinks = [
  { label: 'होम', path: '/' },
  { label: 'हमारे बारे में', path: '/about' },
  { label: 'कार्यक्रम', path: '/programs' },
  { label: 'दर्शन', path: '/philosophy' },
  { label: 'संसाधन', path: '/resources' },
  { label: 'संपर्क करें', path: '/contact' },
  { label: 'हमारा समर्थन करें', path: '/donate' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, memberLogout } = useMemberAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate({ to: '/' })}
          >
            <img
              src="/assets/kattar sanatani yodha logo.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-primary"
            />
            <span className="font-display text-lg font-bold text-primary hidden sm:block">
              कट्टर सनातनी योद्धा
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* सदस्य बनें button */}
            <button
              onClick={() => navigate({ to: '/membership' })}
              className="ml-2 px-4 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              सदस्य बनें
            </button>

            {/* Member login/dashboard */}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate({ to: '/dashboard' })}
                  className="ml-1 px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                >
                  मेरा खाता
                </button>
                <button
                  onClick={memberLogout}
                  className="ml-1 px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-destructive transition-colors"
                >
                  लॉगआउट
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate({ to: '/login' })}
                className="ml-1 px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                लॉगिन
              </button>
            )}

            {/* Admin */}
            <button
              onClick={() => navigate({ to: '/admin' })}
              className="ml-1 p-2 rounded-md text-foreground/50 hover:text-primary hover:bg-primary/5 transition-colors"
              title="प्रबंधन"
            >
              <Shield className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigate({ to: link.path }); setIsMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => { navigate({ to: '/membership' }); setIsMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
          >
            सदस्य बनें
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => { navigate({ to: '/dashboard' }); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                मेरा खाता
              </button>
              <button
                onClick={() => { memberLogout(); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-destructive transition-colors"
              >
                लॉगआउट
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate({ to: '/login' }); setIsMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
            >
              लॉगिन
            </button>
          )}

          <button
            onClick={() => { navigate({ to: '/admin' }); setIsMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-foreground/50 hover:text-primary hover:bg-primary/5 transition-colors"
          >
            प्रबंधन
          </button>
        </div>
      )}
    </nav>
  );
}
