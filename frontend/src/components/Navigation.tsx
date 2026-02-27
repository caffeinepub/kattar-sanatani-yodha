import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const showAdminLink = isAuthenticated && isAdmin;

  const navLinks = [
    { path: '/', label: 'होम' },
    { path: '/about', label: 'हमारे बारे में' },
    { path: '/programs', label: 'कार्यक्रम' },
    { path: '/philosophy', label: 'दर्शन' },
    { path: '/resources', label: 'संसाधन' },
    { path: '/contact', label: 'संपर्क करें' },
    { path: '/donate', label: 'हमारा समर्थन करें' },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/kattar sanatani yodha logo.jpg"
              alt="KATTAR SANATANI YODHA logo"
              className="h-14 w-14 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-primary">KATTAR SANATANI YODHA</span>
              <span className="text-xs text-muted-foreground font-serif italic">परंपरा के रक्षक</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {showAdminLink && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
                  isActive('/admin')
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <Shield className="w-4 h-4" />
                प्रबंधन
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="मेनू खोलें"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {showAdminLink && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md font-medium transition-all flex items-center gap-2 ${
                    isActive('/admin')
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  प्रबंधन
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
