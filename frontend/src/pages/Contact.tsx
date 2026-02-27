import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';
import { useContactForm } from '../hooks/useContactForm';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { submitForm, isSubmitting, isSuccess, isError } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData.name, formData.email, formData.message);
    if (!isError) {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 pattern-overlay">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            संपर्क करें
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            हम आपसे सुनना चाहते हैं। प्रश्नों, सुझावों के साथ या हमारे मिशन के बारे में अधिक जानने के लिए संपर्क करें।
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                हमें संदेश भेजें
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    आपका नाम *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="अपना नाम दर्ज करें"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    ईमेल पता *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    आपका संदेश *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="हमें बताएं कि हम कैसे मदद कर सकते हैं..."
                  />
                </div>

                {isSuccess && (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-foreground">
                    आपके संदेश के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।
                  </div>
                )}

                {isError && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    आपका संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-warm hover:shadow-warm-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'भेजा जा रहा है...'
                  ) : (
                    <>
                      <Send size={20} />
                      संदेश भेजें
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  संपर्क में रहें
                </h2>
                <p className="font-serif text-lg text-muted-foreground leading-relaxed mb-8">
                  चाहे आप हमारे कार्यक्रमों के बारे में अधिक जानना चाहते हों, हमारे साथ स्वयंसेवा करना चाहते हों, या समान विचारधारा वाले व्यक्तियों से जुड़ना चाहते हों, हम यहाँ मदद के लिए हैं।
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">ईमेल</h3>
                    <a 
                      href="mailto:adityarajsrivastav76@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      adityarajsrivastav76@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">फ़ोन</h3>
                    <div className="space-y-1">
                      <a 
                        href="tel:+918130608468"
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +91 81306 08468
                      </a>
                      <a 
                        href="tel:+919259279963"
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +91 92592 79963
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">स्थान</h3>
                    <p className="text-muted-foreground">भारत</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  हमें फॉलो करें
                </h3>
                <div className="flex gap-3">
                  {[
                    { Icon: SiFacebook, label: 'Facebook', url: 'https://www.facebook.com/share/14QwdYfhLY2/' },
                    { Icon: SiX, label: 'X', url: 'https://x.com/VarshneyVi95121?t=ovt3Ut6VVD-WOJPgNLacDA&s=08' },
                    { Icon: SiInstagram, label: 'Instagram', url: '#' },
                    { Icon: SiYoutube, label: 'YouTube', url: 'https://www.youtube.com/@sanatani-omkar07' },
                  ].map(({ Icon, label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
