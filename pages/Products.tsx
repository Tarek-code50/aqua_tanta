import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const { t } = useLanguage();
  const { products } = useData();

  return (
    <section id="products" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-wider uppercase text-sm">
            Catalog
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2">
            {t.products.title}
          </h2>
          <div className="w-24 h-1.5 bg-brand-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
