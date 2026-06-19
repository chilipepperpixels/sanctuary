"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "pepper-sanctuary-visitor";

function getVisitorId() {
  const existing = window.localStorage.getItem(VISITOR_KEY);

  if (existing) {
    return existing;
  }

  const visitorId =
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(VISITOR_KEY, visitorId);
  return visitorId;
}

export default function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const visitorId = getVisitorId();

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, visitorId }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
