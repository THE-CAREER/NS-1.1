import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Stat } from '../../types';
import Card from './Card';

interface StatCardProps {
  stat: Stat;
  className?: string;
}

const StatCard = ({ stat, className = '' }: StatCardProps) => {
  const { label, value, change, trend } = stat;
  
  const renderTrendIcon = () => {
    if (!trend) return null;
    
    const iconProps = { className: 'h-4 w-4', strokeWidth: 2 };
    
    if (trend === 'up') {
      return <TrendingUp {...iconProps} className={`${iconProps.className} text-red-500`} />;
    } else if (trend === 'down') {
      return <TrendingDown {...iconProps} className={`${iconProps.className} text-green-500`} />;
    } else {
      return <Minus {...iconProps} className={`${iconProps.className} text-gray-500`} />;
    }
  };
  
  const getTrendTextColor = () => {
    if (!trend) return 'text-gray-500';
    
    if (trend === 'up' && label.includes('Time')) return 'text-red-500';
    if (trend === 'down' && label.includes('Time')) return 'text-green-500';
    if (trend === 'up' && label.includes('Resolved')) return 'text-green-500';
    if (trend === 'down' && label.includes('Resolved')) return 'text-red-500';
    
    // Default colors for cases/incidents
    if (trend === 'up') return 'text-red-500';
    if (trend === 'down') return 'text-green-500';
    
    return 'text-gray-500';
  };

  return (
    <Card className={`${className}`}>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        
        {change !== undefined && (
          <div className="flex items-center mt-2">
            {renderTrendIcon()}
            <span className={`text-sm ml-1 ${getTrendTextColor()}`}>
              {change > 0 ? '+' : ''}{change}
              {typeof value === 'string' && value.includes('h') ? 'h' : ''}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;