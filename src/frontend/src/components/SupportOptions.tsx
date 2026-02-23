import { Users, Megaphone, HandHeart, BookOpen } from 'lucide-react';

export default function SupportOptions() {
  const options = [
    {
      icon: Users,
      title: 'Volunteer Your Time',
      description: 'Join our team of dedicated volunteers in organizing events, teaching programs, or community service activities.',
      action: 'Learn More',
    },
    {
      icon: Megaphone,
      title: 'Spread Awareness',
      description: 'Help us reach more people by sharing our mission on social media and within your community.',
      action: 'Share Now',
    },
    {
      icon: HandHeart,
      title: 'Contribute Skills',
      description: 'Offer your professional expertise in areas like education, technology, design, or event management.',
      action: 'Get Involved',
    },
    {
      icon: BookOpen,
      title: 'Share Knowledge',
      description: 'Conduct workshops, give talks, or teach classes on dharmic topics, Sanskrit, or traditional arts.',
      action: 'Contact Us',
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
