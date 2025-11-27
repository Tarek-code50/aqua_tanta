import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateMaintenanceRequest, generateWhatsAppLink, generateMaintenanceReminder } from '../services/whatsappService';
import { useData } from '../contexts/DataContext';

const MaintenanceForm: React.FC = () => {
  const { t, language } = useLanguage();
  const { settings } = useData();
  
  // Request State
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [issue, setIssue] = useState('');
  
  // Reminder State
  const [lastChangeDate, setLastChangeDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;
    const message = generateMaintenanceRequest(name, address, issue);
    window.open(generateWhatsAppLink(message, settings.contact.whatsappNumber), '_blank');
  };

  const handleReminder = () => {
    if (!lastChangeDate) return;
    const message = generateMaintenanceReminder(lastChangeDate);
    window.open(generateWhatsAppLink(message, settings.contact.whatsappNumber), '_blank');
  };

  const alignClass = language === 'ar' ? 'text-right' : 'text-left';

  // Specific classes requested for input contrast fix
  const inputClasses = "w-full p-3 rounded-lg border outline-none transition-colors bg-white text-slate-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:placeholder:text-gray-500";

  // Localized Tip Content
  const tipTitle = language === 'ar' ? 'نصيحة:' : 'Tip:';
  const tipBody = language === 'ar' 
    ? 'الصيانة الدورية تضمن لك مياه نقية بنسبة 99.9٪. ننصحك بفحص الشمعات المبدئية كل 3 أشهر.'
    : 'Regular maintenance ensures your water remains 99.9% pure. We recommend checking your sediment filters every 3 months.';

  return (
    <div className="grid md:grid-cols-2 gap-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Booking Form */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-t-4 border-brand-500">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 font-cairo">{t.maintenance.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{t.maintenance.subtitle}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${alignClass}`}>
              {t.maintenance.nameLabel}
            </label>
            <input
              type="text"
              required
              className={inputClasses}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${alignClass}`}>
              {t.maintenance.addressLabel}
            </label>
            <input
              type="text"
              required
              className={inputClasses}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 ${alignClass}`}>
              {t.maintenance.issueLabel}
            </label>
            <textarea
              className={`${inputClasses} h-24 resize-none`}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            {t.maintenance.submit}
          </button>
        </form>
      </div>

      {/* Smart Reminder */}
      <div className="flex flex-col gap-8">
        <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white font-cairo">{t.maintenance.reminder}</h3>
          </div>
          
          <label className={`block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 ${alignClass}`}>
            {t.maintenance.lastChangeLabel}
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className={inputClasses}
              value={lastChangeDate}
              onChange={(e) => setLastChangeDate(e.target.value)}
              placeholder={language === 'ar' ? "سنة / شهر / يوم" : "yyyy / mm / dd"}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2 mb-4">
            {t.maintenance.reminderBtn}
          </p>
          <button
            onClick={handleReminder}
            disabled={!lastChangeDate}
            className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.maintenance.reminderBtn}
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-xl border border-blue-100 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="font-bold text-brand-600 block mb-1">{tipTitle}</span>
            {tipBody}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceForm;