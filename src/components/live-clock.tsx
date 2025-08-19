"use client";

import { useState, useEffect } from 'react';

export function LiveClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Riyadh'
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Riyadh'
      };

      setTime(now.toLocaleTimeString('en-GB', timeOptions));
      setDate(now.toLocaleDateString('en-CA', dateOptions));
    };

    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-right font-mono">
      <div className="text-2xl font-bold text-primary" id="currentTime">{time || '...'}</div>
      <p className="text-sm text-muted-foreground" id="currentDate">{date || '...'}</p>
    </div>
  );
}
