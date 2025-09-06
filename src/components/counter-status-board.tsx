
"use client";

import { useState, useMemo } from "react";
import { counterData as initialCounterData, type Counter } from "@/lib/counter-data";
import { getUniqueFlights } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Plane, User, Edit, Save, X, CheckCircle, XCircle } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "./ui/badge";

export function CounterStatusBoard() {
    const [counters, setCounters] = useState<Counter[]>(initialCounterData);
    const [editingAgent, setEditingAgent] = useState<string | null>(null);
    const [agentName, setAgentName] = useState("");

    const uniqueFlights = useMemo(() => getUniqueFlights(), []);

    const handleStatusChange = (counterId: string, newStatus: boolean) => {
        setCounters(counters.map(c => {
            if (c.id === counterId) {
                const updatedCounter = { ...c, status: newStatus ? 'OPEN' : 'CLOSED' };
                // If closing the counter, clear flight and agent info
                if (!newStatus) {
                    updatedCounter.flight = null;
                    updatedCounter.agent = null;
                }
                return updatedCounter;
            }
            return c;
        }));
    };

    const handleFlightChange = (counterId: string, newFlight: string) => {
        setCounters(counters.map(c => 
            c.id === counterId ? { ...c, flight: newFlight } : c
        ));
    };

    const handleAgentNameChange = (counterId: string) => {
        setCounters(counters.map(c => 
            c.id === counterId ? { ...c, agent: agentName } : c
        ));
        setEditingAgent(null);
        setAgentName("");
    };

    const startEditingAgent = (counterId: string, currentAgentName: string | null) => {
        setEditingAgent(counterId);
        setAgentName(currentAgentName || "");
    };

    const cancelEditing = () => {
        setEditingAgent(null);
        setAgentName("");
    }

    const getStatusClass = (status: Counter['status']) => {
        switch(status) {
            case 'OPEN': return 'bg-green-500/20 text-green-300 border-green-500/50';
            case 'CLOSED': return 'bg-red-500/20 text-red-300 border-red-500/50';
            default: return '';
        }
    }

    return (
        <Card className="h-full flex flex-col bg-card border-border rounded-lg overflow-hidden">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 p-6 border-b">
                <CardTitle className="text-lg font-bold text-primary">Counters Management</CardTitle>
                <Monitor className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {counters.map((counter) => {
                        const isOpen = counter.status === 'OPEN';
                        const isEditingThis = editingAgent === counter.id;
                        return (
                        <Card key={counter.id} className={`bg-secondary/50 transition-all duration-300 ${isOpen ? 'shadow-lg shadow-primary/10' : 'opacity-70'}`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-base font-bold font-mono">{counter.id}</CardTitle>
                                <div className="flex items-center gap-2">
                                     <Label htmlFor={`status-${counter.id}`} className="text-xs text-muted-foreground">
                                        {counter.status}
                                    </Label>
                                    <Switch
                                        id={`status-${counter.id}`}
                                        checked={isOpen}
                                        onCheckedChange={(checked) => handleStatusChange(counter.id, checked)}
                                        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-sm text-muted-foreground"><Plane className="w-4 h-4" /> Flight</Label>
                                    <Select
                                        value={counter.flight || ""}
                                        onValueChange={(value) => handleFlightChange(counter.id, value)}
                                        disabled={!isOpen}
                                    >
                                        <SelectTrigger className="bg-input border-border/50">
                                            <SelectValue placeholder="Assign flight..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="null" disabled>Assign flight...</SelectItem>
                                            {uniqueFlights.map(flight => (
                                                <SelectItem key={flight.flight} value={flight.flight}>
                                                    {flight.flight} - {flight.destinationEn}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-sm text-muted-foreground"><User className="w-4 h-4" /> Agent</Label>
                                    {isEditingThis ? (
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                value={agentName}
                                                onChange={(e) => setAgentName(e.target.value)}
                                                className="bg-input border-primary/50"
                                                autoFocus
                                            />
                                            <Button size="icon" variant="ghost" className="text-green-400 hover:bg-green-900/50 hover:text-green-300" onClick={() => handleAgentNameChange(counter.id)}><Save className="w-4 h-4"/></Button>
                                            <Button size="icon" variant="ghost" className="text-red-400 hover:bg-red-900/50 hover:text-red-300" onClick={cancelEditing}><X className="w-4 h-4"/></Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-input/50 h-10">
                                            <p className="text-sm font-medium truncate">{counter.agent || "Unassigned"}</p>
                                            <Button 
                                                size="icon" 
                                                variant="ghost" 
                                                className="w-6 h-6"
                                                onClick={() => startEditingAgent(counter.id, counter.agent)}
                                                disabled={!isOpen}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </div>
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
