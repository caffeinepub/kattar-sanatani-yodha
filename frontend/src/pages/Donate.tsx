import SupportOptions from '../components/SupportOptions';
import { Heart } from 'lucide-react';

export default function Donate() {
  const impactAreas = [
    {
      title: 'सांस्कृतिक कार्यक्रम',
      description: 'त्योहारों, अनुष्ठानों और पारंपरिक उत्सवों का समर्थन करें जो हमारी विरासत को जीवित रखते हैं।',
      percentage: 35,
    },
    {
      title: 'शैक्षिक पहल',
      description: 'वैदिक अध्ययन कार्यक्रमों, संस्कृत कक्षाओं और युवा शिक्षा गतिविधियों को वित्त पोषित करें।',
      percentage: 30,
    },
    {
      title: 'सामुदायिक सेवा',
      description: 'धर्मार्थ गतिविधियों, खाद्य वितरण और जरूरतमंदों के लिए सहायता को सक्षम करें।',
      percentage: 25,
    },
    {
      title: 'विरासत संरक्षण',
      description: 'पारंपरिक ज्ञान, प्रथाओं और सांस्कृतिक कलाकृतियों का दस्तावेजीकरण और संरक्षण करें।',
      percentage: 10,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            हमारे मिशन का समर्थन करें
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            आपका समर्थन हमें सनातन धर्म के शाश्वत मूल्यों को संरक्षित और प्रचारित करने में मदद करता है
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              समर्थन के तरीके
            </h2>
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              हमारे मिशन में योगदान करने के कई तरीके हैं। समय, कौशल या जागरूकता फैलाने के माध्यम से हर प्रकार का समर्थन सार्थक अंतर लाता है।
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
              आपका समर्थन कैसे मदद करता है
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
                पारदर्शिता के प्रति हमारी प्रतिबद्धता
              </h2>
              <div className="space-y-4 font-serif text-lg text-muted-foreground leading-relaxed">
                <p>
                  हम योगदान के उपयोग के बारे में पूर्ण पारदर्शिता में विश्वास करते हैं। प्रत्येक संसाधन को प्रभाव को अधिकतम करने और हमारे मिशन को प्रभावी ढंग से पूरा करने के लिए सावधानीपूर्वक आवंटित किया जाता है।
                </p>
                <p>
                  हमारा संगठन ईमानदारी और जवाबदेही के साथ काम करता है, यह सुनिश्चित करते हुए कि सभी समर्थन सीधे हमारे कार्यक्रमों और जिन समुदायों की हम सेवा करते हैं उन्हें लाभान्वित करे। हम विस्तृत रिकॉर्ड बनाए रखते हैं और सभी संसाधनों के जिम्मेदार प्रबंधन के लिए प्रतिबद्ध हैं।
                </p>
                <p>
                  हमारी गतिविधियों, कार्यक्रमों और प्रभाव के बारे में नियमित अपडेट हमारे समुदाय के साथ साझा किए जाते हैं, यह दर्शाते हुए कि सामूहिक प्रयास कैसे सार्थक बदलाव लाते हैं।
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
              आज ही जुड़ें
            </h2>
            <p className="font-serif text-lg text-muted-foreground mb-8 leading-relaxed">
              हमारी पवित्र विरासत को संरक्षित करने और समुदाय की सेवा करने के लिए समर्पित एक आंदोलन का हिस्सा बनें।
              मिलकर हम आने वाली पीढ़ियों के लिए एक स्थायी प्रभाव डाल सकते हैं।
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg hover:scale-105"
            >
              <Heart size={20} />
              संपर्क करें
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
