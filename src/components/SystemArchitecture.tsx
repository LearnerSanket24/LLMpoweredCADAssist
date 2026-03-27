const layers = [
  { icon: '💬', title: 'USER INPUT', subtitle: 'Natural Language Description', detail: 'e.g., Create a gear with 20 teeth', arrow: 'Free-form text' },
  { icon: '🧠', title: 'LLM (CLAUDE / GPT-4)', subtitle: 'Intent Parser & Planner', detail: 'Parameter extraction · Assumption resolution · Tool call planning · Self-correction loop', arrow: 'Ordered MCP tool calls (JSON)', badge: 'FR-LLM-01 to FR-LLM-05' },
  { icon: '⚙️', title: 'MCP SERVER', subtitle: 'Tool Dispatcher', detail: 'create_gear · modify_dim · get_mass · check_interference', arrow: 'Validated API calls' },
  { icon: '🔷', title: 'EYESHOT CAD ENGINE', subtitle: 'Solid Modelling & Geometry', detail: 'Parametric solids · Mesh generation · Mass properties · STEP/STL export', arrow: 'Geometry data + query results' },
  { icon: '📊', title: 'SMART CAD ASSISTANT', subtitle: 'Engineering Analysis', detail: 'Lewis stress formula · DFM checks · Material recommendations · Geometry validation', arrow: null },
];

const SystemArchitecture = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 overflow-auto">
      <h2 className="text-lg font-bold text-foreground mb-8">System Architecture</h2>

      <div className="relative flex flex-col items-center gap-2 w-full max-w-3xl">
        {layers.map((l, i) => (
          <div key={i} className="w-full animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="glass-card p-4 flex items-start gap-4">
              <span className="text-2xl">{l.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-foreground">{l.title}</h3>
                  {l.badge && (
                    <span className="chip text-xxs">{l.badge}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-medium">{l.subtitle}</p>
                <p className="text-xxs text-muted-foreground mt-1">{l.detail}</p>
              </div>
            </div>

            {l.arrow && (
              <div className="flex flex-col items-center py-1">
                <svg width="2" height="20" className="animate-dash-flow">
                  <line x1="1" y1="0" x2="1" y2="20" stroke="hsl(0 9% 33%)" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <span className="text-xxs text-muted-foreground italic">{l.arrow}</span>
                <svg width="2" height="10">
                  <line x1="1" y1="0" x2="1" y2="10" stroke="hsl(0 9% 33%)" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* Final output */}
        <div className="glass-card-alt p-3 mt-2 text-center">
          <span className="text-xs text-foreground font-medium">3D Model + Engineering Report → User</span>
        </div>

        {/* Self-correction annotation */}
        <div className="absolute -right-4 top-[25%] w-40">
          <div className="glass-card-alt p-2 text-xxs text-muted-foreground border-l-2 border-l-warning">
            ⟳ Geometry Error → LLM Replans
            <br />
            <span className="text-xxs italic">Self-correction loop from MCP back to LLM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
