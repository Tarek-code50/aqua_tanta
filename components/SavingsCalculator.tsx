import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SavingsCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [bottlesPerWeek, setBottlesPerWeek] = useState<number | ''>('');
  const [savings, setSavings] = useState<number | null>(null);

  const BOTTLE_COST = 8; // Average cost in EGP
  const FILTER_MAINTENANCE_YEARLY = 600; // Approx yearly maintenance

  const calculateSavings = () => {
    if (typeof bottlesPerWeek !== 'number') return;
    
    const yearlyBottleCost = bottlesPerWeek * 52 * BOTTLE_COST;
    const netSavings = yearlyBottleCost - FILTER_MAINTENANCE_YEARLY;
    
    setSavings(Math.max(0, netSavings));
  };

  return (
    <div className="bg-brand-50 dark:bg-slate-800 p-8 rounded-2xl shadow-inner border border-brand-100 dark:border-slate-700">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-brand-800 dark:text-brand-300 mb-4">
          {t.savings.title} 💰
        </h3>
        <label className="block text-slate-700 dark:text-slate-300 mb-2">
          {t.savings.question}
        </label>
        <div className="flex items-center gap-2 mb-4 w-full max-w-xs">
          <input
            type="number"
            min="0"
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
            placeholder="e.g., 20"
            value={bottlesPerWeek}
            onChange={(e) => setBottlesPerWeek(parseInt(e.target.value) || '')}
          />
        </div>
        <button
          onClick={calculateSavings}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-6 rounded-lg transition-colors mb-6"
        >
          {t.savings.calculate}
        </button>

        {savings !== null && (
          <div className="animate-fade-in bg-white dark:bg-slate-700 p-4 rounded-xl shadow-lg border-2 border-green-500">
            <p className="text-lg text-slate-600 dark:text-slate-200">
              {t.savings.result}
            </p>
            <p className="text-4xl font-black text-green-600 dark:text-green-400 my-2">
              {savings.toLocaleString()} {t.products.currency}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.savings.perYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsCalculator;
