const params = [
  { label: 'Component Type', value: 'Spur Gear' },
  { label: 'Teeth', value: '20' },
  { label: 'Module', value: '2.0' },
  { label: 'Face Width', value: '30 mm', updated: true },
  { label: 'Pressure Angle', value: '20°' },
  { label: 'Bore Diameter', value: '10 mm' },
  { label: 'Material', value: 'Steel (default)' },
];

const massProps = [
  { label: 'Volume', value: '7231.9 mm³' },
  { label: 'Mass', value: '0.057 kg' },
  { label: 'Surface', value: '3210.4 mm²' },
  { label: 'Model ID', value: 'GR_001_v2' },
];

const assumptions = [
  'Material defaulted to Steel (AISI 1045)',
  'Pressure angle set to 20° (standard)',
  'Bore diameter estimated from shaft fit',
];

const ModelSummary = () => {
  return (
    <div className="flex flex-col h-full glass-card overflow-hidden">
      <div className="flex-1 grid grid-cols-2 gap-0 overflow-auto">
        {/* Extracted Parameters */}
        <div className="p-3 border-r border-border">
          <h4 className="panel-header mb-2">Extracted Parameters</h4>
          <div className="space-y-1.5">
            {params.map((p) => (
              <div key={p.label} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{p.label}</span>
                <span className={`font-medium ${p.updated ? 'text-warning' : 'text-foreground'}`}>
                  {p.value}
                  {p.updated && <span className="ml-1 text-xxs text-warning">↑ Updated</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mass Properties */}
        <div className="p-3">
          <h4 className="panel-header mb-2">Mass Properties</h4>
          <div className="space-y-1.5">
            {massProps.map((p) => (
              <div key={p.label} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="font-medium text-foreground">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assumptions */}
      <div className="px-3 py-2 border-t border-border">
        <h4 className="text-xxs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">LLM Assumptions</h4>
        <div className="flex flex-wrap gap-1.5">
          {assumptions.map((a, i) => (
            <span key={i} className="chip text-xxs">⚬ {a}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelSummary;
