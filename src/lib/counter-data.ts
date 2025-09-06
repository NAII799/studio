
export type Counter = {
    id: string;
    status: 'OPEN' | 'CLOSED';
    flight: string | null;
    agent: string | null;
};

export const counterData: Counter[] = [
    { id: 'C01', status: 'OPEN', flight: 'SV154', agent: 'Saleh Al-Ghamdi' },
    { id: 'C02', status: 'OPEN', flight: 'SV154', agent: 'Abdullah Al-Qahtani' },
    { id: 'C03', status: 'OPEN', flight: 'SV287', agent: 'Mohammed Al-Zahrani' },
    { id: 'C04', status: 'CLOSED', flight: null, agent: null },
    { id: 'C05', status: 'OPEN', flight: 'SV412', agent: 'Fahad Al-Mutairi' },
    { id: 'C06', status: 'OPEN', flight: 'SV633', agent: 'Khaled Al-Harbi' },
    { id: 'C07', status: 'CLOSED', flight: null, agent: null },
    { id: 'C08', status: 'OPEN', flight: 'SV789', agent: 'Saad Al-Shehri' },
    { id: 'C09', status: 'OPEN', flight: 'SV445', agent: 'Youssef Al-Maliki' },
    { id: 'C10', status: 'CLOSED', flight: null, agent: null },
    { id: 'C11', status: 'OPEN', flight: 'SV623', agent: 'Omar Al-Juhani' },
    { id: 'C12', status: 'OPEN', flight: 'SV567', agent: 'Naif Alharbi' },
];
