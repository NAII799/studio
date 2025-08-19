"use client";

import { LiveClock } from './live-clock';
import { PlaneTakeoff } from 'lucide-react';

export function AirportHeader() {
  return (
    <header className="bg-card border-b border-border no-print">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <PlaneTakeoff className="h-8 w-8 text-primary" />
                <div>
                    <h1 className="text-xl font-bold text-primary">Amadeus Altea DCS Mockup</h1>
                    <p className="text-sm text-muted-foreground">King Abdulaziz International Airport - JED</p>
                </div>
            </div>
            <LiveClock />
        </div>
    </header>
  );
}
