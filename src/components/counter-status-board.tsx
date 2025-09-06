
"use client";

import { counterData, type Counter } from "@/lib/counter-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Monitor, CheckCircle, XCircle, Plane } from 'lucide-react';
import { Badge } from "./ui/badge";

const getStatusClass = (status: Counter['status']) => {
    switch(status) {
        case 'OPEN': return 'bg-green-500/20 text-green-300 border-green-500/50';
        case 'CLOSED': return 'bg-red-500/20 text-red-300 border-red-500/50';
        default: return '';
    }
}

export function CounterStatusBoard() {
    return (
        <Card className="h-full flex flex-col bg-card border-0 rounded-none overflow-hidden">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 p-6">
                <CardTitle className="text-lg font-bold text-primary">Counter Status</CardTitle>
                <Monitor className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {counterData.map((counter) => (
                            <Card key={counter.id} className="bg-secondary/50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-bold font-mono">{counter.id}</CardTitle>
                                    <Badge variant="outline" className={`text-xs ${getStatusClass(counter.status)}`}>
                                        {counter.status === 'OPEN' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                                        {counter.status}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    {counter.status === 'OPEN' ? (
                                        <div className="text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2 mt-2">
                                                <Plane className="w-4 h-4 text-primary" />
                                                <span className="font-semibold text-primary">{counter.flight}</span>
                                            </div>
                                            <p className="mt-1">Agent: {counter.agent}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic mt-2">Counter is currently closed.</p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
