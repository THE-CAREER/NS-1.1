import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Case, Alert, RiskZone } from '../types';

interface AppState {
  cases: Case[];
  alerts: Alert[];
  riskZones: RiskZone[];
  loading: boolean;
  error: string | null;
  fetchCases: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchRiskZones: () => Promise<void>;
  createCase: (caseData: Partial<Case>) => Promise<void>;
  updateCase: (id: string, caseData: Partial<Case>) => Promise<void>;
  markAlertAsRead: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  cases: [],
  alerts: [],
  riskZones: [],
  loading: false,
  error: null,

  fetchCases: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('date_reported', { ascending: false });

      if (error) throw error;
      set({ cases: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchAlerts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ alerts: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchRiskZones: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('risk_zones')
        .select('*')
        .order('risk_score', { ascending: false });

      if (error) throw error;
      set({ riskZones: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createCase: async (caseData) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('cases')
        .insert([caseData]);

      if (error) throw error;
      await get().fetchCases();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateCase: async (id, caseData) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('cases')
        .update(caseData)
        .eq('id', id);

      if (error) throw error;
      await get().fetchCases();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  markAlertAsRead: async (id) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      await get().fetchAlerts();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));