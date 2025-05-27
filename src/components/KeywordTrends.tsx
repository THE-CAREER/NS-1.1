import React from 'react';
import { KeywordTrend } from '../types';
import Card from './ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KeywordTrendsProps {
  trends: KeywordTrend[];
}

const KeywordTrends = ({ trends }: KeywordTrendsProps) => {
  return (
    <Card title="Trending Keywords">
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {trend.keyword}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{trend.count}</span>
              <div className={`flex items-center ${trend.change > 0 ? 'text-red-500' : trend.change < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                {trend.change > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : trend.change < 0 ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : null}
                <span className="text-xs font-medium">
                  {trend.change > 0 ? `+${trend.change}` : trend.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default KeywordTrends;