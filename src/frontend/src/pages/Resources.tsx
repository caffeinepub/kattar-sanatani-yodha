import { BookOpen, Video, FileText, Download } from 'lucide-react';

export default function Resources() {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: 'Sacred Texts',
      description: 'Access digital versions of Vedas, Upanishads, Bhagavad Gita, and other holy scriptures.',
      items: ['Bhagavad Gita', 'Ramayana', 'Mahabharata', 'Vedic Literature'],
    },
    {
      icon: Video,
      title: 'Video Lectures',
      description: 'Watch spiritual discourses, cultural programs, and educational sessions by learned scholars.',
      items: ['Dharma Talks', 'Festival Celebrations', 'Ritual Explanations', 'Philosophy Discussions'],
    },
    {
      icon: FileText,
      title: 'Articles & Essays',
      description: 'Read insightful articles on dharmic principles, cultural practices, and spiritual wisdom.',
      items: ['Philosophy', 'Rituals & Practices', 'History', 'Contemporary Issues'],
    },
    {
      icon: Download,
      title: 'Downloadable Materials',
      description: 'Download prayer books, mantras, festival guides, and educational materials.',
      items: ['Prayer Collections', 'Mantra Books', 'Festival Guides', 'Study Materials'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/pattern-bg.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background/95 to-background/95" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            Resources
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our collection of sacred texts, educational materials, and spiritual resources
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              We are committed to making the profound wisdom of Sanatana Dharma accessible to all seekers. 
              Our resource library contains carefully curated materials to support your spiritual journey 
              and deepen your understanding of our eternal traditions.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {resourceCategories.map((category, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-sm hover:shadow-warm transition-all border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <category.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                  {category.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2 text-foreground/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-serif">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-12 text-center">
              Featured Resources
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Daily Prayer Collection',
                  description: 'A comprehensive guide to daily prayers, mantras, and meditation practices for spiritual growth.',
                  type: 'PDF Guide',
                },
                {
                  title: 'Introduction to Vedic Philosophy',
                  description: 'An accessible introduction to the fundamental concepts and teachings of Vedic philosophy.',
                  type: 'Video Series',
                },
                {
                  title: 'Festival Calendar & Rituals',
                  description: 'Complete guide to Hindu festivals, their significance, and traditional observance methods.',
                  type: 'Digital Book',
                },
                {
                  title: 'Bhagavad Gita Study Guide',
                  description: 'Chapter-by-chapter analysis and commentary on the timeless wisdom of the Bhagavad Gita.',
                  type: 'Study Material',
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {resource.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <button className="flex-shrink-0 p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Need More Information?
            </h2>
            <p className="font-serif text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Can't find what you're looking for? Contact us and we'll be happy to help you 
              access the resources you need for your spiritual journey.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
