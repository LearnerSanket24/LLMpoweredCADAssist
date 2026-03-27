const checks = [
  { icon: '✓', label: 'Wall Thickness', detail: '6.2 mm — PASS (min 2mm)', status: 'success' as const },
  { icon: '⚠', label: 'Surface Finish', detail: 'Ra 1.6 recommended', status: 'warning' as const },
  { icon: '✓', label: 'Machinability', detail: 'Hobbing process applicable', status: 'success' as const },
  { icon: '✗', label: 'Undercut Check', detail: 'Root fillet too sharp', status: 'danger' as const },
];

const badgeClass = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
};

const statusText = { success: 'PASS', warning: 'WARN', danger: 'FAIL' };

const DFMAnalysis = () => {
  return (
    <div className="glass-card p-3 h-full flex flex-col">
      <h3 className="panel-header mb-2">Design for Manufacturability</h3>
      <div className="space-y-2 flex-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-2 text-xs">
            <span className={c.status === 'success' ? 'text-success' : c.status === 'warning' ? 'text-warning' : 'text-destructive'}>
              {c.icon}
            </span>
            <span className="text-foreground font-medium w-24 shrink-0">{c.label}</span>
            <span className="text-muted-foreground flex-1">{c.detail}</span>
            <span className={badgeClass[c.status]}>{statusText[c.status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DFMAnalysis;
