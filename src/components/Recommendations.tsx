import { toast } from 'sonner';

const recs = [
  { color: 'border-l-warning', text: 'Increase module to 2.5 to reduce tooth stress by ~18%' },
  { color: 'border-l-[hsl(210,60%,50%)]', text: 'Switch to 20CrMnTi Alloy Steel — yield 850 MPa' },
  { color: 'border-l-[hsl(45,80%,50%)]', text: 'Add root fillet radius ≥ 0.3mm to reduce stress concentration' },
  { color: 'border-l-success', text: 'Consider surface hardening (case depth 0.8–1.2mm)' },
];

const exports = ['↓ Export STEP', '↓ Export STL', '📷 Capture Screenshot'];

const Recommendations = () => {
  const handleExport = (label: string) => {
    toast.success(`${label.replace('↓ ', '').replace('📷 ', '')} exported successfully`);
  };

  return (
    <div className="glass-card p-3 h-full flex flex-col">
      <h3 className="panel-header mb-2">✨ AI Recommendations</h3>

      <div className="space-y-2 flex-1">
        {recs.map((r, i) => (
          <div key={i} className={`border-l-2 ${r.color} pl-2.5 py-1.5 bg-secondary/30 rounded-r text-xs text-foreground`}>
            {r.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3 pt-2 border-t border-border">
        {exports.map((e) => (
          <button key={e} onClick={() => handleExport(e)} className="ghost-btn flex-1 text-xxs">
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
