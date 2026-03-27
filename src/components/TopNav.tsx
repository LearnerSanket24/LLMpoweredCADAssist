import { Settings } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TopNav = ({ activeTab, onTabChange }: TopNavProps) => {
  const tabs = ['CAD Workspace', 'System Architecture', 'API Trace'];

  return (
    <nav className="h-[52px] flex items-center justify-between px-4 border-b border-border bg-card/60" style={{ backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-bold text-foreground tracking-tight">SchemaSense AI</span>
      </div>

      <div className="flex items-center gap-1 bg-secondary/40 rounded-md p-0.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
          <span className="text-[11px] text-muted-foreground">LLM Connected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
          <span className="text-[11px] text-muted-foreground">MCP Server Online</span>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
