import { Target, Eye, Award, Users } from 'lucide-react';

export default function About() {
  const principles = [
    {
      icon: Target,
      title: 'Our Purpose',
      description: 'To be steadfast guardians of Sanatana Dharma, ensuring its principles remain vibrant and relevant for all generations.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'A world where the eternal wisdom of Sanatana Dharma guides humanity towards righteousness, peace, and spiritual fulfillment.',
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Dharma (righteousness), Satya (truth), Ahimsa (non-violence), Seva (selfless service), and Bhakti (devotion).',
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'A diverse family of devoted individuals united by shared faith, mutual respect, and commitment to dharmic living.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/pattern-bg.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/95 to-background/95" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Us
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Warriors of faith, protectors of tradition, servants of Dharma
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 font-serif text-lg text-muted-foreground leading-relaxed">
              <p>
                KATTAR SANATANI YODHA was born from a deep commitment to preserve and protect the eternal principles 
                of Sanatana Dharma in an ever-changing world. We are a collective of devoted individuals who recognize 
                the profound wisdom embedded in our ancient traditions and scriptures.
              </p>
              <p>
                The term "Kattar" signifies our unwavering dedication, "Sanatani" represents our connection to the 
                eternal truth, and "Yodha" embodies our warrior spirit in defending and promoting dharmic values. 
                We stand firm in our beliefs while embracing the inclusive and universal nature of Sanatana Dharma.
              </p>
              <p>
                Our organization works at the grassroots level to educate, inspire, and empower communities. Through 
                cultural programs, spiritual discourses, social service initiatives, and educational activities, we 
                strive to keep the flame of dharma burning bright for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {principles.map((principle, index) => (
              <div
                key={index}
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
              Our Core Beliefs
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Eternal Dharma',
                  text: 'We believe in the timeless and universal principles of Sanatana Dharma that guide humanity towards righteousness.',
                },
                {
                  title: 'Cultural Heritage',
                  text: 'Our rich traditions, rituals, festivals, and practices are precious treasures that must be preserved and passed on.',
                },
                {
                  title: 'Spiritual Knowledge',
                  text: 'The Vedas, Upanishads, Bhagavad Gita, and other sacred texts contain profound wisdom for spiritual growth.',
                },
                {
                  title: 'Unity in Diversity',
                  text: 'We embrace the diverse paths within Sanatana Dharma while maintaining unity in our core values and principles.',
                },
                {
                  title: 'Service to Society',
                  text: 'True dharma manifests through selfless service, compassion, and working for the welfare of all beings.',
                },
              ].map((belief, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-card rounded-lg border-l-4 border-primary hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                    {index + 1}
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
