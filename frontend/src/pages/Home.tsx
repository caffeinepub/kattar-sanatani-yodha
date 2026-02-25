import Hero from '../components/Hero';
import Mission from '../components/Mission';
import { Flame, BookOpen, Users, Heart } from 'lucide-react';

export default function Home() {
  const highlights = [
    {
      icon: Flame,
      title: 'Cultural Preservation',
      description: 'Protecting and promoting our ancient traditions, rituals, and sacred practices.',
    },
    {
      icon: BookOpen,
      title: 'Spiritual Education',
      description: 'Teaching the profound wisdom of Vedas, Upanishads, and other sacred texts.',
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Creating a strong network of devoted individuals committed to Dharma.',
    },
    {
      icon: Heart,
      title: 'Social Service',
      description: 'Serving society through charitable activities rooted in dharmic values.',
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
              हम क्या करते हैं
            </h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Our organization works tirelessly across multiple fronts to strengthen and preserve our sacred heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {highlights.map((item, index) => (
              <div
                key={index}
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
      <section id="support" className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join Our Sacred Mission
            </h2>
            <p className="font-serif text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Be part of a movement dedicated to preserving and promoting the eternal values of Sanatana Dharma. 
              Together, we can make a lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
              >
                Support Us
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-card text-foreground font-semibold rounded-lg hover:bg-muted transition-all border-2 border-border"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
