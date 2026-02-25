import { Link } from '@tanstack/react-router';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { SiFacebook, SiX, SiWhatsapp, SiYoutube } from 'react-icons/si';

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
                <a 
                  href="mailto:adityarajsrivastav76@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  adityarajsrivastav76@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="mt-0.5 text-primary flex-shrink-0" />
                <div className="space-y-1">
                  <a 
                    href="tel:+918130608468"
                    className="block hover:text-primary transition-colors"
                  >
                    +91 81306 08468
                  </a>
                  <a 
                    href="tel:+919259279963"
                    className="block hover:text-primary transition-colors"
                  >
                    +91 92592 79963
                  </a>
                </div>
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
                { Icon: SiFacebook, label: 'Facebook', url: 'https://www.facebook.com/share/14QwdYfhLY2/' },
                { Icon: SiX, label: 'X', url: 'https://x.com/VarshneyVi95121?t=ovt3Ut6VVD-WOJPgNLacDA&s=08' },
                { Icon: SiWhatsapp, label: 'WhatsApp', url: 'https://chat.whatsapp.com/Gc6vidsxTL7J93D3tdBiDW?mode=gi_t' },
                { Icon: SiYoutube, label: 'YouTube', url: 'https://www.youtube.com/@sanatani-omkar07' },
              ].map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-md bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
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
