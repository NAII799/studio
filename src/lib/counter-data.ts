
export type Counter = {
    id: string;
    status: 'OPEN' | 'CLOSED';
    flight: string | null;
    agent: string | null;
};

export const counterData: Counter[] = [
    { id: 'C01', status: 'OPEN', flight: 'SV154', agent: 'Ali Al-Harbi' },
    { id: 'C02', status: 'OPEN', flight: 'SV154', agent: 'Bandar Al-Qizayz' },
    { id: 'C03', status: 'OPEN', flight: 'SV287', agent: 'Fawzi Milibari' },
    { id: 'C04', status: 'CLOSED', flight: null, agent: null },
    { id: 'C05', status: 'OPEN', flight: 'SV412', agent: 'Ghazi Mugharbel' },
    { id: 'C06', status: 'OPEN', flight: 'SV633', agent: 'Rami Temraz' },
    { id: 'C07', status: 'CLOSED', flight: null, agent: null },
    { id: 'C08', status: 'OPEN', flight: 'SV789', agent: 'Sultan Aldosari' },
    { id: 'C09', status: 'OPEN', flight: 'SV445', agent: 'Turki Basamad' },
    { id: 'C10', status: 'CLOSED', flight: null, agent: null },
    { id: 'C11', status: 'OPEN', flight: 'SV623', agent: 'Yahya Al-Johani' },
    { id: 'C12', status: 'OPEN', flight: 'SV567', agent: 'Naif Alharbi' },
];
