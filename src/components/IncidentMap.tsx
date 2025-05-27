import React from 'react';
import { MapMarker } from '../types';
import Card from './ui/Card';

interface IncidentMapProps {
  markers: MapMarker[];
}

const IncidentMap = ({ markers }: IncidentMapProps) => {
  // This is a placeholder for an actual map component
  // In a real implementation, we would integrate with a mapping library
  
  return (
    <Card title="Incident Map">
      <div className="h-[300px] bg-gray-100 dark:bg-gray-700 rounded-lg relative overflow-hidden">
        {/* This is a placeholder for the actual map */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M74,26C61,39 74,59 60,70C46,81 22,62 10,74C-2,86 -2,114 10,126C22,138 45,118 60,129C75,140 60,170 74,183C88,196 117,196 131,183C145,170 129,141 144,129C159,117 183,138 195,126C207,114 207,86 195,74C183,62 158,82 144,70C130,58 145,39 131,26C117,13 87,13 74,26Z" fill="#60A5FA" />
            <path d="M374,226C361,239 374,259 360,270C346,281 322,262 310,274C298,286 298,314 310,326C322,338 345,318 360,329C375,340 360,370 374,383C388,396 417,396 431,383C445,370 429,341 444,329C459,317 483,338 495,326C507,314 507,286 495,274C483,262 458,282 444,270C430,258 445,239 431,226C417,213 387,213 374,226Z" fill="#60A5FA" />
            <path d="M174,126C161,139 174,159 160,170C146,181 122,162 110,174C98,186 98,214 110,226C122,238 145,218 160,229C175,240 160,270 174,283C188,296 217,296 231,283C245,270 229,241 244,229C259,217 283,238 295,226C307,214 307,186 295,174C283,162 258,182 244,170C230,158 245,139 231,126C217,113 187,113 174,126Z" fill="#60A5FA" />
          </svg>
        </div>
        
        {/* Placeholder markers */}
        {markers.map(marker => {
          // Calculate a position based on latitude and longitude for the demo
          // In a real map implementation, these would be proper coordinates
          const left = ((marker.lng + 180) / 360) * 100;
          const top = ((90 - marker.lat) / 180) * 100;
          
          // Determine marker size and color based on severity and count
          const size = 10 + marker.count * 2;
          const color = marker.severity === 'critical' ? '#EF4444' :
                        marker.severity === 'high' ? '#F97316' :
                        marker.severity === 'medium' ? '#F59E0B' : '#3B82F6';
          
          return (
            <div
              key={marker.id}
              className="absolute rounded-full flex items-center justify-center animate-pulse"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <span className="text-xs font-bold text-white">{marker.count}</span>
              <div 
                className="absolute rounded-full animate-ping"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  opacity: 0.4
                }}
              ></div>
            </div>
          );
        })}

        <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-xs">
          <div className="text-center mb-1 font-medium">Incident Severity</div>
          <div className="flex items-center mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>Critical</span>
          </div>
          <div className="flex items-center mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
            <span>High</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
            <span>Medium</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IncidentMap;