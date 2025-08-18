"use client";

import { LiveClock } from './live-clock';

const AirplaneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-12 w-12 text-accent"
    style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

export function AirportHeader() {
  return (
    <header className="relative text-white shadow-lg overflow-hidden bg-gradient-to-r from-[hsl(161,70%,20%)] to-[hsl(var(--primary))] no-print">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 text-center md:text-right">
            <div className="flex items-center gap-5">
                <AirplaneIcon />
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold font-headline text-shadow">مطار الملك عبدالعزيز الدولي</h1>
                    <p className="text-sm opacity-90">King Abdulaziz International Airport - JED</p>
                    <p className="text-xs opacity-90">جدة - المملكة العربية السعودية</p>
                </div>
            </div>
            <LiveClock />
        </div>
        <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')`
            }}
        />
    </header>
  );
}
