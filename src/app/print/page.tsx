
'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BoardingPassPrint } from '@/components/boarding-pass-print';
import { BaggageTagPrint } from '@/components/baggage-tag-print';
import type { CheckedInPassenger } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function PrintContent() {
  const searchParams = useSearchParams();
  const printType = searchParams.get('type');
  const passengerData = searchParams.get('passenger');

  useEffect(() => {
    if (printType && passengerData) {
      // Give the browser a moment to render the content before printing
      const timer = setTimeout(() => {
        window.print();
      }, 500); // 500ms delay to be safe

      // Add event listener for after printing
      const handleAfterPrint = () => {
        window.close();
      };
      
      window.addEventListener('afterprint', handleAfterPrint);

      // Cleanup
      return () => {
        clearTimeout(timer);
        window.removeEventListener('afterprint', handleAfterPrint);
      };
    } else {
        // If data is missing, close the window
        window.close();
    }
  }, [printType, passengerData]);

  if (!passengerData) {
    return <div className="p-4">Loading passenger data...</div>;
  }

  try {
    const passenger: CheckedInPassenger = JSON.parse(decodeURIComponent(passengerData));

    return (
      <div className="bg-white">
        {printType === 'boardingPass' && <BoardingPassPrint passenger={passenger} />}
        {printType === 'baggageTag' && <BaggageTagPrint passenger={passenger} />}
      </div>
    );
  } catch (error) {
    console.error('Failed to parse passenger data:', error);
    return <div className="p-4 text-red-500">Error: Could not load print data.</div>;
  }
}

export default function PrintPage() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-screen" />}>
      <PrintContent />
    </Suspense>
  );
}
