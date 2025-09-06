
export type Counter = {
    id: string;
    status: 'OPEN' | 'CLOSED';
    flight: string | null;
    agent: string | null;
};

export const counterData: Counter[] = [
    { id: 'C01', status: 'OPEN', flight: 'SV154', agent: 'IBRAHIM (ID3481)' },
    { id: 'C02', status: 'OPEN', flight: 'SV154', agent: 'FAISAL (ID5029)' },
    { id: 'C03', status: 'OPEN', flight: 'SV287', agent: 'SULAIMAN (ID9811)' },
    { id: 'C04', status: 'CLOSED', flight: null, agent: null },
    { id: 'C05', status: 'OPEN', flight: 'SV412', agent: 'YAZAN (ID6745)' },
    { id: 'C06', status: 'OPEN', flight: 'SV633', agent: 'NOURA (ID1230)' },
    { id: 'C07', status: 'CLOSED', flight: null, agent: null },
    { id: 'C08', status: 'OPEN', flight: 'SV789', agent: 'ASAYIL (ID8852)' },
    { id: 'C09', status: 'OPEN', flight: 'SV445', agent: 'MESHAL (ID2398)' },
    { id: 'C10', status: 'CLOSED', flight: null, agent: null },
    { id: 'C11', status: 'OPEN', flight: 'SV623', agent: 'ABDULRAHMAN (ID4765)' },
    { id: 'C12', status: 'OPEN', flight: 'SV567', agent: 'AMMAR (ID7123)' },
];
