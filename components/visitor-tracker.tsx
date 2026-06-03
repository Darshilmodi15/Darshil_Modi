"use client";

import { useEffect } from "react";

/**
 * VisitorTracker Component
 * 
 * Automatically tracks portfolio visits and sends visitor data to Supabase.
 * Includes duplicate prevention (5-minute IP hash cooldown).
 * 
 * Tracked data:
 * - Country (from geolocation API)
 * - City (from geolocation API)
 * - User Agent
 * - Timestamp
 * - IP Hash (SHA256 hashed)
 */
export function VisitorTracker() {
  useEffect(() => {
    // Track visitor on component mount
    trackVisitor();
  }, []);

  async function trackVisitor() {
    try {
      // Get geolocation data
      const geoResponse = await fetch("https://ipapi.co/json/");
      const geoData = await geoResponse.json();

      // Prepare visitor data
      const visitorData = {
        country: geoData.country_name || "Unknown",
        city: geoData.city || null,
        ipHash: geoData.ip || null
      };

      // Send to tracking API
      const response = await fetch("/api/track-visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(visitorData)
      });

      if (!response.ok) {
        console.warn("Visitor tracking failed:", response.statusText);
      }
    } catch (error) {
      // Silently fail - don't block user experience
      console.debug("Visitor tracking error:", error);
    }
  }

  // This component doesn't render anything
  return null;
}
