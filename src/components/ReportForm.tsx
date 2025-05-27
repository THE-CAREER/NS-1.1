import React, { useState } from 'react';
import { ReportSubmission } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { Shield, AlertTriangle } from 'lucide-react';

const ReportForm = () => {
  const [formData, setFormData] = useState<ReportSubmission>({
    contentUrl: '',
    contentText: '',
    description: '',
    contactInfo: '',
    consentGiven: false
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          contentUrl: '',
          contentText: '',
          description: '',
          contactInfo: '',
          consentGiven: false
        });
      }, 3000);
    }, 1500);
  };
  
  if (submitted) {
    return (
      <Card>
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Report Submitted</h3>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
            Thank you for submitting a report. Our team will review it as soon as possible.
          </p>
          <Button
            variant="primary"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Report
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <Card title="Submit a Report">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Your report will be kept confidential and reviewed by authorized personnel only. Never submit or download illegal content.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="contentUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content URL (optional)
            </label>
            <input
              type="text"
              id="contentUrl"
              name="contentUrl"
              value={formData.contentUrl}
              onChange={handleChange}
              placeholder="https://example.com/suspicious-page"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="contentText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Suspicious Text Content (optional)
            </label>
            <textarea
              id="contentText"
              name="contentText"
              value={formData.contentText}
              onChange={handleChange}
              rows={3}
              placeholder="Paste the suspicious text content here"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Please describe why you believe this content is suspicious or harmful"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Information (optional)
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="Email or phone number for follow-up"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              We recommend providing contact information for potential follow-up, but it's not required.
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consentGiven"
                name="consentGiven"
                type="checkbox"
                checked={formData.consentGiven}
                onChange={handleChange}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <label htmlFor="consentGiven" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              I understand that this information will be reviewed by authorized personnel and may be shared with law enforcement if necessary.
            </label>
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={submitting}
              disabled={!formData.description || !formData.consentGiven}
              fullWidth
            >
              Submit Report
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ReportForm;