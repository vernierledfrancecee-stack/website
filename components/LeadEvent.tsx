'use client';

import { useEffect } from 'react';

export default function LeadEvent() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  }, []);

  return null;
}
