export interface Case {
  id: string;
  dateReported: string;
  keywords: string[];
  content: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewing' | 'escalated' | 'closed' | 'false_positive';
  source: string;
  location?: {
    country: string;
    region: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  assignedTo?: string;
  lastUpdated: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'analyst' | 'admin' | 'law_enforcement';
  organization: string;
}

export interface Stat {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface KeywordTrend {
  keyword: string;
  count: number;
  change: number;
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  count: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ReportSubmission {
  contentUrl?: string;
  contentText?: string;
  description: string;
  contactInfo?: string;
  consentGiven: boolean;
}