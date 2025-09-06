
"use client";

import { passengerDatabase } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, Landmark } from 'lucide-react';
import { useState, useEffect } from "react";

type FlightInfo = {
    flight: string;
    destinationEn: string;
    departure: string;
    gate: string;
    status: 'ON TIME' | 'GATE CHANGE' | 'BOARDING' | 'DELAYED';
};

const getUniqueFlights = (): FlightInfo[] => {
    const flightsMap = new Map<string, FlightInfo>();
    Object.values(passengerDatabase).forEach(pax => {
        if (!flightsMap.has(pax.flight)) {
            flightsMap.set(pax.flight, {
                flight: pax.flight,
                destinationEn: pax.destinationEn,
                departure: pax.departure,
                gate: pax.gate,
                status: pax.hasGateChange ? 'GATE CHANGE' : 'ON TIME'
            });
        }
    });

    const flights = Array.from(flightsMap.values());
    
    // Set 3 random flights to DELAYED
    let delayedCount = 0;
    while (delayedCount < 3) {
        const randomIndex = Math.floor(Math.random() * flights.length);
        if (flights[randomIndex].status === 'ON TIME') {
            flights[randomIndex].status = 'DELAYED';
            delayedCount++;
        }
    }

    // Set 2 random flights to BOARDING
    let boardingCount = 0;
    while (boardingCount < 2) {
        const randomIndex = Math.floor(Math.random() * flights.length);
        if (flights[randomIndex].status === 'ON TIME') {
            flights[randomIndex].status = 'BOARDING';
            boardingCount++;
        }
    }

    return flights.sort((a,b) => a.departure.localeCompare(b.departure));
}

export function FlightInfoBoard() {
    const [flights, setFlights] = useState<FlightInfo[]>([]);

    useEffect(() => {
        setFlights(getUniqueFlights());
    }, []);

    const getStatusClass = (status: FlightInfo['status']) => {
        switch(status) {
            case 'ON TIME': return 'bg-green-500/20 text-green-300 border-green-500/50';
            case 'GATE CHANGE': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 animate-pulse';
            case 'BOARDING': return 'bg-blue-500/20 text-blue-300 border-blue-500/50 animate-pulse';
            case 'DELAYED': return 'bg-red-500/20 text-red-300 border-red-500/50';
            default: return '';
        }
    }


    return (
        <Card className="h-full flex flex-col bg-card/50 border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold text-primary">Departures</CardTitle>
                <Plane className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-[10px] uppercase">
                                <TableHead className="px-3 py-2">Flight</TableHead>
                                <TableHead className="px-3 py-2">Destination</TableHead>
                                <TableHead className="text-center px-3 py-2">Time</TableHead>
                                <TableHead className="text-center px-3 py-2">Gate</TableHead>
                                <TableHead className="text-right px-3 py-2">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                         <TableBody className="text-xs">
                            {flights.map((flight) => (
                                <TableRow key={flight.flight} className="font-mono">
                                    <TableCell className="font-bold px-3 py-2">{flight.flight}</TableCell>
                                    <TableCell className="px-3 py-2">{flight.destinationEn.toUpperCase()}</TableCell>
                                    <TableCell className="text-center px-3 py-2">{flight.departure}</TableCell>
                                    <TableCell className="text-center px-3 py-2">{flight.gate}</TableCell>
                                    <TableCell className="text-right px-3 py-2">
                                        <Badge variant="outline" className={`text-[10px] w-24 justify-center ${getStatusClass(flight.status)}`}>
                                           {flight.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
