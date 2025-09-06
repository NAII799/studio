
"use client";

import { useState, useMemo, useEffect } from "react";
import { counterData as initialCounterData, type Counter } from "@/lib/counter-data";
import { getUniqueFlights } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Monitor, Plane, User, Save } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const COUNTER_STATE_KEY = 'counterState';
const LAST_COUNTER_RESET_KEY = 'lastCounterReset';
const DATA_VERSION_KEY = 'counterDataVersion';
const CURRENT_DATA_VERSION = '1.1'; // Increment this when initialCounterData changes
const ONE_HOUR = 60 * 60 * 1000;

interface CounterStatusBoardProps {
    isInteractive?: boolean;
}

export function CounterStatusBoard({ isInteractive = false }: CounterStatusBoardProps) {
    const [counters, setCounters] = useState<Counter[]>(initialCounterData);
    const [originalCounters, setOriginalCounters] = useState<Counter[]>(initialCounterData);
    const flights = useMemo(() => getUniqueFlights(), []);
    const { toast } = useToast();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const savedState = localStorage.getItem(COUNTER_STATE_KEY);
            const lastReset = localStorage.getItem(LAST_COUNTER_RESET_KEY);
            const savedVersion = localStorage.getItem(DATA_VERSION_KEY);
            const now = new Date().getTime();
            
            let dataToUse = initialCounterData;
            
            const needsReset = !lastReset || (now - parseInt(lastReset) > ONE_HOUR) || savedVersion !== CURRENT_DATA_VERSION;

            if (needsReset) {
                // Time's up or data version is old, reset to initial data
                localStorage.setItem(COUNTER_STATE_KEY, JSON.stringify(initialCounterData));
                localStorage.setItem(LAST_COUNTER_RESET_KEY, now.toString());
                localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
                dataToUse = initialCounterData;
                if (savedVersion !== CURRENT_DATA_VERSION && savedVersion !== null) {
                   toast({ title: "System Update", description: "Counter data has been updated to the latest version." });
                } else if (!lastReset) {
                    // First time load
                }
                else {
                   toast({ title: "System Reset", description: "Counter and check-in data have been reset." });
                }
            } else if (savedState) {
                // Use saved data
                dataToUse = JSON.parse(savedState);
            }
            
            setCounters(dataToUse);
            setOriginalCounters(dataToUse);

        } catch (error) {
            console.error("Failed to process counter state from localStorage", error);
            setCounters(initialCounterData);
            setOriginalCounters(initialCounterData);
        }
    }, [toast]);

    const handleStatusChange = (id: string, isOpen: boolean) => {
        setCounters(prev => prev.map(c => {
            if (c.id === id) {
                // If closing counter, clear flight and agent
                return { 
                    ...c, 
                    status: isOpen ? 'OPEN' : 'CLOSED',
                    flight: isOpen ? c.flight : null,
                    agent: isOpen ? c.agent : null
                };
            }
            return c;
        }));
    };

    const handleFlightChange = (id: string, flight: string) => {
        setCounters(prev => prev.map(c => c.id === id ? { ...c, flight: flight === 'unassigned' ? null : flight } : c));
    };

    const handleAgentChange = (id: string, agent: string) => {
        setCounters(prev => prev.map(c => c.id === id ? { ...c, agent } : c));
    };
    
    const handleSaveChanges = () => {
        localStorage.setItem(COUNTER_STATE_KEY, JSON.stringify(counters));
        setOriginalCounters(counters); // Update original state to reflect saved changes
        toast({
            title: "Changes Saved",
            description: "Counter configurations have been updated successfully.",
        });
    };
    
    const handleCancelChanges = () => {
        setCounters(originalCounters);
         toast({
            variant: "destructive",
            title: "Changes Canceled",
            description: "All modifications have been reverted.",
        });
    };

    const hasChanges = JSON.stringify(counters) !== JSON.stringify(originalCounters);

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
                 {isInteractive && hasChanges && (
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={handleCancelChanges}>Cancel</Button>
                        <Button size="sm" onClick={handleSaveChanges} className="btn-success-gradient"><Save className="mr-2 h-4 w-4" /> Save</Button>
                    </div>
                )}
                {!isInteractive && <Monitor className="h-6 w-6 text-muted-foreground" />}
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-auto">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {counters.map((counter) => {
                        const isOpen = counter.status === 'OPEN';
                        return (
                        <Card key={counter.id} className={`bg-secondary/50 transition-all duration-300 ${isOpen ? 'shadow-md shadow-primary/5' : 'opacity-60'}`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
                                <CardTitle className="text-base font-bold font-mono">{counter.id}</CardTitle>
                                {isInteractive ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">{isOpen ? "Open" : "Closed"}</span>
                                        <Switch
                                            checked={isOpen}
                                            onCheckedChange={(checked) => handleStatusChange(counter.id, checked)}
                                        />
                                    </div>
                                ) : (
                                    <Badge variant="outline" className={`text-[10px] w-20 justify-center ${getStatusClass(counter.status)}`}>
                                        {counter.status}
                                    </Badge>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-3 pt-2 p-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Plane className="w-4 h-4 text-muted-foreground" />
                                    {isInteractive ? (
                                        <Select
                                            value={counter.flight || 'unassigned'}
                                            onValueChange={(value) => handleFlightChange(counter.id, value)}
                                            disabled={!isOpen}
                                        >
                                            <SelectTrigger className="text-xs h-8 bg-input">
                                                <SelectValue placeholder="Select flight..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="unassigned">Unassigned</SelectItem>
                                                {flights.map(f => (
                                                    <SelectItem key={f.flight} value={f.flight}>{f.flight} - {f.destinationEn}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <span className="font-medium truncate">{counter.flight || "Unassigned"}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                     {isInteractive ? (
                                        <Input
                                            type="text"
                                            value={counter.agent || ''}
                                            onChange={(e) => handleAgentChange(counter.id, e.target.value)}
                                            placeholder="Assign agent..."
                                            className="text-xs h-8 bg-input"
                                            disabled={!isOpen}
                                        />
                                     ) : (
                                        <span className="font-medium truncate">{counter.agent || "Unassigned"}</span>
                                     )}
                                </div>
                            </CardContent>
                        </Card>
                    )})}
                </div>
            </CardContent>
        </Card>
    );
}

    