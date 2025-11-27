import React from 'react';
import { Product } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { generateProductInquiry } from '../services/whatsappService';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppLink } from '../services/whatsappService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { settings } = useData();
  
  const name = product.name[language];
  const description = product.description[language];
  const price = `${product.price.toLocaleString()} ${t.products.currency}`;
  const message = generateProductInquiry(name, price);
  const whatsappLink = generateWhatsAppLink(message, settings.contact.whatsappNumber);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white/40 dark:border-slate-700/50 shadow-lg hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-72 overflow-hidden bg-slate-100 dark:bg-slate-900/50">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
           <a 
             href={whatsappLink}
             target="_blank"
             rel="noopener noreferrer"
             className="bg-white text-brand-600 p-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100"
           >
             <ShoppingCart size={20} />
           </a>
           <a
             href={whatsappLink}
             target="_blank"
             rel="noopener noreferrer" 
             className="bg-brand-500 text-white p-3 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75"
           >
             <ArrowUpRight size={20} />
           </a>
        </div>
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-brand-700 dark:text-brand-300 text-sm font-bold px-4 py-2 rounded-full shadow-sm">
          {price}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 font-cairo mb-2 line-clamp-1">{name}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {description}
        </p>
        
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center bg-slate-100 dark:bg-slate-700 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-200 font-bold py-3 rounded-xl transition-colors duration-300"
        >
          {t.products.buyNow}
        </a>
      </div>
    </motion.div>
  );
};

export default ProductCard;