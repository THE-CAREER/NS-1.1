import React from 'react';

interface BadgeProps {
  variant?: 'low' | 'medium' | 'high' | 'critical' | 'default' | 'success';
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ variant = 'default', children, className = '' }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  
  const variantStyles = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;