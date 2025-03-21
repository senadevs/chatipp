import { cn } from '../../lib/utils';
import { Bot, MessageSquare } from 'lucide-react';
import type { ModeSwitchProps } from './types';

export function ModeSwitch({ mode, onModeChange }: ModeSwitchProps) {
  return (
    <div className="relative inline-flex h-9 rounded-full border bg-muted p-1 hover:bg-muted/80">
      <button
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full px-3 text-sm transition-colors",
          mode === 'chat' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
        )}
        onClick={() => onModeChange('chat')}
      >
        <MessageSquare className="h-4 w-4" />
      </button>
      <button
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full px-3 text-sm transition-colors",
          mode === 'agent' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
        )}
        onClick={() => onModeChange('agent')}
      >
        <Bot className="h-4 w-4" />
      </button>
    </div>
  );
}