import { useState } from 'react';

const traceData = [
  {
    label: 'create_gear',
    request: {
      method: 'tools/call',
      params: {
        name: 'create_gear',
        arguments: { teeth: 20, module: 2.0, face_width: 20, pressure_angle: 20, bore_diameter: 10, material: 'Steel_AISI_1045' }
      }
    },
    response: {
      content: [{ type: 'text', text: JSON.stringify({ model_id: 'GR_001', vertices: 2840, faces: 1420, status: 'success' }, null, 2) }]
    },
  },
  {
    label: 'get_mass',
    request: {
      method: 'tools/call',
      params: { name: 'get_mass', arguments: { model_id: 'GR_001', material: 'Steel_AISI_1045' } }
    },
    response: {
      content: [{ type: 'text', text: JSON.stringify({ mass_kg: 0.038, volume_mm3: 4821.3, density: 7850 }, null, 2) }]
    },
  },
  {
    label: 'modify_dim',
    request: {
      method: 'tools/call',
      params: { name: 'modify_dim', arguments: { model_id: 'GR_001', parameter: 'face_width', value: 30 } }
    },
    response: {
      content: [{ type: 'text', text: JSON.stringify({ model_id: 'GR_001_v2', modified: true, new_mass_kg: 0.057, new_volume_mm3: 7231.9 }, null, 2) }]
    },
  },
];

const syntaxHighlight = (json: string) => {
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = 'text-warning'; // number
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'text-destructive' : 'text-success';
      } else if (/true|false/.test(match)) {
        cls = 'text-[hsl(210,60%,60%)]';
      } else if (/null/.test(match)) {
        cls = 'text-muted-foreground';
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
};

const APITrace = () => {
  const [traces, setTraces] = useState(traceData);

  return (
    <div className="h-full flex flex-col" style={{ background: 'hsl(0 20% 3%)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <h2 className="panel-header">API Trace Log</h2>
        <button onClick={() => setTraces([])} className="ghost-btn text-xxs">Clear Trace</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-6">
        {traces.map((t, i) => (
          <div key={i} className="space-y-2 animate-slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="flex items-center gap-2">
              <span className="chip">{t.label}</span>
              <span className="text-muted-foreground text-xxs">REQUEST →</span>
            </div>
            <pre
              className="p-3 rounded bg-card/50 border border-border overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(t.request, null, 2)) }}
            />
            <span className="text-muted-foreground text-xxs">← RESPONSE</span>
            <pre
              className="p-3 rounded bg-card/50 border border-border overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(t.response, null, 2)) }}
            />
          </div>
        ))}
        {traces.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Trace cleared</div>
        )}
      </div>
    </div>
  );
};

export default APITrace;
