const GearSVG = ({ className = '' }: { className?: string }) => {
  const teeth = 20;
  const outerR = 80;
  const innerR = 65;
  const boreR = 12;
  const cx = 100;
  const cy = 100;

  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
    const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
    const a4 = ((i + 0.7) / teeth) * Math.PI * 2;

    points.push(`${cx + innerR * Math.cos(a1)},${cy + innerR * Math.sin(a1)}`);
    points.push(`${cx + outerR * Math.cos(a2)},${cy + outerR * Math.sin(a2)}`);
    points.push(`${cx + outerR * Math.cos(a3)},${cy + outerR * Math.sin(a3)}`);
    points.push(`${cx + innerR * Math.cos(a4)},${cy + innerR * Math.sin(a4)}`);
  }

  return (
    <svg viewBox="0 0 200 200" className={className} width="160" height="160">
      <polygon
        points={points.join(' ')}
        fill="none"
        stroke="hsl(0 12% 56%)"
        strokeWidth="1.5"
      />
      <circle cx={cx} cy={cy} r={innerR - 8} fill="none" stroke="hsl(0 9% 33%)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={boreR} fill="none" stroke="hsl(0 12% 56%)" strokeWidth="1.5" />
      <line x1={cx} y1={cy - boreR} x2={cx} y2={cy + boreR} stroke="hsl(0 9% 33%)" strokeWidth="0.5" />
      <line x1={cx - boreR} y1={cy} x2={cx + boreR} y2={cy} stroke="hsl(0 9% 33%)" strokeWidth="0.5" />
    </svg>
  );
};

export default GearSVG;
