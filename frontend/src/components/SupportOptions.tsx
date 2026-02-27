import { Users, Megaphone, HandHeart, BookOpen } from 'lucide-react';

export default function SupportOptions() {
  const options = [
    {
      icon: Users,
      title: 'अपना समय दें',
      description: 'कार्यक्रमों के आयोजन, शिक्षण कार्यक्रमों या सामुदायिक सेवा गतिविधियों में हमारे समर्पित स्वयंसेवकों की टीम से जुड़ें।',
      action: 'और जानें',
    },
    {
      icon: Megaphone,
      title: 'जागरूकता फैलाएं',
      description: 'सोशल मीडिया पर और अपने समुदाय में हमारे मिशन को साझा करके हमें अधिक लोगों तक पहुंचने में मदद करें।',
      action: 'अभी साझा करें',
    },
    {
      icon: HandHeart,
      title: 'कौशल का योगदान दें',
      description: 'शिक्षा, प्रौद्योगिकी, डिज़ाइन या कार्यक्रम प्रबंधन जैसे क्षेत्रों में अपनी पेशेवर विशेषज्ञता प्रदान करें।',
      action: 'जुड़ें',
    },
    {
      icon: BookOpen,
      title: 'ज्ञान साझा करें',
      description: 'धार्मिक विषयों, संस्कृत या पारंपरिक कलाओं पर कार्यशालाएं आयोजित करें, वार्ता दें या कक्षाएं पढ़ाएं।',
      action: 'संपर्क करें',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {options.map((option, index) => (
        <div
          key={index}
          className="bg-card rounded-xl p-8 shadow-sm hover:shadow-warm transition-all border border-border group"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <option.icon size={32} className="text-primary" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
            {option.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {option.description}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            {option.action}
            <span className="ml-2">→</span>
          </a>
        </div>
      ))}
    </div>
  );
}
