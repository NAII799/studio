
"use client";

import { passengerDatabase } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from 'lucide-react';
import { useState, useMemo } from "react";

type PassengerInfo = {
    pnr: string;
    name: string;
    destination: string;
};

const getPassengerList = (): PassengerInfo[] => {
    return Object.entries(passengerDatabase).map(([pnr, pax]) => ({
        pnr: pnr,
        name: pax.nameEn,
        destination: pax.destinationEn,
    }));
}

export function PassengerManifest() {
    const passengers = useMemo(() => getPassengerList(), []);

    return (
        <Card className="h-full flex flex-col bg-card/50 border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold text-primary">Passenger Manifest</CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-[10px] uppercase">
                                <TableHead className="px-3 py-2">Passenger Name</TableHead>
                                <TableHead className="px-3 py-2">PNR</TableHead>
                                <TableHead className="text-right px-3 py-2">Destination</TableHead>
                            </TableRow>
                        </TableHeader>
                         <TableBody className="text-xs">
                            {passengers.map((pax) => (
                                <TableRow key={pax.pnr} className="font-mono">
                                    <TableCell className="font-sans font-medium px-3 py-2 truncate" title={pax.name}>{pax.name}</TableCell>
                                    <TableCell className="font-bold px-3 py-2">{pax.pnr}</TableCell>
                                    <TableCell className="text-right px-3 py-2">{pax.destination.toUpperCase()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
