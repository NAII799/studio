
"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { passengerDatabase } from '@/lib/data';
import { BoardingPassPrint } from '@/components/boarding-pass-print';
import type { CheckedInPassenger } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function PrintManifestPage() {
    const searchParams = useSearchParams();
    const pnrs = searchParams.get('pnrs')?.split(',') || [];

    const passengersToPrint: CheckedInPassenger[] = pnrs
        .map(pnr => {
            const paxData = passengerDatabase[pnr];
            if (!paxData) return null;
            // Create a mock CheckedInPassenger object for printing
            return {
                ...paxData,
                bookingRef: pnr,
                seat: paxData.seat || '15A', // Use assigned or a default
                checkedBags: paxData.baggageAllowance.count,
                totalBaggageWeight: paxData.baggageAllowance.count * paxData.baggageAllowance.weight,
                finalGate: paxData.hasGateChange ? `${paxData.gate.charAt(0)}${parseInt(paxData.gate.substring(1)) + 2}` : paxData.gate,
            };
        })
        .filter((p): p is CheckedInPassenger => p !== null);

    useEffect(() => {
        // Automatically trigger print dialog once the component mounts and has data
        if (passengersToPrint.length > 0) {
            setTimeout(() => window.print(), 500);
        }
    }, [passengersToPrint.length]);

    if (passengersToPrint.length === 0) {
        return (
            <div className="p-10 text-center text-black">
                <h1 className="text-2xl font-bold">No Passengers Selected</h1>
                <p>Please go back to the manifest and select passengers to print.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="p-4 no-print fixed top-4 right-4 z-50">
                 <Button onClick={() => window.print()} className="btn-primary-gradient font-bold">
                    <Printer className="mr-2"/>
                    Print Again
                </Button>
            </div>
            <div className="flex flex-col gap-4 p-4 bg-gray-400 printable-manifest">
                {passengersToPrint.map(passenger => (
                    <div key={passenger.bookingRef} className="break-after-page">
                         <BoardingPassPrint passenger={passenger} />
                    </div>
                ))}
            </div>
             <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    .printable-manifest {
                        padding: 0;
                        background: none;
                    }
                    html, body {
                        background-color: #fff;
                    }
                }
                @page {
                    size: auto;
                    margin: 1cm;
                }
                .break-after-page {
                    page-break-after: always;
                }
                .break-after-page:last-child {
                    page-break-after: avoid;
                }
            `}</style>
        </div>
    );
}
