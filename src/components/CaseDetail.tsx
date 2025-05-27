import React from 'react';
import { Case } from '../types';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  ArrowLeft, 
  FileText, 
  Shield 
} from 'lucide-react';

interface CaseDetailProps {
  caseItem: Case;
  onBack: () => void;
}

const CaseDetail = ({ caseItem, onBack }: CaseDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="text"
          size="sm"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to List
        </Button>
        <h2 className="text-xl font-bold">Case #{caseItem.id}</h2>
        <Badge variant={caseItem.severity} className="ml-auto">
          {caseItem.severity.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card title="Content Information">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line font-mono text-sm">
                {caseItem.content}
              </p>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {caseItem.keywords.map((keyword, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-800 dark:text-gray-200">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Actions">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="primary" size="lg" className="flex items-center justify-center">
                <FileText className="h-5 w-5 mr-2" />
                Generate Report
              </Button>
              <Button variant="danger" size="lg" className="flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Escalate to Authorities
              </Button>
              <Button variant="secondary" size="lg" className="flex items-center justify-center">
                <Shield className="h-5 w-5 mr-2" />
                Mark for Review
              </Button>
              <Button variant="text" size="lg" className="flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <User className="h-5 w-5 mr-2" />
                Assign to Team Member
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Case Details">
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Reported:</span>
                </div>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 pl-6">
                  {formatDate(caseItem.dateReported)}
                </p>
              </div>
              
              <div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Last Updated:</span>
                </div>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 pl-6">
                  {formatDate(caseItem.lastUpdated)}
                </p>
              </div>
              
              {caseItem.location && (
                <div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Location:</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 pl-6">
                    {caseItem.location.region}, {caseItem.location.country}
                  </p>
                </div>
              )}
              
              <div>
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">Source:</span>
                </div>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 pl-6">
                  {caseItem.source}
                </p>
              </div>
              
              {caseItem.assignedTo && (
                <div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">Assigned To:</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 pl-6">
                    {caseItem.assignedTo}
                  </p>
                </div>
              )}
            </div>
          </Card>
          
          <Card title="Similar Cases">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI analysis has identified 3 similar cases that may be related.
            </p>
            <div className="mt-4 space-y-2">
              <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Case #case-002</span>
                  <Badge variant="medium">Medium</Badge>
                </div>
              </div>
              <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Case #case-015</span>
                  <Badge variant="high">High</Badge>
                </div>
              </div>
              <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Case #case-027</span>
                  <Badge variant="low">Low</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;