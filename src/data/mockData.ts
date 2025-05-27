import { Case, Stat, KeywordTrend, MapMarker } from '../types';

// Sample data for development and testing
// In production, this would come from a secure API

export const mockCases: Case[] = [
  {
    id: 'case-001',
    dateReported: '2025-06-10T08:30:00Z',
    keywords: ['underage', 'young model', 'private session'],
    content: 'Classified advertisement offering "young models" for "private photo sessions"',
    severity: 'high',
    status: 'pending',
    source: 'Web Scraper - Classifieds',
    location: {
      country: 'India',
      region: 'Delhi',
      coordinates: {
        lat: 28.6139,
        lng: 77.2090
      }
    },
    lastUpdated: '2025-06-10T08:30:00Z'
  },
  {
    id: 'case-002',
    dateReported: '2025-06-09T14:22:00Z',
    keywords: ['lolita', 'fresh faces', 'discrete'],
    content: 'Social media post referring to "fresh faces" and "discrete arrangements"',
    severity: 'medium',
    status: 'reviewing',
    source: 'Social Media Monitor',
    location: {
      country: 'India',
      region: 'Maharashtra',
      coordinates: {
        lat: 19.0760,
        lng: 72.8777
      }
    },
    assignedTo: 'analyst-45',
    lastUpdated: '2025-06-10T09:15:00Z'
  },
  {
    id: 'case-003',
    dateReported: '2025-06-08T11:05:00Z',
    keywords: ['teen content', 'premium access', 'special requests'],
    content: 'Messaging platform conversation offering "special content" of minors',
    severity: 'critical',
    status: 'escalated',
    source: 'User Report',
    location: {
      country: 'India',
      region: 'Karnataka',
      coordinates: {
        lat: 12.9716,
        lng: 77.5946
      }
    },
    assignedTo: 'enforcement-12',
    lastUpdated: '2025-06-10T10:45:00Z'
  },
  {
    id: 'case-004',
    dateReported: '2025-06-07T16:40:00Z',
    keywords: ['young talent', 'overseas opportunities', 'quick process'],
    content: 'Job posting offering "overseas opportunities" for "young talent" with "quick processing"',
    severity: 'high',
    status: 'pending',
    source: 'Web Scraper - Job Sites',
    location: {
      country: 'India',
      region: 'West Bengal',
      coordinates: {
        lat: 22.5726,
        lng: 88.3639
      }
    },
    lastUpdated: '2025-06-07T16:40:00Z'
  },
  {
    id: 'case-005',
    dateReported: '2025-06-06T09:18:00Z',
    keywords: ['school uniform', 'play date', 'secret'],
    content: 'Chat message discussing "school uniform photos" and "secret play dates"',
    severity: 'critical',
    status: 'reviewing',
    source: 'Pattern Recognition',
    location: {
      country: 'India',
      region: 'Tamil Nadu',
      coordinates: {
        lat: 13.0827,
        lng: 80.2707
      }
    },
    assignedTo: 'analyst-28',
    lastUpdated: '2025-06-09T11:30:00Z'
  }
];

export const mockStats: Stat[] = [
  { 
    label: 'New Cases (24h)', 
    value: 18, 
    change: 3,
    trend: 'up'
  },
  { 
    label: 'High Severity', 
    value: 7, 
    change: 2,
    trend: 'up'
  },
  { 
    label: 'Cases Resolved', 
    value: 12, 
    change: 5,
    trend: 'up'
  },
  { 
    label: 'Avg. Response Time', 
    value: '4.2h', 
    change: -0.8,
    trend: 'down'
  }
];

export const mockKeywordTrends: KeywordTrend[] = [
  { keyword: 'underage', count: 24, change: 6 },
  { keyword: 'young model', count: 18, change: 2 },
  { keyword: 'private session', count: 15, change: 4 },
  { keyword: 'lolita', count: 12, change: -1 },
  { keyword: 'discrete', count: 10, change: 3 }
];

export const mockMapMarkers: MapMarker[] = [
  { id: 'm1', lat: 28.6139, lng: 77.2090, count: 8, severity: 'high' }, // Delhi
  { id: 'm2', lat: 19.0760, lng: 72.8777, count: 12, severity: 'critical' }, // Mumbai
  { id: 'm3', lat: 12.9716, lng: 77.5946, count: 5, severity: 'medium' }, // Bangalore
  { id: 'm4', lat: 22.5726, lng: 88.3639, count: 4, severity: 'medium' }, // Kolkata
  { id: 'm5', lat: 13.0827, lng: 80.2707, count: 6, severity: 'high' } // Chennai
];