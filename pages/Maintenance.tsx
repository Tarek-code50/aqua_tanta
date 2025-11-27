import React from 'react';
import MaintenanceForm from '../components/MaintenanceForm';

const Maintenance: React.FC = () => {
  return (
    <section id="maintenance" className="py-20 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <MaintenanceForm />
      </div>
    </section>
  );
};

export default Maintenance;
