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
