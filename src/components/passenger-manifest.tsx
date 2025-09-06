
"use client";

import { passengerDatabase } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Printer } from 'lucide-react';
import { useMemo, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import type { Passenger } from "@/lib/types";


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
    })).sort((a, b) => a.name.localeCompare(b.name));
}

export function PassengerManifest() {
    const router = useRouter();
    const passengers = useMemo(() => getPassengerList(), []);
    const [selectedPnrs, setSelectedPnrs] = useState<string[]>([]);

    const handleSelect = (pnr: string, checked: boolean) => {
        if (checked) {
            setSelectedPnrs(prev => [...prev, pnr]);
        } else {
            setSelectedPnrs(prev => prev.filter(id => id !== pnr));
        }
    };
    
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedPnrs(passengers.map(p => p.pnr));
        } else {
            setSelectedPnrs([]);
        }
    };

    const handlePrintSelected = () => {
        if (selectedPnrs.length === 0) return;
        const printUrl = `/print-manifest?pnrs=${selectedPnrs.join(',')}`;
        window.open(printUrl, '_blank');
    };
    
    const isAllSelected = selectedPnrs.length > 0 && selectedPnrs.length === passengers.length;

    return (
        <Card className="h-full flex flex-col bg-card border-0 rounded-none overflow-hidden">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 p-6">
                <CardTitle className="text-lg font-bold text-primary">Passenger Manifest</CardTitle>
                <Users className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full">
                     <Table>
                        <TableHeader>
                            <TableRow className="text-[10px] uppercase">
                                <TableHead className="w-12 px-4 py-2">
                                    <Checkbox
                                      checked={isAllSelected}
                                      onCheckedChange={handleSelectAll}
                                      aria-label="Select all"
                                    />
                                </TableHead>
                                <TableHead className="px-6 py-2">Passenger Name</TableHead>
                                <TableHead className="px-6 py-2">PNR</TableHead>
                                <TableHead className="text-right px-6 py-2">Destination</TableHead>
                            </TableRow>
                        </TableHeader>
                         <TableBody className="text-xs">
                            {passengers.map((pax) => (
                                <TableRow key={pax.pnr} className="font-mono">
                                    <TableCell className="px-4 py-2">
                                        <Checkbox
                                          checked={selectedPnrs.includes(pax.pnr)}
                                          onCheckedChange={(checked) => handleSelect(pax.pnr, !!checked)}
                                          aria-label={`Select ${pax.name}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-sans font-medium px-6 py-2 truncate" title={pax.name}>{pax.name}</TableCell>
                                    <TableCell className="font-bold px-6 py-2">{pax.pnr}</TableCell>
                                    <TableCell className="text-right px-6 py-2">{pax.destination.toUpperCase()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t border-border mt-auto justify-end">
                <Button 
                    onClick={handlePrintSelected} 
                    disabled={selectedPnrs.length === 0}
                    className="font-bold"
                >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Selected ({selectedPnrs.length})
                </Button>
            </CardFooter>
        </Card>
    );
}
