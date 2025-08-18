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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Riyadh'
      };

      setTime(now.toLocaleTimeString('ar-SA', timeOptions));
      setDate(now.toLocaleDateString('ar-SA', dateOptions));
    };

    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-right">
      <div className="text-3xl font-bold text-accent text-shadow" id="currentTime">{time || '...'}</div>
      <p className="text-base opacity-90 mt-1" id="currentDate">{date || '...'}</p>
    </div>
  );
}
