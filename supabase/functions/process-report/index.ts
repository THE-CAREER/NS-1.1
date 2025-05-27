import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ReportSubmission {
  contentUrl?: string;
  contentText?: string;
  description: string;
  contactInfo?: string;
  location?: {
    country: string;
    region: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
}

// Simple keyword-based severity assessment
function assessSeverity(text: string): 'low' | 'medium' | 'high' | 'critical' {
  const criticalKeywords = ['abuse', 'exploitation', 'trafficking'];
  const highKeywords = ['underage', 'minor', 'young model'];
  const mediumKeywords = ['suspicious', 'concerning'];

  const normalizedText = text.toLowerCase();

  if (criticalKeywords.some(keyword => normalizedText.includes(keyword))) {
    return 'critical';
  }
  if (highKeywords.some(keyword => normalizedText.includes(keyword))) {
    return 'high';
  }
  if (mediumKeywords.some(keyword => normalizedText.includes(keyword))) {
    return 'medium';
  }
  return 'low';
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const report: ReportSubmission = await req.json();

    // Validate required fields
    if (!report.description) {
      throw new Error('Description is required');
    }

    // Combine all text for analysis
    const analysisText = [
      report.description,
      report.contentText,
      report.contentUrl
    ].filter(Boolean).join(' ');

    // Assess severity based on content
    const severity = assessSeverity(analysisText);

    // Extract potential keywords (simplified version)
    const keywords = analysisText
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .slice(0, 10);

    // Create report in database
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          content_url: report.contentUrl,
          content_text: report.contentText,
          description: report.description,
          contact_info: report.contactInfo,
          severity,
          location: report.location,
          metadata: {
            keywords,
            ai_confidence: 0.85, // Placeholder for actual AI confidence score
            source_ip: req.headers.get('x-real-ip'),
            user_agent: req.headers.get('user-agent')
          }
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // If severity is high or critical, create an alert
    if (severity === 'high' || severity === 'critical') {
      await supabase
        .from('alerts')
        .insert([
          {
            type: 'new_high_risk_report',
            message: `New ${severity} risk report submitted`,
            severity,
            report_id: data.id,
            metadata: {
              keywords,
              location: report.location
            }
          }
        ]);
    }

    return new Response(
      JSON.stringify({
        message: 'Report submitted successfully',
        data: {
          id: data.id,
          severity,
          status: data.status
        }
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});