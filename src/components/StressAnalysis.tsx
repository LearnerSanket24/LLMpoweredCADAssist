const SafetyGauge = ({ value }: { value: number }) => {
  const angle = Math.min(Math.max((value - 0.5) / 2.5, 0), 1) * 180;
  const r = 40;
  const cx = 50;
  const cy = 50;

  const arcPath = (startAngle: number, endAngle: number) => {
    const s = (startAngle - 90) * (Math.PI / 180);
    const e = (endAngle - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const needleAngle = (angle - 90) * (Math.PI / 180);
  const nx = cx + (r - 8) * Math.cos(needleAngle);
  const ny = cy + (r - 8) * Math.sin(needleAngle);

  return (
    <svg viewBox="0 0 100 60" width="120" height="72">
      <path d={arcPath(0, 60)} fill="none" stroke="hsl(145 50% 42%)" strokeWidth="6" strokeLinecap="round" />
      <path d={arcPath(60, 120)} fill="none" stroke="hsl(28 80% 52%)" strokeWidth="6" strokeLinecap="round" />
      <path d={arcPath(120, 180)} fill="none" stroke="hsl(4 64% 46%)" strokeWidth="6" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="hsl(0 1% 82%)" strokeWidth="2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="3" fill="hsl(0 1% 82%)" />
      <text x={cx} y={cy + 14} textAnchor="middle" fill="hsl(28 80% 52%)" fontSize="10" fontWeight="bold" fontFamily="Inter">
        {value.toFixed(2)}
      </text>
    </svg>
  );
};

const metrics = [
  { label: 'Tooth Root Stress', value: '380 MPa', pct: 90, color: 'bg-warning' },
  { label: 'Yield Strength', value: '420 MPa', pct: 100, color: 'bg-destructive' },
  { label: 'Tangential Force', value: '1,850 N', pct: 60, color: 'bg-accent' },
  { label: 'Lewis Form Factor', value: '0.308', pct: 30, color: 'bg-accent' },
];

const StressAnalysis = () => {
  return (
    <div className="glass-card p-3 h-full flex flex-col">
      <div className="mb-2">
        <h3 className="panel-header">Stress Analysis</h3>
        <p className="panel-subtitle">Lewis Bending Stress Formula</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="badge-warning text-sm font-bold px-4 py-1">⚠ WARNING</span>
        <SafetyGauge value={1.10} />
      </div>

      <div className="space-y-2 flex-1">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-0.5">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-medium text-foreground">{m.value}</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
        <div className="flex justify-between text-xs mt-1">
          <span className="text-muted-foreground">Safety Factor</span>
          <span className="font-bold text-warning">1.10</span>
        </div>
      </div>
    </div>
  );
};

export default StressAnalysis;
