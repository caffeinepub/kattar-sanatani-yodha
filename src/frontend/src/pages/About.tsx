import { Award, Eye, Target, Users } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";

export default function About() {
  const { get } = useSiteContent();

  const principles = [
    {
      icon: Target,
      title: get("about.principle1.title", "हमारा उद्देश्य"),
      description: get(
        "about.principle1.description",
        "सनातन धर्म के अटल रक्षक बनना, यह सुनिश्चित करना कि इसके सिद्धांत सभी पीढ़ियों के लिए जीवंत और प्रासंगिक बने रहें।",
      ),
    },
    {
      icon: Eye,
      title: get("about.principle2.title", "हमारी दृष्टि"),
      description: get(
        "about.principle2.description",
        "एक ऐसी दुनिया जहाँ सनातन धर्म की शाश्वत बुद्धि मानवता को धार्मिकता, शांति और आध्यात्मिक पूर्णता की ओर मार्गदर्शन करे।",
      ),
    },
    {
      icon: Award,
      title: get("about.principle3.title", "हमारे मूल्य"),
      description: get(
        "about.principle3.description",
        "धर्म (धार्मिकता), सत्य (सच्चाई), अहिंसा (अहिंसा), सेवा (निःस्वार्थ सेवा), और भक्ति (समर्पण)।",
      ),
    },
    {
      icon: Users,
      title: get("about.principle4.title", "हमारा समुदाय"),
      description: get(
        "about.principle4.description",
        "साझा आस्था, परस्पर सम्मान और धार्मिक जीवन के प्रति प्रतिबद्धता से एकजुट समर्पित व्यक्तियों का एक विविध परिवार।",
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/generated/pattern-bg.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-background/95" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            {get("about.hero.title", "हमारे बारे में")}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {get(
              "about.hero.subtitle",
              "आस्था के योद्धा, परंपरा के रक्षक, धर्म के सेवक",
            )}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-8 text-center">
              {get("about.story.title", "हमारी कहानी")}
            </h2>
            <div className="space-y-6 font-serif text-lg text-muted-foreground leading-relaxed">
              <p>
                {get(
                  "about.story.para1",
                  "KATTAR SANATANI YODHA का जन्म एक बदलती दुनिया में सनातन धर्म के शाश्वत सिद्धांतों को संरक्षित और सुरक्षित करने की गहरी प्रतिबद्धता से हुआ। हम समर्पित व्यक्तियों का एक समूह हैं जो हमारी प्राचीन परंपराओं और शास्त्रों में निहित गहन ज्ञान को पहचानते हैं।",
                )}
              </p>
              <p>
                {get(
                  "about.story.para2",
                  '"कट्टर" शब्द हमारी अटूट निष्ठा को दर्शाता है, "सनातनी" शाश्वत सत्य से हमारे संबंध को व्यक्त करता है, और "योद्धा" धार्मिक मूल्यों की रक्षा और प्रचार में हमारी योद्धा भावना को मूर्त रूप देता है। हम अपनी मान्यताओं में दृढ़ रहते हुए सनातन धर्म की समावेशी और सार्वभौमिक प्रकृति को अपनाते हैं।',
                )}
              </p>
              <p>
                हमारा संगठन समुदायों को शिक्षित, प्रेरित और सशक्त बनाने के लिए जमीनी स्तर
                पर काम करता है। सांस्कृतिक कार्यक्रमों, आध्यात्मिक प्रवचनों, सामाजिक सेवा
                पहलों और शैक्षिक गतिविधियों के माध्यम से, हम भविष्य की पीढ़ियों के लिए धर्म
                की ज्योति को प्रज्वलित रखने का प्रयास करते हैं।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-card rounded-xl p-8 shadow-sm hover:shadow-warm transition-all border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <principle.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-12 text-center">
              हमारी मूल मान्यताएं
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "शाश्वत धर्म",
                  text: "हम सनातन धर्म के कालातीत और सार्वभौमिक सिद्धांतों में विश्वास करते हैं जो मानवता को धार्मिकता की ओर मार्गदर्शन करते हैं।",
                },
                {
                  title: "सांस्कृतिक विरासत",
                  text: "हमारी समृद्ध परंपराएं, अनुष्ठान, त्योहार और प्रथाएं अमूल्य खजाने हैं जिन्हें संरक्षित और आगे बढ़ाया जाना चाहिए।",
                },
                {
                  title: "आध्यात्मिक ज्ञान",
                  text: "वेद, उपनिषद, भगवद गीता और अन्य पवित्र ग्रंथों में आध्यात्मिक विकास के लिए गहन ज्ञान है।",
                },
                {
                  title: "विविधता में एकता",
                  text: "हम अपने मूल मूल्यों और सिद्धांतों में एकता बनाए रखते हुए सनातन धर्म के भीतर विविध मार्गों को अपनाते हैं।",
                },
                {
                  title: "समाज सेवा",
                  text: "सच्चा धर्म निःस्वार्थ सेवा, करुणा और सभी प्राणियों के कल्याण के लिए काम करने के माध्यम से प्रकट होता है।",
                },
              ].map((belief, i) => (
                <div
                  key={belief.title}
                  className="flex gap-4 p-6 bg-card rounded-lg border-l-4 border-primary hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {belief.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {belief.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
