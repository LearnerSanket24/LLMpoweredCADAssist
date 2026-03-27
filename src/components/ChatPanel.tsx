import { useState } from 'react';
import { Send } from 'lucide-react';

const initialMessages = [
  {
    role: 'user' as const,
    content: 'Create a spur gear with 20 teeth, module 2, face width 20mm',
  },
  {
    role: 'ai' as const,
    content: `**Parameter Extraction Complete**

| Parameter | Value | Source |
|-----------|-------|--------|
| Type | Spur Gear | Explicit |
| Teeth | 20 | Explicit |
| Module | 2.0 | Explicit |
| Face Width | 20 mm | Explicit |
| Pressure Angle | 20° | Default |
| Material | Steel AISI 1045 | Default |

→ Calling \`create_gear\` with extracted params...
✓ Model **GR_001** generated successfully.`,
  },
  {
    role: 'user' as const,
    content: 'Increase face width to 30mm',
  },
];

const quickCommands = ['Create Gear', 'Create Shaft', 'Add Fillet', 'Run DFM Check'];

const ChatPanel = () => {
  const [messages] = useState(initialMessages);
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-border">
        <h3 className="panel-header">Natural Language Input</h3>
        <p className="panel-subtitle">Describe any mechanical component</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ background: 'hsl(0 20% 3%)' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-accent text-foreground rounded-br-sm'
                  : 'bg-card border-l-[3px] border-muted-foreground text-foreground'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans text-xs">{msg.content}</pre>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-border">
        <div className="flex gap-2">
          <input
            className="glass-input flex-1 px-3 py-2 text-xs"
            placeholder="Describe a component or modify existing..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="ghost-btn px-2">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {quickCommands.map((cmd) => (
            <span key={cmd} className="chip">{cmd}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
