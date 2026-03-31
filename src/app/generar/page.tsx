"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GenerarPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if someone navigates here directly
    router.replace("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirigiendo...</p>
      </div>
    </div>
  );
}
