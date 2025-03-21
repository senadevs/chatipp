import { ReactNode } from 'react';

export type ChatMode = 'chat' | 'agent';
export type AIModel = 'gpt-4' | 'gpt-3.5-turbo' | 'gemini-pro' | 'claude-3' | 'mistral-large' | 'mixtral-8x7b';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachments?: Array<{
    type: 'image' | 'pdf' | 'video' | 'audio';
    url: string;
    name: string;
  }>;
}

export interface ChatProps {
  isPublic?: boolean;
}

export interface CodeBlockProps {
  language: string;
  children: string;
}

export interface FilePreviewProps {
  file: File;
  type: string;
}

export interface MessageAttachmentProps {
  attachment: {
    type: string;
    url: string;
    name: string;
  };
}

export interface MessageProps {
  message: Message;
  isSelected: boolean;
}

export interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelSelect: (model: AIModel) => void;
}

export interface ModeSwitchProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
  isPublic: boolean;
}