import React from "react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
function SignInWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <FaGoogle />
      {isLoading ? "Redirecting..." : "Login with Google"}
    </Button>
  );
}

export default SignInWithGoogle;
