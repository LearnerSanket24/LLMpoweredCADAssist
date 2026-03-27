import { useState } from 'react';

interface TraceEntry {
  time: string;
  tool: string;
  params: string;
  status: 'success' | 'fail' | 'retry' | 'info';
  result: string;
}

const initialEntries: TraceEntry[] = [
  { time: '14:23:01', tool: 'create_gear', params: 'teeth:20, module:2, face_width:20', status: 'success', result: 'model_id: GR_001' },
  { time: '14:23:02', tool: 'get_volume', params: 'model_id:GR_001', status: 'success', result: '4821.3 mm³' },
  { time: '14:23:02', tool: 'get_mass', params: 'model_id:GR_001, material:Steel', status: 'success', result: '0.038 kg' },
  { time: '14:23:03', tool: 'get_surface_area', params: 'model_id:GR_001', status: 'success', result: '2140.6 mm²' },
  { time: '14:23:05', tool: 'modify_dim', params: 'param:face_width, value:30', status: 'success', result: 'model_id: GR_001_v2' },
  { time: '14:23:06', tool: 'check_interference', params: '', status: 'success', result: 'No interference detected' },
];

const selfCorrectionEntries: TraceEntry[] = [
  { time: '14:24:01', tool: 'create_gear', params: 'teeth:5, module:0.3', status: 'fail', result: 'GEOMETRY ERROR: teeth < 8' },
  { time: '14:24:02', tool: 'LLM RETRY', params: '1/3', status: 'info', result: 'adjusting parameters...' },
  { time: '14:24:03', tool: 'create_gear', params: 'teeth:8, module:0.5', status: 'success', result: 'Corrected' },
];

const statusIcon = (s: TraceEntry['status']) => {
  switch (s) {
    case 'success': return <span className="text-success">✓</span>;
    case 'fail': return <span className="text-destructive">✗</span>;
    case 'retry': return <span className="text-warning">⚠</span>;
    case 'info': return <span className="text-warning">⟳</span>;
  }
};

const toolColor = (tool: string) => {
  const colors: Record<string, string> = {
    create_gear: 'bg-accent text-foreground',
    get_volume: 'bg-secondary text-muted-foreground',
    get_mass: 'bg-secondary text-muted-foreground',
    get_surface_area: 'bg-secondary text-muted-foreground',
    modify_dim: 'bg-accent text-foreground',
    check_interference: 'bg-accent text-foreground',
    'LLM RETRY': 'bg-warning/20 text-warning',
  };
  return colors[tool] || 'bg-secondary text-muted-foreground';
};

const MCPTracePanel = () => {
  const [entries, setEntries] = useState(initialEntries);
  const [demoing, setDemoing] = useState(false);

  const runDemo = () => {
    if (demoing) return;
    setDemoing(true);
    selfCorrectionEntries.forEach((entry, i) => {
      setTimeout(() => {
        setEntries((prev) => [...prev, entry]);
        if (i === selfCorrectionEntries.length - 1) setDemoing(false);
      }, (i + 1) * 800);
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="panel-header">MCP Tool Execution Log</h3>
          <span className="flex items-center gap-1 text-xxs text-success">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
            LIVE
          </span>
        </div>
        <button onClick={runDemo} disabled={demoing} className="chip text-xxs">
          ▶ Demo Self-Correction
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 font-mono text-[11px] space-y-1" style={{ background: 'hsl(0 20% 3%)' }}>
        {entries.map((e, i) => (
          <div key={i} className="flex items-start gap-2 py-0.5 animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="text-muted-foreground shrink-0">{e.time}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${toolColor(e.tool)}`}>
              [{e.tool}]
            </span>
            {e.params && <span className="text-muted-foreground">{e.params}</span>}
            <span className="text-muted-foreground">→</span>
            {statusIcon(e.status)}
            <span className={e.status === 'fail' ? 'text-destructive' : 'text-foreground'}>{e.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCPTracePanel;
