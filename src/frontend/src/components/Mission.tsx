import { Heart, Shield, BookOpen, Users } from 'lucide-react';

export default function Mission() {
  const values = [
    {
      icon: Heart,
      title: 'Devotion',
      description: 'Unwavering commitment to the eternal principles of Dharma',
    },
    {
      icon: Shield,
      title: 'Protection',
      description: 'Safeguarding our sacred traditions and cultural heritage',
    },
    {
      icon: BookOpen,
      title: 'Knowledge',
      description: 'Spreading the timeless wisdom of our ancient scriptures',
    },
    {
      icon: Users,
      title: 'Unity',
      description: 'Building a strong community rooted in shared values',
    },
  ];

  return (
    <section className="py-20 bg-muted/30 pattern-overlay">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            हमारा पवित्र मिशन
          </h2>
          <p className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed">
            हमारा संगठन हमारी पवित्र विरासत को मज़बूत करने और बचाने के लिए कई मोर्चों पर बिना थके काम करता है।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
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
