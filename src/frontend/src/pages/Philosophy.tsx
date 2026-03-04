import {
  BookHeart,
  Crown,
  Flame,
  HandHeart,
  Heart,
  Shield,
} from "lucide-react";

export default function Philosophy() {
  const devotionExamples = [
    {
      icon: Crown,
      name: "भगवान राम",
      description:
        "धर्म के अवतार माने जाते हैं, जिनका जीवन मुश्किलों के बावजूद कर्तव्य और धार्मिकता के प्रति पूरी तरह से समर्पित होना दिखाता है।",
    },
    {
      icon: Heart,
      name: "हनुमान",
      description:
        "निस्वार्थ सेवा और भगवान राम के प्रति बिना शर्त, अटूट भक्ति के सबसे ऊँचे रूप का प्रतीक हैं।",
    },
    {
      icon: Shield,
      name: "युधिष्ठिर",
      description:
        "बड़ी व्यक्तिगत चुनौतियों के दौरान भी, धर्म के प्रति जीवन भर कमिटमेंट का उदाहरण हैं।",
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
            दर्शन और शिक्षाएं
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            सनातन धर्म के शाश्वत सिद्धांत और अटूट भक्ति
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
                सनातन धर्म, या "शाश्वत धर्म", उन सार्वभौमिक सिद्धांतों को बताता है जो
                समय और संस्कृति से परे हैं। यह किसी एक व्यक्ति या समय द्वारा स्थापित धर्म
                नहीं है, बल्कि ब्रह्मांड की मूलभूत प्रकृति की खोज है। इसकी शिक्षाएं सत्य,
                धार्मिकता, करुणा और आत्म-साक्षात्कार के इर्द-गिर्द घूमती हैं — ऐसे सिद्धांत जो
                हर युग में प्रासंगिक रहते हैं।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* अटूट कमिटमेंट Section */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Flame size={32} className="text-primary" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                अटूट कमिटमेंट
              </h2>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <p className="font-serif text-lg text-muted-foreground leading-relaxed mb-6">
                भक्ति योग, या भक्ति का मार्ग, सनातन धर्म के सबसे शक्तिशाली पहलुओं में से एक
                है। यह परमात्मा के प्रति पूर्ण समर्पण और प्रेम के बारे में है — एक ऐसा संबंध जो
                भक्त को उच्चतम आध्यात्मिक अनुभव की ओर ले जाता है। यह कमिटमेंट केवल अनुष्ठानों
                तक सीमित नहीं है; यह जीवन के हर पहलू में व्याप्त है।
              </p>
              <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                सच्ची भक्ति बाधाओं से नहीं डरती। यह कठिनाइयों में और भी मजबूत होती है,
                क्योंकि भक्त जानता है कि परमात्मा हमेशा उसके साथ है। यह अटूट विश्वास ही
                सनातन धर्म की नींव है।
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
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <HandHeart size={32} className="text-primary" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-foreground">
                कर्म का मार्ग
              </h2>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <p className="font-serif text-lg text-muted-foreground leading-relaxed mb-6">
                कर्म योग, या निःस्वार्थ कर्म का मार्ग, सिखाता है कि हमें फल की चिंता किए
                बिना अपने कर्तव्यों का पालन करना चाहिए। भगवद गीता में श्री कृष्ण ने अर्जुन
                को यही उपदेश दिया था — "कर्म करो, फल की चिंता मत करो।"
              </p>
              <p className="font-serif text-lg text-muted-foreground leading-relaxed">
                यह सिद्धांत हमें सिखाता है कि सच्ची सेवा वह है जो बिना किसी अपेक्षा के की
                जाती है। जब हम समाज की सेवा करते हैं, तो हम वास्तव में परमात्मा की सेवा
                करते हैं। यही कट्टर सनातनी योद्धा का मार्ग है।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Devotion Examples Section */}
      <section className="py-20 bg-muted/30 pattern-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-12 text-center">
              भक्ति के आदर्श उदाहरण
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {devotionExamples.map((example) => (
                <div
                  key={example.name}
                  className="bg-card rounded-xl p-6 shadow-sm hover:shadow-warm transition-all border border-border text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <example.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                    {example.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-serif">
                    {example.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
