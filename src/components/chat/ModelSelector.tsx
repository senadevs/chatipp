import { cn } from '../../lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../components/ui/hover-card';
import type { ModelSelectorProps } from './types';

const AI_MODELS = [
  { 
    value: 'gpt-4',
    label: 'GPT-4',
    description: 'Most capable model, best for complex tasks',
    icon: '✨'
  },
  { 
    value: 'gpt-3.5-turbo',
    label: 'GPT-3.5',
    description: 'Fast and efficient for most tasks',
    icon: '⚡'
  },
  { 
    value: 'gemini-pro',
    label: 'Gemini',
    description: "Google's most advanced AI model",
    icon: '🌟'
  },
  { 
    value: 'claude-3',
    label: 'Claude 3',
    description: 'Exceptional at analysis and writing',
    icon: '🎯'
  },
  { 
    value: 'mistral-large',
    label: 'Mistral',
    description: 'Open-source model with strong capabilities',
    icon: '🚀'
  },
  { 
    value: 'mixtral-8x7b',
    label: 'Mixtral',
    description: 'Powerful open-source mixture of experts',
    icon: '🔮'
  }
];

export function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {AI_MODELS.map((model) => (
        <HoverCard key={model.value}>
          <HoverCardTrigger asChild>
            <button
              onClick={() => onModelSelect(model.value as any)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm transition-colors",
                selectedModel === model.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <span className="mr-1">{model.icon}</span>
              {model.label}
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{model.label}</h4>
                <p className="text-sm text-muted-foreground">
                  {model.description}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}