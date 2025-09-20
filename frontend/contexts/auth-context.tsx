"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole, Permission } from "@/lib/types";
import { hasPermission, hasAnyPermission, canAccessRoute } from "@/lib/rbac";
import { users } from "@/data/users.json";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user exists (mock validation)
      const user = users.find((u) => u.email === email);
      if (!user || password !== "password") {
        return false;
      }

      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString(),
      };

      setState({
        user: updatedUser,
        isLoading: false,
        isAuthenticated: true,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return true;
    } catch (error) {
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
      // Mock registration - in real app this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: "/placeholder.svg?height=100&width=100",
        role: "customer",
        permissions: [],
        department: "customer",
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      setState({
        user: newUser,
        isLoading: false,
        isAuthenticated: true,
      });

      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    localStorage.removeItem("user");
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!state.user) return false;

      // Mock profile update - in real app this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...state.user, ...data };

      setState({
        user: updatedUser,
        isLoading: false,
        isAuthenticated: true,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  // Permission checking methods
  const checkPermission = (permission: Permission): boolean => {
    if (!state.user) return false;
    return hasPermission(state.user.permissions, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!state.user) return false;
    return hasAnyPermission(state.user.permissions, permissions);
  };

  const checkCanAccessRoute = (route: string): boolean => {
    if (!state.user) return false;
    return canAccessRoute(state.user.role, route);
  };

  const getUserRole = (): UserRole | null => {
    return state.user?.role || null;
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
