"use client";

import { Suspense } from "react";
import PaqueteView from "@/components/PaqueteView";

export default function PaquetePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaqueteView />
    </Suspense>
  );
}
