import React from "react";
import { Button } from "../ui/button";
import { FaFacebook } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
function SignInWithFacebook() {
  const [isLoading, setIsLoading] = useState(false);
  const handleFacebookLogin = async () => {
    const supabase = createClient();
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "facebook",
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
      onClick={handleFacebookLogin}
      disabled={isLoading}
    >
      <FaFacebook />
      {isLoading ? "Redirecting..." : "Login with Facebook"}
    </Button>
  );
}

export default SignInWithFacebook;
