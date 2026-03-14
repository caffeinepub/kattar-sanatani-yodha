import { ArrowDown } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";

export default function Hero() {
  const { get } = useSiteContent();

  const scrollToDonate = () => {
    const donateSection = document.getElementById("support");
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/generated/hero-banner.png)" }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
            {get("hero.title", "KATTAR SANATANI YODHA")}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-white/95 italic">
            {get("hero.tagline", "धर्मो रक्षति रक्षितः")}
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {get(
              "hero.description",
              "आने वाली पीढ़ियों के लिए सनातन धर्म के हमेशा रहने वाले ज्ञान और मूल्यों को बचाने, उनकी रक्षा करने और उन्हें बढ़ावा देने के लिए समर्पित।",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              type="button"
              onClick={scrollToDonate}
              className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all shadow-lg hover:scale-105"
            >
              {get("hero.cta_primary", "हमारे मिशन का समर्थन करें")}
            </button>
            <a
              href="/about"
              className="px-8 py-4 bg-orange-500/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-orange-500/40 transition-all border-2 border-orange-300/50"
            >
              {get("hero.cta_secondary", "और जानें")}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={32} className="text-white/70" />
        </div>
      </div>
    </section>
  );
}
