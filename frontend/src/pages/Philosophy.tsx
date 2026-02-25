import { BookHeart, Flame, HandHeart, Crown, Heart, Shield } from 'lucide-react';

export default function Philosophy() {
  const devotionExamples = [
    {
      icon: Crown,
      name: 'भगवान राम',
      description: 'धर्म के अवतार माने जाते हैं, जिनका जीवन मुश्किलों के बावजूद कर्तव्य और धार्मिकता के प्रति पूरी तरह से समर्पित होना दिखाता है।',
    },
    {
      icon: Heart,
      name: 'हनुमान',
      description: 'निस्वार्थ सेवा और भगवान राम के प्रति बिना शर्त, अटूट भक्ति के सबसे ऊँचे रूप का प्रतीक हैं।',
    },
    {
      icon: Shield,
      name: 'युधिष्ठिर',
      description: 'बड़ी व्यक्तिगत चुनौतियों के दौरान भी, धर्म के प्रति जीवन भर कमिटमेंट का उदाहरण हैं।',
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
            Philosophy & Teachings
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The eternal principles and unwavering devotion of Sanatana Dharma
          </p>
        </div>
      </section>

      {/* शाश्वत प्रकृति Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookHeart size={32} className="text-primary" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                शाश्वत प्रकृति
              </h2>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                सनातन धर्म, या "शाश्वत धर्म", उन यूनिवर्सल सिद्धांतों को बताता है जो समय और संस्कृति से परे हैं, 
                जैसे सत्य (सत्य), अहिंसा (अहिंसा), और धार्मिकता।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* अटूट कमिटमेंट Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 via-secondary/5 to-primary/5 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Flame size={32} className="text-accent" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                अटूट कमिटमेंट (भक्ति योग)
              </h2>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                इसमें सेवा के लिए एक पक्का, अक्सर इमोशनल, कमिटमेंट शामिल है, जहाँ भक्त भगवान पर ध्यान केंद्रित करता है, 
                जिससे एक ऐसी स्थिति बनती है जहाँ उन्हें भक्ति से गिरने का कभी डर नहीं होता।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* कर्म का मार्ग Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <HandHeart size={32} className="text-secondary" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                कर्म का मार्ग
              </h2>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                भक्ति सिर्फ़ रस्मों-रिवाज़ों तक ही सीमित नहीं है, बल्कि निष्काम कर्म (निस्वार्थ कर्म) के ज़रिए भी दिखाई जाती है, 
                जहाँ कर्म बिना किसी नतीजे की इच्छा के भगवान को समर्पित होते हैं।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* भक्ति के उदाहरण Section */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-12 text-center">
              भक्ति के उदाहरण
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {devotionExamples.map((example, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-8 shadow-sm hover:shadow-warm transition-all border border-border group"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <example.icon size={40} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 text-center">
                    {example.name}
                  </h3>
                  <p className="font-serif text-muted-foreground leading-relaxed text-center">
                    {example.description}
                  </p>
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
              Deepen Your Understanding
            </h2>
            <p className="font-serif text-lg text-muted-foreground mb-8 leading-relaxed">
              Explore our programs and resources to learn more about the profound teachings of Sanatana Dharma 
              and how to apply them in daily life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/programs"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
              >
                View Programs
              </a>
              <a
                href="/resources"
                className="px-8 py-4 bg-card text-foreground font-semibold rounded-lg hover:bg-muted transition-all border-2 border-border"
              >
                Explore Resources
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
