import SupportOptions from '../components/SupportOptions';
import { Heart, Users, Megaphone, HandHeart } from 'lucide-react';

export default function Donate() {
  const impactAreas = [
    {
      title: 'Cultural Programs',
      description: 'Support festivals, rituals, and traditional celebrations that keep our heritage alive.',
      percentage: 35,
    },
    {
      title: 'Educational Initiatives',
      description: 'Fund Vedic study programs, Sanskrit classes, and youth education activities.',
      percentage: 30,
    },
    {
      title: 'Community Service',
      description: 'Enable charitable activities, food distribution, and support for those in need.',
      percentage: 25,
    },
    {
      title: 'Heritage Preservation',
      description: 'Document and preserve traditional knowledge, practices, and cultural artifacts.',
      percentage: 10,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            Support Our Mission
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your support helps us preserve and promote the eternal values of Sanatana Dharma
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Ways to Support
            </h2>
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              There are many ways you can contribute to our mission. Every form of support, 
              whether through time, skills, or spreading awareness, makes a meaningful difference.
            </p>
          </div>
          <SupportOptions />
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-12 text-center">
              How Your Support Helps
            </h2>
            <div className="space-y-6">
              {impactAreas.map((area, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {area.title}
                    </h3>
                    <span className="text-primary font-bold text-lg">{area.percentage}%</span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${area.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">
                Our Commitment to Transparency
              </h2>
              <div className="space-y-4 font-serif text-lg text-muted-foreground leading-relaxed">
                <p>
                  We believe in complete transparency regarding how contributions are utilized. Every resource 
                  is carefully allocated to maximize impact and serve our mission effectively.
                </p>
                <p>
                  Our organization operates with integrity and accountability, ensuring that all support directly 
                  benefits our programs and the communities we serve. We maintain detailed records and are committed 
                  to responsible stewardship of all resources.
                </p>
                <p>
                  Regular updates about our activities, programs, and impact are shared with our community, 
                  demonstrating how collective efforts create meaningful change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Join Us Today
            </h2>
            <p className="font-serif text-lg text-muted-foreground mb-8 leading-relaxed">
              Be part of a movement dedicated to preserving our sacred heritage and serving the community. 
              Together, we can make a lasting impact for generations to come.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
            >
              <Heart size={20} />
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
