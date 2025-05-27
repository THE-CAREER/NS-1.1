/*
  # Initial Schema Setup for SafeTrace AI

  1. New Tables
    - cases
      - Stores reported cases with location, severity, and status
    - alerts
      - Stores real-time alerts and notifications
    - risk_zones
      - Stores geographical risk assessment data
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create cases table
CREATE TABLE IF NOT EXISTS cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status text NOT NULL CHECK (status IN ('pending', 'reviewing', 'escalated', 'closed', 'false_positive')),
  source text NOT NULL,
  keywords text[] NOT NULL DEFAULT '{}',
  location jsonb NOT NULL,
  assigned_to uuid REFERENCES auth.users,
  date_reported timestamptz DEFAULT now(),
  last_updated timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  message text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  location jsonb,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  case_id uuid REFERENCES cases(id),
  created_by uuid REFERENCES auth.users NOT NULL
);

-- Create risk_zones table
CREATE TABLE IF NOT EXISTS risk_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location jsonb NOT NULL,
  risk_score float NOT NULL CHECK (risk_score >= 0 AND risk_score <= 10),
  factors jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_updated timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_zones ENABLE ROW LEVEL SECURITY;

-- Cases policies
CREATE POLICY "Users can view all cases"
  ON cases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create cases"
  ON cases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update assigned cases"
  ON cases FOR UPDATE
  TO authenticated
  USING (auth.uid() = assigned_to OR auth.uid() = created_by);

-- Alerts policies
CREATE POLICY "Users can view their alerts"
  ON alerts FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create alerts"
  ON alerts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their alerts"
  ON alerts FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Risk zones policies
CREATE POLICY "Users can view all risk zones"
  ON risk_zones FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create risk zones"
  ON risk_zones FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their risk zones"
  ON risk_zones FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS cases_severity_idx ON cases(severity);
CREATE INDEX IF NOT EXISTS cases_status_idx ON cases(status);
CREATE INDEX IF NOT EXISTS alerts_severity_idx ON alerts(severity);
CREATE INDEX IF NOT EXISTS risk_zones_risk_score_idx ON risk_zones(risk_score);