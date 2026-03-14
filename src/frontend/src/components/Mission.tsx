import { BookOpen, Heart, Shield, Users } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";

export default function Mission() {
  const { get } = useSiteContent();

  const values = [
    {
      icon: Heart,
      title: get("mission.value1.title", "भक्ति"),
      description: get(
        "mission.value1.description",
        "धर्म के शाश्वत सिद्धांतों के प्रति अटूट समर्पण",
      ),
    },
    {
      icon: Shield,
      title: get("mission.value2.title", "रक्षा"),
      description: get(
        "mission.value2.description",
        "हमारी पवित्र परंपराओं और सांस्कृतिक विरासत की सुरक्षा",
      ),
    },
    {
      icon: BookOpen,
      title: get("mission.value3.title", "ज्ञान"),
      description: get(
        "mission.value3.description",
        "हमारे प्राचीन शास्त्रों की शाश्वत बुद्धि का प्रसार",
      ),
    },
    {
      icon: Users,
      title: get("mission.value4.title", "एकता"),
      description: get(
        "mission.value4.description",
        "साझा मूल्यों में निहित एक मजबूत समुदाय का निर्माण",
      ),
    },
  ];

  return (
    <section className="py-20 bg-muted/30 pattern-overlay">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            {get("mission.title", "हमारा पवित्र मिशन")}
          </h2>
          <p className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed">
            {get(
              "mission.description",
              "हमारा संगठन हमारी पवित्र विरासत को मज़बूत करने और बचाने के लिए कई मोर्चों पर बिना थके काम करता है।",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-warm transition-all hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <value.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
