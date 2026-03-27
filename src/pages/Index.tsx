import { useState } from 'react';
import TopNav from '@/components/TopNav';
import ChatPanel from '@/components/ChatPanel';
import MCPTracePanel from '@/components/MCPTracePanel';
import ViewerPanel from '@/components/ViewerPanel';
import ModelSummary from '@/components/ModelSummary';
import StressAnalysis from '@/components/StressAnalysis';
import DFMAnalysis from '@/components/DFMAnalysis';
import Recommendations from '@/components/Recommendations';
import SystemArchitecture from '@/components/SystemArchitecture';
import APITrace from '@/components/APITrace';

const Index = () => {
  const [activeTab, setActiveTab] = useState('CAD Workspace');

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'CAD Workspace' && (
        <div className="flex-1 grid grid-cols-[28%_40%_32%] gap-px bg-border overflow-hidden">
          {/* Left Column */}
          <div className="flex flex-col bg-background animate-slide-up stagger-1" style={{ opacity: 0 }}>
            <div className="h-[60%] border-b border-border">
              <ChatPanel />
            </div>
            <div className="h-[40%]">
              <MCPTracePanel />
            </div>
          </div>

          {/* Center Column */}
          <div className="flex flex-col bg-background gap-px animate-slide-up stagger-2" style={{ opacity: 0 }}>
            <div className="h-[55%]">
              <ViewerPanel />
            </div>
            <div className="h-[45%]">
              <ModelSummary />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col bg-background gap-px animate-slide-up stagger-3" style={{ opacity: 0 }}>
            <div className="h-[35%]">
              <StressAnalysis />
            </div>
            <div className="h-[30%]">
              <DFMAnalysis />
            </div>
            <div className="h-[35%]">
              <Recommendations />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'System Architecture' && (
        <div className="flex-1 overflow-auto">
          <SystemArchitecture />
        </div>
      )}

      {activeTab === 'API Trace' && (
        <div className="flex-1 overflow-hidden">
          <APITrace />
        </div>
      )}
    </div>
  );
};

export default Index;
