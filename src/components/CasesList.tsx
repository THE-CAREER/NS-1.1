import React, { useState } from 'react';
import { Case } from '../types';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { Clock, AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';

interface CasesListProps {
  cases: Case[];
  onViewCase: (caseId: string) => void;
}

const CasesList = ({ cases, onViewCase }: CasesListProps) => {
  const [filter, setFilter] = useState<string>('all');
  
  const getStatusIcon = (status: Case['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'reviewing':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'escalated':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'false_positive':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.severity === filter);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Flagged Cases</h3>
        
        <div className="flex space-x-2">
          <Button 
            variant={filter === 'all' ? 'primary' : 'text'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'critical' ? 'danger' : 'text'}
            size="sm"
            onClick={() => setFilter('critical')}
          >
            Critical
          </Button>
          <Button 
            variant={filter === 'high' ? 'warning' : 'text'}
            size="sm"
            onClick={() => setFilter('high')}
          >
            High
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Keywords</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Source</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Severity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCases.map(caseItem => (
              <tr key={caseItem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatDate(caseItem.dateReported)}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {caseItem.keywords.slice(0, 2).map((keyword, idx) => (
                      <span key={idx} className="inline-block px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                        {keyword}
                      </span>
                    ))}
                    {caseItem.keywords.length > 2 && (
                      <span className="inline-block px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                        +{caseItem.keywords.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{caseItem.source}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={caseItem.severity}>{caseItem.severity}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <div className="flex items-center">
                    {getStatusIcon(caseItem.status)}
                    <span className="ml-2 capitalize">{caseItem.status.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => onViewCase(caseItem.id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CasesList;