import { BookOpen, Flame, Heart, Users } from "lucide-react";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import { useSiteContent } from "../context/SiteContentContext";

export default function Home() {
  const { get } = useSiteContent();

  const highlights = [
    {
      icon: Flame,
      title: get("home.highlight1.title", "सांस्कृतिक संरक्षण"),
      description: get(
        "home.highlight1.description",
        "हमारी प्राचीन परंपराओं, अनुष्ठानों और पवित्र प्रथाओं की रक्षा और प्रचार।",
      ),
    },
    {
      icon: BookOpen,
      title: get("home.highlight2.title", "आध्यात्मिक शिक्षा"),
      description: get(
        "home.highlight2.description",
        "वेद, उपनिषद और अन्य पवित्र ग्रंथों की गहन बुद्धि की शिक्षा।",
      ),
    },
    {
      icon: Users,
      title: get("home.highlight3.title", "समुदाय निर्माण"),
      description: get(
        "home.highlight3.description",
        "धर्म के प्रति समर्पित व्यक्तियों का एक मजबूत नेटवर्क बनाना।",
      ),
    },
    {
      icon: Heart,
      title: get("home.highlight4.title", "सामाजिक सेवा"),
      description: get(
        "home.highlight4.description",
        "धार्मिक मूल्यों में निहित धर्मार्थ गतिविधियों के माध्यम से समाज की सेवा।",
      ),
    },
  ];

  return (
    <div>
      <Hero />
      <Mission />

      {/* राष्ट्रीय उपाध्यक्ष Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Left: Text Content */}
              <div className="flex-1 text-center md:text-left order-2 md:order-1">
                <div className="inline-block bg-orange-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                  राष्ट्रीय उपाध्यक्ष व संस्थापक
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-orange-900 mb-2">
                  आदित्य राज श्रीवास्तव
                </h2>
                <p className="text-orange-700 font-semibold text-lg mb-6">
                  राष्ट्रीय उपाध्यक्ष व संस्थापक — कट्टर सनातनी योद्धा संघ
                </p>
                <blockquote className="border-l-4 border-orange-500 pl-5 text-gray-700 text-base md:text-lg leading-relaxed italic">
                  "धर्म की रक्षा के लिए समर्पित, सनातन संस्कृति के सजग प्रहरी। जिनके नेतृत्व
                  में 'कट्टर सनातनी योद्धा संघ' निरंतर धर्म-ध्वजा फहरा रहा है, ऐसे हमारे
                  मार्गदर्शक एवं राष्ट्रीय उपाध्यक्ष व संस्थापक जी को सादर नमन।"
                </blockquote>
              </div>
              {/* Right: Photo */}
              <div className="flex-shrink-0 order-1 md:order-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-orange-400 translate-x-2 translate-y-2" />
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-20-at-4.01.30-PM-1.jpeg"
                    alt="आदित्य राज श्रीवास्तव - राष्ट्रीय उपाध्यक्ष व संस्थापक"
                    className="relative w-64 h-80 object-cover rounded-2xl shadow-xl border-4 border-orange-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* राष्ट्रीय अध्यक्ष Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Left: Text Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-orange-700 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                  राष्ट्रीय अध्यक्ष
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-orange-900 mb-2">
                  विष्णु वार्ष्णेय
                </h2>
                <p className="text-orange-700 font-semibold text-lg mb-6">
                  राष्ट्रीय अध्यक्ष — कट्टर सनातनी योद्धा संघ
                </p>
                <blockquote className="border-l-4 border-orange-600 pl-5 text-gray-700 text-base md:text-lg leading-relaxed italic">
                  सनातन धर्म के ध्वजवाहक और कट्टर सनातनी योद्धा संघ के सर्वोच्च मार्गदर्शक,
                  आदरणीय राष्ट्रीय अध्यक्ष जी। हिंदू एकता और राष्ट्रवाद के प्रखर स्वर, कट्टर
                  सनातनी योद्धा संघ के यशस्वी राष्ट्रीय अध्यक्ष। हिंदू एकता और राष्ट्रवाद के
                  प्रखर स्वर, कट्टर सनातनी योद्धा संघ के यशस्वी राष्ट्रीय अध्यक्ष।
                </blockquote>
              </div>
              {/* Right: Photo */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-orange-500 translate-x-2 translate-y-2" />
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-20-at-6.29.46-PM-1.jpeg"
                    alt="विष्णु वार्ष्णेय - राष्ट्रीय अध्यक्ष"
                    className="relative w-64 h-80 object-cover rounded-2xl shadow-xl border-4 border-orange-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {get("home.whatwedo.title", "हम क्या करते हैं")}
            </h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              {get(
                "home.whatwedo.subtitle",
                "हमारा संगठन हमारी पवित्र विरासत को मजबूत करने और संरक्षित करने के लिए कई मोर्चों पर अथक परिश्रम करता है।",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-warm"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon size={24} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="support"
        className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {get("home.cta.title", "हमारे पवित्र मिशन से जुड़ें")}
            </h2>
            <p className="font-serif text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {get(
                "home.cta.description",
                "सनातन धर्म के शाश्वत मूल्यों को संरक्षित और प्रचारित करने के लिए समर्पित एक आंदोलन का हिस्सा बनें।",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
              >
                हमारा समर्थन करें
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-card text-foreground font-semibold rounded-lg hover:bg-muted transition-all border-2 border-border"
              >
                जुड़ें
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
