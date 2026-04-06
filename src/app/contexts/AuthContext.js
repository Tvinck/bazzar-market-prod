'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from bazzar_customers
  const loadProfile = useCallback(async (userId) => {
    try {
      const { data } = await supabase
        .from('bazzar_customers')
        .select('*')
        .eq('id', userId)
        .single();
      setProfile(data);
    } catch (e) {
      console.warn('[Auth] Profile load failed:', e.message);
    }
  }, []);

  // Update last login
  const updateLastLogin = useCallback(async (userId) => {
    await supabase
      .from('bazzar_customers')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', userId);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u.id);
        updateLastLogin(u.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          loadProfile(u.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [loadProfile, updateLastLogin]);

  // Sign up with email
  const signUp = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name || '' },
      },
    });
    if (error) throw error;

    // Create profile immediately (trigger may also fire)
    if (data.user) {
      await supabase.from('bazzar_customers').upsert({
        id: data.user.id,
        email: data.user.email,
        name: name || '',
      }, { onConflict: 'id' });
    }

    return data;
  };

  // Sign in with email
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // Update profile
  const updateProfile = async (updates) => {
    if (!user) return;
    const { error } = await supabase
      .from('bazzar_customers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    if (error) throw error;
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      loadProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
