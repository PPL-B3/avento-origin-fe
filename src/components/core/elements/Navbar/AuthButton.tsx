"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type AuthButtonProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const AuthButton = ({ isLoggedIn, setIsLoggedIn }: AuthButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setLoading(false);
    }, 500);
  };

  return isLoggedIn ? (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className={`px-6 py-2 text-white hover:scale-105 transition-transform duration-200 ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  ) : (
    <Button
      onClick={() => setIsLoggedIn(true)}
      className="px-6 py-2 bg-blue-600 text-white hover:scale-105 transition-transform duration-200 hover:bg-blue-700"
    >
      Login
    </Button>
  );
};

export default AuthButton;