import ProgramCard from '../components/ProgramCard';
import { BookOpen, Users, Heart, Sparkles, GraduationCap, HandHeart } from 'lucide-react';

export default function Programs() {
  const programs = [
    {
      icon: BookOpen,
      title: 'वैदिक स्टडी सर्कल',
      description: 'वेद, उपनिषद और भगवद गीता जैसे पवित्र ग्रंथों की पढ़ाई और चर्चा के लिए रेगुलर सेशन। अनुभवी विद्वानों से सीखें और अपनी आध्यात्मिक समझ को गहरा करें।',
    },
    {
      icon: Sparkles,
      title: 'Cultural Festivals',
      description: 'Organizing and celebrating traditional Hindu festivals with proper rituals, maintaining authenticity while creating community bonding and cultural awareness.',
    },
    {
      icon: GraduationCap,
      title: 'Youth Education Programs',
      description: 'Special initiatives to educate young minds about dharmic values, Sanskrit language, traditional arts, and the rich heritage of Sanatana Dharma.',
    },
    {
      icon: Users,
      title: 'Community Gatherings',
      description: 'Regular satsangs, bhajan sessions, and spiritual discourses that bring the community together for collective worship and learning.',
    },
    {
      icon: Heart,
      title: 'Social Welfare Activities',
      description: 'Charitable initiatives including food distribution, educational support, and assistance to those in need, embodying the principle of seva.',
    },
    {
      icon: HandHeart,
      title: 'Heritage Preservation',
      description: 'Documenting and preserving traditional practices, rituals, folk arts, and cultural knowledge for future generations.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Programs
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Diverse initiatives dedicated to preserving tradition, spreading knowledge, and serving the community
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
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
              Making a Difference
            </h2>
            <p className="font-serif text-lg text-muted-foreground leading-relaxed mb-12">
              Through our various programs and initiatives, we touch countless lives, strengthen community bonds, 
              and ensure that the eternal wisdom of Sanatana Dharma continues to guide and inspire.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '500+', label: 'Community Members' },
                { number: '50+', label: 'Events Organized' },
                { number: '1000+', label: 'Lives Touched' },
              ].map((stat, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border">
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
              Get Involved
            </h2>
            <p className="font-serif text-lg text-muted-foreground mb-8 leading-relaxed">
              Join us in our mission to preserve and promote Sanatana Dharma. Whether through participation, 
              volunteering, or support, every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="/donate"
                className="px-8 py-4 bg-card text-foreground font-semibold rounded-lg hover:bg-muted transition-all border-2 border-border"
              >
                Support Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
