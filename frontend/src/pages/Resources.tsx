import { BookOpen, Video, FileText, Download } from 'lucide-react';

export default function Resources() {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: 'पवित्र ग्रंथ',
      description: 'वेद, उपनिषद, भगवद गीता और अन्य पवित्र शास्त्रों के डिजिटल संस्करण देखें।',
      items: ['भगवद गीता', 'रामायण', 'महाभारत', 'वैदिक साहित्य'],
    },
    {
      icon: Video,
      title: 'वीडियो व्याख्यान',
      description: 'विद्वान पंडितों द्वारा आध्यात्मिक प्रवचन, सांस्कृतिक कार्यक्रम और शैक्षिक सत्र देखें।',
      items: ['धर्म वार्ता', 'त्योहार उत्सव', 'अनुष्ठान व्याख्या', 'दर्शन चर्चा'],
    },
    {
      icon: FileText,
      title: 'लेख और निबंध',
      description: 'धार्मिक सिद्धांतों, सांस्कृतिक प्रथाओं और आध्यात्मिक ज्ञान पर ज्ञानवर्धक लेख पढ़ें।',
      items: ['दर्शन', 'अनुष्ठान और प्रथाएं', 'इतिहास', 'समकालीन मुद्दे'],
    },
    {
      icon: Download,
      title: 'डाउनलोड योग्य सामग्री',
      description: 'प्रार्थना पुस्तकें, मंत्र, त्योहार गाइड और शैक्षिक सामग्री डाउनलोड करें।',
      items: ['प्रार्थना संग्रह', 'मंत्र पुस्तकें', 'त्योहार गाइड', 'अध्ययन सामग्री'],
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
            संसाधन
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            पवित्र ग्रंथों, शैक्षिक सामग्री और आध्यात्मिक संसाधनों के हमारे संग्रह का अन्वेषण करें
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              हम सनातन धर्म की गहन बुद्धि को सभी साधकों के लिए सुलभ बनाने के लिए प्रतिबद्ध हैं।
              हमारी संसाधन लाइब्रेरी में आपकी आध्यात्मिक यात्रा का समर्थन करने और हमारी शाश्वत परंपराओं की समझ को गहरा करने के लिए सावधानीपूर्वक चुनी गई सामग्री है।
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
              विशेष संसाधन
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'दैनिक प्रार्थना संग्रह',
                  description: 'आध्यात्मिक विकास के लिए दैनिक प्रार्थनाओं, मंत्रों और ध्यान प्रथाओं की एक व्यापक मार्गदर्शिका।',
                  type: 'पीडीएफ गाइड',
                },
                {
                  title: 'वैदिक दर्शन का परिचय',
                  description: 'वैदिक दर्शन की मूलभूत अवधारणाओं और शिक्षाओं का एक सुलभ परिचय।',
                  type: 'वीडियो श्रृंखला',
                },
                {
                  title: 'त्योहार कैलेंडर और अनुष्ठान',
                  description: 'हिंदू त्योहारों, उनके महत्व और पारंपरिक पालन विधियों की पूर्ण मार्गदर्शिका।',
                  type: 'डिजिटल पुस्तक',
                },
                {
                  title: 'भगवद गीता अध्ययन मार्गदर्शिका',
                  description: 'भगवद गीता की शाश्वत बुद्धि पर अध्याय-दर-अध्याय विश्लेषण और टिप्पणी।',
                  type: 'अध्ययन सामग्री',
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
              और जानकारी चाहिए?
            </h2>
            <p className="font-serif text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              जो आप ढूंढ रहे हैं वह नहीं मिला? हमसे संपर्क करें और हम आपकी आध्यात्मिक यात्रा के लिए आवश्यक संसाधनों तक पहुंचने में आपकी मदद करने में प्रसन्न होंगे।
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
            >
              संपर्क करें
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
