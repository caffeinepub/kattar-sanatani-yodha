import {
  BookOpen,
  GraduationCap,
  HandHeart,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import ProgramCard from "../components/ProgramCard";
import { useSiteContent } from "../context/SiteContentContext";

export default function Programs() {
  const { get } = useSiteContent();

  const programs = [
    {
      icon: BookOpen,
      title: get("programs.card1.title", "वैदिक स्टडी सर्कल"),
      description: get(
        "programs.card1.description",
        "वेद, उपनिषद और भगवद गीता जैसे पवित्र ग्रंथों की पढ़ाई और चर्चा के लिए नियमित सत्र। अनुभवी विद्वानों से सीखें और अपनी आध्यात्मिक समझ को गहरा करें।",
      ),
    },
    {
      icon: Sparkles,
      title: get("programs.card2.title", "सांस्कृतिक उत्सव"),
      description: get(
        "programs.card2.description",
        "उचित अनुष्ठानों के साथ पारंपरिक हिंदू त्योहारों का आयोजन और उत्सव, प्रामाणिकता बनाए रखते हुए सामुदायिक बंधन और सांस्कृतिक जागरूकता पैदा करना।",
      ),
    },
    {
      icon: GraduationCap,
      title: get("programs.card3.title", "युवा शिक्षा कार्यक्रम"),
      description: get(
        "programs.card3.description",
        "युवा मन को धार्मिक मूल्यों, संस्कृत भाषा, पारंपरिक कलाओं और सनातन धर्म की समृद्ध विरासत के बारे में शिक्षित करने की विशेष पहल।",
      ),
    },
    {
      icon: Users,
      title: "सामुदायिक सभाएं",
      description:
        "नियमित सत्संग, भजन सत्र और आध्यात्मिक प्रवचन जो सामूहिक पूजा और सीखने के लिए समुदाय को एक साथ लाते हैं।",
    },
    {
      icon: Heart,
      title: "सामाजिक कल्याण गतिविधियां",
      description:
        "सेवा के सिद्धांत को मूर्त रूप देते हुए खाद्य वितरण, शैक्षिक सहायता और जरूरतमंदों की सहायता सहित धर्मार्थ पहल।",
    },
    {
      icon: HandHeart,
      title: "विरासत संरक्षण",
      description:
        "भविष्य की पीढ़ियों के लिए पारंपरिक प्रथाओं, अनुष्ठानों, लोक कलाओं और सांस्कृतिक ज्ञान का दस्तावेजीकरण और संरक्षण।",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            {get("programs.title", "हमारे कार्यक्रम")}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {get(
              "programs.subtitle",
              "परंपरा को संरक्षित करने, ज्ञान फैलाने और समुदाय की सेवा करने के लिए समर्पित विविध पहल",
            )}
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {programs.map((program) => (
              <ProgramCard
                key={program.title}
                icon={program.icon}
                title={program.title}
                description={program.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-foreground mb-8">
              बदलाव लाना
            </h2>
            <p className="font-serif text-lg text-muted-foreground leading-relaxed mb-12">
              हमारे विभिन्न कार्यक्रमों और पहलों के माध्यम से, हम अनगिनत जीवनों को छूते हैं,
              सामुदायिक बंधनों को मजबूत करते हैं, और यह सुनिश्चित करते हैं कि सनातन धर्म की
              शाश्वत बुद्धि मार्गदर्शन और प्रेरणा देती रहे।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "500+", label: "समुदाय के सदस्य" },
                { number: "50+", label: "आयोजित कार्यक्रम" },
                { number: "1000+", label: "प्रभावित जीवन" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl p-6 shadow-sm border border-border"
                >
                  <div className="font-display text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              जुड़ें
            </h2>
            <p className="font-serif text-lg text-muted-foreground mb-8 leading-relaxed">
              सनातन धर्म को संरक्षित और प्रचारित करने के हमारे मिशन में हमारे साथ जुड़ें।
              भागीदारी, स्वयंसेवा या समर्थन के माध्यम से, हर योगदान फर्क डालता है।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
              >
                संपर्क करें
              </a>
              <a
                href="/donate"
                className="px-8 py-4 bg-card text-foreground font-semibold rounded-lg hover:bg-muted transition-all border-2 border-border"
              >
                हमारे काम का समर्थन करें
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
