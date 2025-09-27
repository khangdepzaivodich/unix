"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const logOut = async () => {
    await logout();
    router.push("/auth/login");
  };

  return <Button onClick={logOut}>Logout</Button>;
}
