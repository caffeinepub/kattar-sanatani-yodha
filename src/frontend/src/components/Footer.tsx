import { Link } from "@tanstack/react-router";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiWhatsapp, SiX, SiYoutube } from "react-icons/si";
import { useSiteContent } from "../context/SiteContentContext";

export default function Footer() {
  const { get } = useSiteContent();
  const currentYear = new Date().getFullYear();
  const appIdentifier =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "kattar-sanatani-yodha";

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
              {get(
                "footer.description",
                "सनातन धर्म के शाश्वत मूल्यों और परंपराओं को संरक्षित और प्रचारित करने के लिए समर्पित।",
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-foreground">
              त्वरित लिंक
            </h4>
            <ul className="space-y-2">
              {[
                { path: "/", label: "होम" },
                { path: "/about", label: "हमारे बारे में" },
                { path: "/programs", label: "कार्यक्रम" },
                { path: "/contact", label: "संपर्क करें" },
                { path: "/donate", label: "हमारा समर्थन करें" },
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
              संपर्क करें
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="mt-0.5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${get("contact.email", "adityarajsrivastav76@gmail.com")}`}
                  className="hover:text-primary transition-colors"
                >
                  {get("contact.email", "adityarajsrivastav76@gmail.com")}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone
                  size={16}
                  className="mt-0.5 text-primary flex-shrink-0"
                />
                <div className="space-y-1">
                  <a
                    href={`tel:${get("contact.phone1", "+918130608468")}`}
                    className="block hover:text-primary transition-colors"
                  >
                    {get("contact.phone1", "+91 81306 08468")}
                  </a>
                  <a
                    href={`tel:${get("contact.phone2", "+919259279963")}`}
                    className="block hover:text-primary transition-colors"
                  >
                    {get("contact.phone2", "+91 92592 79963")}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin
                  size={16}
                  className="mt-0.5 text-primary flex-shrink-0"
                />
                <span>{get("contact.address", "भारत")}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-foreground">
              हमें फॉलो करें
            </h4>
            <div className="flex gap-3">
              {[
                {
                  Icon: SiFacebook,
                  label: "Facebook",
                  url: "https://www.facebook.com/share/14QwdYfhLY2/",
                },
                {
                  Icon: SiX,
                  label: "X",
                  url: "https://x.com/VarshneyVi95121?t=ovt3Ut6VVD-WOJPgNLacDA&s=08",
                },
                {
                  Icon: SiWhatsapp,
                  label: "WhatsApp",
                  url: "https://chat.whatsapp.com/Gc6vidsxTL7J93D3tdBiDW?mode=gi_t",
                },
                {
                  Icon: SiYoutube,
                  label: "YouTube",
                  url: "https://www.youtube.com/@sanatani-omkar07",
                },
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
            <p>© {currentYear} KATTAR SANATANI YODHA. सर्वाधिकार सुरक्षित।</p>
            <p className="flex items-center gap-1">
              प्यार <Heart size={14} className="text-primary fill-primary" /> से
              बनाया गया{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>{" "}
              का उपयोग करके
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
