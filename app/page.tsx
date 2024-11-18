"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import MobileInteractiveAvatar from "@/components/MobileInteractiveAvatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication immediately
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.replace("/SignIn");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);
  
  useEffect(() => {
    if (!isAuthenticated) return; // Don't set up resize listener if not authenticated

    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width:765px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isAuthenticated]);

  // Show nothing while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  // Only render content if authenticated
  return (
    <div>
      {isMobile ? (
        <MobileInteractiveAvatar />
      ) : (
        <div className="w-[95%] flex flex-col items-center justify-center gap-5 mx-auto pt-4">
          <InteractiveAvatar />
        </div>
      )}
    </div>
  );
}