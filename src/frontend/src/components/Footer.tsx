import { Link } from '@tanstack/react-router';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'kattar-sanatani-yodha';

  return (
    <footer className="bg-card border-t border-border pattern-overlay">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/kattar sanatani yodha logo.jpg" 
                alt="KATTAR SANATANI YODHA logo" 
                className="h-12 w-12 object-contain"
              />
              <h3 className="font-display text-lg font-bold text-primary">
                KATTAR SANATANI YODHA
              </h3>
            </div>
            <p className="text-sm text-muted-foreground font-serif leading-relaxed">
              Dedicated to preserving and promoting the timeless values and traditions of Sanatana Dharma.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/programs', label: 'Programs' },
                { path: '/contact', label: 'Contact' },
                { path: '/donate', label: 'Support Us' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="mt-0.5 text-primary flex-shrink-0" />
                <span>info@kattarsanataniyodha.org</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="mt-0.5 text-primary flex-shrink-0" />
                <span>+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 text-primary flex-shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-foreground">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[
                { Icon: SiFacebook, label: 'Facebook' },
                { Icon: SiX, label: 'X' },
                { Icon: SiInstagram, label: 'Instagram' },
                { Icon: SiYoutube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} KATTAR SANATANI YODHA. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Built with <Heart size={14} className="text-primary fill-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
