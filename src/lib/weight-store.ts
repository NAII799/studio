
"use client";

import type { AircraftWeightInfo } from './types';

const PASSENGER_WEIGHT_KEY = 'totalPassengerWeight';
const BAGGAGE_WEIGHT_KEY = 'totalBaggageWeight';
const CARGO_WEIGHT_KEY = 'dummyCargoWeight';
const PASSENGER_COUNT_KEY = 'totalPassengerCount';
const LAST_WEIGHT_RESET_KEY = 'lastWeightReset';

const AVERAGE_PASSENGER_WEIGHT = 75; // kg
const DEFAULT_CARGO_WEIGHT = 15000; // kg
const ONE_HOUR = 60 * 60 * 1000;

function isServer(): boolean {
  return typeof window === 'undefined';
}

function checkAndResetWeightData() {
    if (isServer()) return;

    const lastReset = localStorage.getItem(LAST_WEIGHT_RESET_KEY);
    const now = new Date().getTime();

    if (lastReset && (now - parseInt(lastReset) > ONE_HOUR)) {
        resetWeight();
    }
    
    if (!lastReset) {
        localStorage.setItem(LAST_WEIGHT_RESET_KEY, now.toString());
    }
}


export function getAccumulatedWeight(): Omit<AircraftWeightInfo, 'totalWeight'> & {passengerCount: number} {
  if (isServer()) return { passengerWeight: 0, baggageWeight: 0, cargoWeight: DEFAULT_CARGO_WEIGHT, passengerCount: 0 };
  
  checkAndResetWeightData();

  const passengerCount = Number(localStorage.getItem(PASSENGER_COUNT_KEY)) || 0;
  const baggageWeight = Number(localStorage.getItem(BAGGAGE_WEIGHT_KEY)) || 0;
  const passengerWeight = passengerCount * AVERAGE_PASSENGER_WEIGHT;
  const cargoWeight = Number(localStorage.getItem(CARGO_WEIGHT_KEY)) || DEFAULT_CARGO_WEIGHT;
  
  return { passengerWeight, baggageWeight, cargoWeight, passengerCount };
}

export function addCheckedInData(baggageWeight: number) {
  if (isServer()) return;

  checkAndResetWeightData();

  const currentCount = Number(localStorage.getItem(PASSENGER_COUNT_KEY)) || 0;
  const currentBaggageWeight = Number(localStorage.getItem(BAGGAGE_WEIGHT_KEY)) || 0;
  
  localStorage.setItem(PASSENGER_COUNT_KEY, String(currentCount + 1));
  localStorage.setItem(BAGGAGE_WEIGHT_KEY, String(currentBaggageWeight + baggageWeight));
}

export function resetWeight() {
  if (isServer()) return;
  localStorage.removeItem(PASSENGER_COUNT_KEY);
  localStorage.removeItem(BAGGAGE_WEIGHT_KEY);
  localStorage.setItem(LAST_WEIGHT_RESET_KEY, new Date().getTime().toString());
  // We can keep cargo weight or reset it as well. For now, let's keep it.
}
