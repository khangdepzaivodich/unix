"use client";

import type React from "react";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Permission, UserRole } from "@/lib/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  requiredRoles?: UserRole[];
  fallbackUrl?: string;
}

export function ProtectedRoute({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  fallbackUrl = "/login",
}: ProtectedRouteProps) {
  const { isLoading, user, hasAnyPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (
      requiredRoles.length > 0 &&
      user &&
      !requiredRoles.includes(user.role)
    ) {
      router.push("/unauthorized");
      return;
    }

    if (
      requiredPermissions.length > 0 &&
      !hasAnyPermission(requiredPermissions)
    ) {
      router.push("/unauthorized");
      return;
    }
  }, [
    isLoading,
    user,
    hasAnyPermission,
    requiredPermissions,
    requiredRoles,
    router,
    fallbackUrl,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return null;
  }

  if (
    requiredPermissions.length > 0 &&
    !hasAnyPermission(requiredPermissions)
  ) {
    return null;
  }

  return <>{children}</>;
}
