
export type Counter = {
    id: string;
    status: 'OPEN' | 'CLOSED';
    flight: string | null;
    agent: string | null;
};

export const counterData: Counter[] = [
    { id: 'C01', status: 'OPEN', flight: 'SV154', agent: 'IBRAHIM' },
    { id: 'C02', status: 'OPEN', flight: 'SV154', agent: 'FAISAL' },
    { id: 'C03', status: 'OPEN', flight: 'SV287', agent: 'SULAIMAN' },
    { id: 'C04', status: 'CLOSED', flight: null, agent: null },
    { id: 'C05', status: 'OPEN', flight: 'SV412', agent: 'YAZAN' },
    { id: 'C06', status: 'OPEN', flight: 'SV633', agent: 'NOURA' },
    { id: 'C07', status: 'CLOSED', flight: null, agent: null },
    { id: 'C08', status: 'OPEN', flight: 'SV789', agent: 'ASAYIL' },
    { id: 'C09', status: 'OPEN', flight: 'SV445', agent: 'MESHAL' },
    { id: 'C10', status: 'CLOSED', flight: null, agent: null },
    { id: 'C11', status: 'OPEN', flight: 'SV623', agent: 'ABDULRAHMAN' },
    { id: 'C12', status: 'OPEN', flight: 'SV567', agent: 'AMMAR' },
];
