import { RotateCcw, ZoomIn, Maximize } from 'lucide-react';
import GearSVG from './GearSVG';

const ViewerPanel = () => {
  return (
    <div className="flex flex-col h-full glass-card overflow-hidden">
      <div className="relative flex-1 flex items-center justify-center" style={{ background: 'hsl(0 0% 0%)' }}>
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(0 12% 9% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(0 12% 9% / 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Gear */}
        <div className="animate-spin-slow">
          <GearSVG />
        </div>

        {/* Top-left badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded text-xxs font-mono bg-secondary/60 text-foreground border border-border">
            GR_001_v2
          </span>
        </div>

        {/* Top-right controls */}
        <div className="absolute top-3 right-3 flex gap-1">
          {[RotateCcw, ZoomIn, Maximize].map((Icon, i) => (
            <button key={i} className="ghost-btn p-1.5">
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        {/* Axes indicator */}
        <div className="absolute bottom-3 left-3">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <line x1="5" y1="35" x2="35" y2="35" stroke="#c0392b" strokeWidth="1.5" />
            <line x1="5" y1="35" x2="5" y2="5" stroke="#27ae60" strokeWidth="1.5" />
            <line x1="5" y1="35" x2="20" y2="20" stroke="#3498db" strokeWidth="1.5" />
            <text x="36" y="37" fill="#c0392b" fontSize="8" fontFamily="monospace">X</text>
            <text x="2" y="4" fill="#27ae60" fontSize="8" fontFamily="monospace">Y</text>
            <text x="21" y="18" fill="#3498db" fontSize="8" fontFamily="monospace">Z</text>
          </svg>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-card/80 border-t border-border flex items-center gap-3 text-xxs text-muted-foreground font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            Model Generated Successfully
          </span>
          <span>Verts: 2,840</span>
          <span>Faces: 1,420</span>
        </div>
      </div>
    </div>
  );
};

export default ViewerPanel;
