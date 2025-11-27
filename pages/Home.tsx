import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import WhatsAppButton from '../components/WhatsAppButton';
import ComparisonSlider from '../components/ComparisonSlider';
import SavingsCalculator from '../components/SavingsCalculator';
import WaveDivider from '../components/WaveDivider';
import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, Droplets, ChevronDown, Award, Users, Clock } from 'lucide-react';

// --- Brand Marquee Component ---
const BrandMarquee = () => (
  <div className="w-full overflow-hidden bg-slate-100 dark:bg-slate-800 py-6 relative" dir="ltr">
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-100 dark:from-slate-800 to-transparent z-10"></div>
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-100 dark:from-slate-800 to-transparent z-10"></div>
    <div className="flex gap-16 animate-scroll w-[200%]">
       {[...Array(2)].map((_, i) => (
         <React.Fragment key={i}>
            <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 grayscale hover:grayscale-0 transition-all">PANASONIC</span>
            <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 grayscale hover:grayscale-0 transition-all">TANK</span>
            <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 grayscale hover:grayscale-0 transition-all">AQUA</span>
            <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 grayscale hover:grayscale-0 transition-all">BRITISH</span>
            <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 grayscale hover:grayscale-0 transition-all">PURE</span>
            <span className="text-3xl font-bold text-slate-300 dark:text-slate-600 grayscale hover:grayscale-0 transition-all">FILTREX</span>
         </React.Fragment>
       ))}
    </div>
  </div>
);

// --- Stats Component ---
const StatsSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    { icon: <Users size={32} />, value: '+1,500', label: t.stats.families },
    { icon: <Award size={32} />, value: t.stats.satisfaction, label: '' }, // Value contains the label for satisfaction case
    { icon: <Clock size={32} />, value: '24h', label: t.stats.response },
  ];

  return (
    <div className="bg-gradient-primary py-24 md:py-32 text-white relative overflow-hidden">
      <WaveDivider position="top" color="text-slate-50 dark:text-slate-900" flip />
      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.2 }}
               className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
             >
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-inner">
                 {stat.icon}
               </div>
               <div className="text-3xl md:text-4xl font-extrabold mb-1 font-cairo drop-shadow-sm">{stat.value}</div>
               {stat.label && <div className="text-blue-100 font-medium drop-shadow-sm">{stat.label}</div>}
             </motion.div>
          ))}
        </div>
      </div>
      <WaveDivider position="bottom" color="text-slate-50 dark:text-slate-900" />
    </div>
  );
};

// --- FAQ Component ---
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-left rtl:text-right focus:outline-none"
      >
        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{question}</span>
        <ChevronDown 
          className={`text-brand-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { settings } = useData();

  const heroTitle = language === 'ar' ? settings.hero.titleAr : settings.hero.titleEn;
  const heroSubtitle = language === 'ar' ? settings.hero.subtitleAr : settings.hero.subtitleEn;

  const features = [
    { icon: <Wrench size={28} />, title: t.features.installation, desc: "Professional setup included" },
    { icon: <ShieldCheck size={28} />, title: t.features.warranty, desc: "Full coverage guarantee" },
    { icon: <Droplets size={28} />, title: t.features.parts, desc: "Authentic components only" },
  ];

  if (settings.config.maintenanceMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
         <div className="text-center p-10">
           <div className="text-6xl mb-4 animate-bounce">🛠</div>
           <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Under Maintenance</h1>
           <p className="text-slate-500">We're improving our waters. Be back soon.</p>
         </div>
      </div>
    );
  }

  return (
    <div id="home" className="overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=2500&auto=format&fit=crop")' }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30 dark:from-slate-950/90 dark:to-slate-950/40"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-start rtl:md:text-right"
            >
              {settings.hero.announcement && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block bg-brand-500/20 backdrop-blur-md border border-brand-400/30 text-brand-200 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                >
                  🎉 {settings.hero.announcement}
                </motion.div>
              )}
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight font-cairo mb-6 drop-shadow-lg">
                {heroTitle}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">.</span>
              </h1>
              
              <p className="text-xl text-slate-200 mb-10 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
                {heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <WhatsAppButton 
                    message="Hello, I want to upgrade my water quality!" 
                    label={t.hero.cta} 
                    className="relative w-full sm:w-auto text-lg px-8 py-4 bg-gradient-primary border-0"
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Features */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:grid grid-cols-2 gap-4"
            >
               {features.map((f, i) => (
                 <div key={i} className={`p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all ${i === 1 ? 'col-span-2' : ''}`}>
                   <div className="text-brand-300 mb-3">{f.icon}</div>
                   <h3 className="text-white font-bold text-lg mb-1">{f.title}</h3>
                   <p className="text-slate-300 text-sm">{f.desc}</p>
                 </div>
               ))}
            </motion.div>
          </div>
        </div>

        <WaveDivider color="text-slate-50 dark:text-slate-900" />
      </section>

      {/* --- MARQUEE --- */}
      <BrandMarquee />

      {/* --- INTERACTIVE WIDGETS --- */}
      <section className="bg-slate-50 dark:bg-slate-900 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 font-cairo">{t.comparison.title}</h2>
             <div className="w-20 h-1.5 bg-brand-500 mx-auto rounded-full"></div>
           </div>

           <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ComparisonSlider />
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <SavingsCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <StatsSection />

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm">Got Questions?</span>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2 font-cairo">{t.faq.title}</h2>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700">
            <FAQItem question={t.faq.q1} answer={t.faq.a1} />
            <FAQItem question={t.faq.q2} answer={t.faq.a2} />
            <FAQItem question={t.faq.q3} answer={t.faq.a3} />
            <FAQItem question={t.faq.q4} answer={t.faq.a4} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;