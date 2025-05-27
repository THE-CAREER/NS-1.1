import React, { useState } from 'react';
import { mockCases } from '../data/mockData';
import CasesList from '../components/CasesList';
import CaseDetail from '../components/CaseDetail';
import { Case } from '../types';

const CasesPage = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  const selectedCase = mockCases.find(c => c.id === selectedCaseId);
  
  const handleViewCase = (caseId: string) => {
    setSelectedCaseId(caseId);
  };
  
  const handleBackToList = () => {
    setSelectedCaseId(null);
  };
  
  return (
    <div className="space-y-6">
      {selectedCaseId && selectedCase ? (
        <CaseDetail 
          caseItem={selectedCase} 
          onBack={handleBackToList}
        />
      ) : (
        <>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cases</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Review and manage flagged content cases
            </p>
          </div>
          
          <CasesList 
            cases={mockCases} 
            onViewCase={handleViewCase}
          />
        </>
      )}
    </div>
  );
};

export default CasesPage;