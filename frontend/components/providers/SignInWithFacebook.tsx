import React from "react";
import { Button } from "../ui/button";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
function SignInWithFacebook() {
  const [isLoading, setIsLoading] = useState(false);
  const { OauthLogin } = useAuth();
  const handleFacebookLogin = async () => {
    setIsLoading(true);
    await OauthLogin("fb");
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
