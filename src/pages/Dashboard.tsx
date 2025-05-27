import React from 'react';
import { mockStats, mockKeywordTrends, mockMapMarkers } from '../data/mockData';
import StatCard from '../components/ui/StatCard';
import KeywordTrends from '../components/KeywordTrends';
import IncidentMap from '../components/IncidentMap';
import { Shield, AlertTriangle, Eye, Clock } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 mb-6">
        <h1 className="text-3xl font-bold text-white font-display">Sentinel Dashboard</h1>
        <p className="text-primary-200 mt-2 max-w-3xl">
          Real-time monitoring and analysis of potential exploitation cases. Every alert represents an opportunity to protect a vulnerable child.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatCard 
            key={index} 
            stat={stat}
            className="bg-gradient-to-br from-primary-800/50 to-primary-900/50 border border-primary-700/50 shadow-lg hover:shadow-xl transition-shadow duration-200"
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-primary-900 rounded-lg shadow-xl overflow-hidden border border-primary-700/50">
          <div className="px-4 py-3 bg-gradient-to-r from-primary-900 to-primary-800 border-b border-primary-700">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Eye className="h-5 w-5 mr-2 text-accent-400" />
              Sentinel Map
            </h3>
          </div>
          <div className="p-4">
            <IncidentMap markers={mockMapMarkers} />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl overflow-hidden border border-primary-700/50">
            <div className="px-4 py-3 bg-gradient-to-r from-primary-900 to-primary-800 border-b border-primary-700">
              <h3 className="text-lg font-medium text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-accent-400" />
                High Priority Alerts
              </h3>
            </div>
            <div className="p-4">
              <KeywordTrends trends={mockKeywordTrends} />
            </div>
          </div>
          
          <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl overflow-hidden border border-primary-700/50">
            <div className="px-4 py-3 bg-gradient-to-r from-primary-900 to-primary-800 border-b border-primary-700">
              <h3 className="text-lg font-medium text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-accent-400" />
                System Status
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-success-900/20 rounded-md border border-success-700">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-success-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-success-300 font-medium">Text Analysis Engine</span>
                  </div>
                  <span className="text-success-400 text-sm">Operational</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-success-900/20 rounded-md border border-success-700">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-success-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-success-300 font-medium">Image Analysis Engine</span>
                  </div>
                  <span className="text-success-400 text-sm">Operational</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-accent-900/20 rounded-md border border-accent-700">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-accent-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-accent-300 font-medium">Web Scraper Module</span>
                  </div>
                  <span className="text-accent-400 text-sm">Partial Outage</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-success-900/20 rounded-md border border-success-700">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-success-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-success-300 font-medium">Database & Storage</span>
                  </div>
                  <span className="text-success-400 text-sm">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;