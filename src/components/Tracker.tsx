'use client'; 
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
// 👈 The crucial import for firing tracking events
import { track } from '@vercel/analytics/react'; 

export default function Tracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Get the parameters from the URL
    const source = searchParams.get('utm_source');
    const campaign = searchParams.get('utm_campaign');

    // 2. Check for the specific CV tracking parameters
    if (source === 'cv' && campaign) {
      // 3. Fire the custom event
      // This event will appear in the "Events" panel in your Vercel Analytics Dashboard
      track('CV_Link_Click', {
        source: source,
        campaign: campaign,
        // Optional: Include the medium as well
        medium: searchParams.get('utm_medium') || 'unknown',
      });
      console.log(`Vercel Tracking Event Fired: CV Click for campaign: ${campaign}`);
    }
  }, [searchParams]);

  return null; // This functional component renders nothing to the DOM
}