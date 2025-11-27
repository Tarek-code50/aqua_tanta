import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  role: UserRole | null;
  signIn: (email: string, pass: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Profile after Auth State Change
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data as UserProfile);
      }
    } catch (err) {
      console.error('Profile fetch exception:', err);
    }
  };

  useEffect(() => {
    // Check Active Session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setLoading(false);
    };

    checkSession();

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string) => {
    // For demo purposes, we will intercept the specific hardcoded admin email
    // to simulate success if Supabase is not fully configured by the user yet.
    // IN PRODUCTION: Remove this mock block.
    if (
      email === 'gamal@gmail.com' &&
      pass === 'gamalalatar@12123232' &&
      !import.meta.env.VITE_SUPABASE_URL
    ) {
      const mockProfile: UserProfile = {
        id: 'mock-admin-id',
        email: email,
        full_name: 'Gamal Alatar',
        role: 'admin',
      };
      setUser({ id: 'mock-admin-id', email });
      setProfile(mockProfile);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        role: profile?.role || null,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
