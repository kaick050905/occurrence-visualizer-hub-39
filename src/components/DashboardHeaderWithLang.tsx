
import React from 'react';
import DashboardHeader from './DashboardHeader';
import LanguageSelector from './LanguageSelector';

const DashboardHeaderWithLang: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <DashboardHeader />
      <div className="flex items-center gap-2">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default DashboardHeaderWithLang;
