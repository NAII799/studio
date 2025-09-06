
"use client";

import { useState, useMemo, useEffect } from "react";
import { counterData as initialCounterData, type Counter } from "@/lib/counter-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Plane, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const COUNTER_STATE_KEY = 'counterState';
const LAST_COUNTER_RESET_KEY = 'lastCounterReset';
const ONE_HOUR = 60 * 60 * 1000;

export function CounterStatusBoard() {
    const [counters, setCounters] = useState<Counter[]>(initialCounterData);

     useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const savedState = localStorage.getItem(COUNTER_STATE_KEY);
            const lastReset = localStorage.getItem(LAST_COUNTER_RESET_KEY);
            const now = new Date().getTime();

            if (lastReset && (now - parseInt(lastReset) > ONE_HOUR)) {
                localStorage.setItem(COUNTER_STATE_KEY, JSON.stringify(initialCounterData));
                setCounters(initialCounterData);
                localStorage.setItem(LAST_COUNTER_RESET_KEY, now.toString());
            } else if (savedState) {
                setCounters(JSON.parse(savedState));
            }

            if (!lastReset) {
                localStorage.setItem(LAST_COUNTER_RESET_KEY, now.toString());
            }
        } catch (error) {
            console.error("Failed to process counter state from localStorage", error);
            setCounters(initialCounterData);
        }
    }, []);


    const getStatusClass = (status: Counter['status']) => {
        switch(status) {
            case 'OPEN': return 'bg-green-500/20 text-green-300 border-green-500/50';
            case 'CLOSED': return 'bg-red-500/20 text-red-300 border-red-500/50';
            default: return '';
        }
    }

    return (
        <Card className="h-full flex flex-col bg-card/50 border-border/50 overflow-hidden">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 p-6 border-b">
                <CardTitle className="text-lg font-bold text-primary">Counters Status</CardTitle>
                <Monitor className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-auto">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {counters.map((counter) => {
                        const isOpen = counter.status === 'OPEN';
                        return (
                        <Card key={counter.id} className={`bg-secondary/50 transition-all duration-300 ${isOpen ? 'shadow-md shadow-primary/5' : 'opacity-60'}`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
                                <CardTitle className="text-base font-bold font-mono">{counter.id}</CardTitle>
                                <Badge variant="outline" className={`text-[10px] w-20 justify-center ${getStatusClass(counter.status)}`}>
                                    {counter.status}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-2 p-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Plane className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium truncate">{counter.flight || "Unassigned"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                     <span className="font-medium truncate">{counter.agent || "Unassigned"}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )})}
                </div>
            </CardContent>
        </Card>
    );
}
