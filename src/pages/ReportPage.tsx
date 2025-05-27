import React from 'react';
import ReportForm from '../components/ReportForm';

const ReportPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Submit a Report</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Report suspicious content or activity for review
        </p>
      </div>
      
      <ReportForm />
    </div>
  );
};

export default ReportPage;