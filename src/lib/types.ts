export interface Passenger {
  name: string;
  nameEn: string;
  flight: string;
  origin: string;
  originEn: string;
  destination: string;
  destinationEn: string;
  gate: string;
  seat: string;
  departure: string;
  arrival: string;
  terminal: string;
  class: string;
  classEn: string;
  baggageAllowance: { count: number; weight: number };
  checkedBags?: number;
  totalBaggageWeight?: number;
  specialAssistance?: 'wheelchair' | 'none';
  hasGateChange?: boolean;
}

export type PassengerData = {
  [bookingRef: string]: Omit<Passenger, 'checkedBags' | 'totalBaggageWeight'>;
};

export type CheckedInPassenger = Passenger & {
    bookingRef: string;
    checkedBags: number;
    totalBaggageWeight: number;
    finalGate?: string;
}

export type AircraftWeightInfo = {
  passengerWeight: number;
  baggageWeight: number;
  cargoWeight: number;
  totalWeight: number;
}
