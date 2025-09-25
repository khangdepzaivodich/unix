"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, UserRole, Permission } from "@/lib/types";
// import { hasPermission, hasAnyPermission, canAccessRoute } from "@/lib/rbac";
import { Session } from "@supabase/supabase-js";
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  canAccessRoute: (route: string) => boolean;
  getUserRole: () => UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [session, setSession] = useState(initialSession);
  const supabase = createClient();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Load user from Supabase on mount and listen for auth changes
  useEffect(() => {
    // const getUser = async () => {
    //   setState((prev) => ({ ...prev, isLoading: true }));
    //   const { data, error } = await supabase.auth.getUser();
    //   if (data?.user) {
    //     setState({
    //       user: data.user,
    //       isLoading: false,
    //       isAuthenticated: true,
    //     });
    //   } else {
    //     setState({
    //       user: null,
    //       isLoading: false,
    //       isAuthenticated: false,
    //     });
    //   }
    // };
    // getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setState({
            user: {
              id: session.user.id,
              email: session.user.email,
              user_metadata: session.user.user_metadata,
              last_sign_in_at: session.user.last_sign_in_at,
            },
            isLoading: false,
            isAuthenticated: session.user.email_confirmed_at != null,
          });
        } else {
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.user) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return false;
      }
      setState({
        user: {
          id: data.user.id,
          email: data.user.email,
          user_metadata: data.user.user_metadata,
          last_sign_in_at: data.user.last_sign_in_at,
        },
        isLoading: false,
        isAuthenticated: data.user.email_confirmed_at != null,
      });
      return true;
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error || !data.user) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return false;
      }
      setState({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
      });
      return true;
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!state.user) return false;
      // Supabase profile update (example: update user metadata)
      const { error } = await supabase.auth.updateUser({ data });
      if (error) return false;
      // Reload user
      const { data: userData } = await supabase.auth.getUser();
      setState({
        user: userData?.user || null,
        isLoading: false,
        isAuthenticated: !!userData?.user,
      });
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  // Permission checking methods (tùy chỉnh lại nếu dùng metadata Supabase)
  const checkPermission = (_permission: Permission): boolean => {
    // Implement permission logic if you store permissions in user metadata
    return true;
  };

  const checkAnyPermission = (_permissions: Permission[]): boolean => {
    return true;
  };

  const checkCanAccessRoute = (_route: string): boolean => {
    return true;
  };

  const getUserRole = (): UserRole | null => {
    // Nếu lưu role trong user metadata, lấy từ user.user_metadata.role
    // return state.user?.user_metadata?.role || null;
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
        hasPermission: checkPermission,
        hasAnyPermission: checkAnyPermission,
        canAccessRoute: checkCanAccessRoute,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
