'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next";

// Assume you import your Vercel Analytics 'track' function here

export default function Tracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // This code only runs on the client side after hydration
    const source = searchParams.get('utm_source');
    const campaign = searchParams.get('utm_campaign');

    if (source === 'cv' && campaign) {
      // FIRE YOUR CUSTOM TRACK EVENT HERE
      // e.g., track('CV_Click', { source: source, campaign: campaign });
      console.log(`Tracking Event Fired: CV Click from ${campaign}`); 
    }
  }, [searchParams]); // Re-run effect if URL query changes


  return null; // This component renders nothing
}