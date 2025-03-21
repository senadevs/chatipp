import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send, Copy, Check, Menu, X, Paperclip, Image, FileText, Film, Music, ChevronRight, ChevronLeft, Bot, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlight, themes } from 'prism-react-renderer';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../lib/auth';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";

interface ChatProps {
  isPublic?: boolean;
}

interface Message {
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

type ChatMode = 'chat' | 'agent';
type AIModel = 'gpt-4' | 'gpt-3.5-turbo' | 'gemini-pro' | 'claude-3' | 'mistral-large' | 'mixtral-8x7b';

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

const CodeBlock = ({ language, children }: { language: string; children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <Highlight
        theme={themes.nightOwl}
        code={children.trim()}
        language={language || 'text'}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto p-4 rounded-lg" style={{
            ...style,
            backgroundColor: 'var(--code-bg)',
            marginTop: '1rem',
            marginBottom: '1rem'
          }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: 'var(--code-meta)', fontSize: '0.875rem' }}>
                {language}
              </span>
            </div>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} style={{ display: 'table-row' }}>
                <span style={{ 
                  display: 'table-cell',
                  paddingRight: '1rem',
                  color: 'var(--code-line-number)',
                  userSelect: 'none',
                  width: '1%',
                  whiteSpace: 'nowrap'
                }}>
                  {i + 1}
                </span>
                <span style={{ display: 'table-cell' }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

const FilePreview = ({ file, type }: { file: File; type: string }) => {
  const icon = {
    'image': <Image className="h-5 w-5" />,
    'application/pdf': <FileText className="h-5 w-5" />,
    'video': <Film className="h-5 w-5" />,
    'audio': <Music className="h-5 w-5" />
  }[type.split('/')[0]] || <Paperclip className="h-5 w-5" />;

  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
      {icon}
      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
    </div>
  );
};

const MessageAttachment = ({ attachment }) => {
  switch (attachment.type) {
    case 'image':
      return (
        <div className="mt-2 rounded-lg overflow-hidden max-w-sm">
          <img src={attachment.url} alt="attachment" className="w-full h-auto" />
        </div>
      );
    case 'pdf':
      return (
        <div className="mt-2">
          <a 
            href={attachment.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span className="text-sm">{attachment.name}</span>
          </a>
        </div>
      );
    case 'video':
      return (
        <div className="mt-2 max-w-sm">
          <video controls className="w-full rounded-lg">
            <source src={attachment.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    case 'audio':
      return (
        <div className="mt-2">
          <audio controls className="w-full">
            <source src={attachment.url} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    default:
      return null;
  }
};

export default function Chat({ isPublic = false }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<ChatMode>('chat');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gpt-4');

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to send files",
        variant: "destructive"
      });
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    
    if (totalSize > 50 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Total file size cannot exceed 50MB",
        variant: "destructive"
      });
      return;
    }

    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    const formData = new FormData();
    formData.append('message', input.trim());
    formData.append('mode', chatMode);
    formData.append('model', selectedModel);
    if (isAuthenticated) {
      files.forEach(file => formData.append('files', file));
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date(),
      attachments: isAuthenticated ? files.map(file => ({
        type: file.type.split('/')[0] as 'image' | 'pdf' | 'video' | 'audio',
        url: URL.createObjectURL(file),
        name: file.name
      })) : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setFiles([]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'Lo siento, hubo un error en la respuesta.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, hubo un error en la conexión.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageElement.classList.add('bg-accent/50');
      setTimeout(() => {
        messageElement.classList.remove('bg-accent/50');
      }, 2000);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] w-full flex bg-background relative rounded-lg border">
      <div
        className={cn(
          "bg-card border-r border-border transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-12" : "w-64",
          "relative h-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <h2 className={cn("font-semibold text-sm", sidebarCollapsed && "hidden")}>
              Chat History
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {messages.map((msg) => (
                <Button
                  key={msg.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left p-2 h-auto",
                    sidebarCollapsed && "hidden",
                    selectedMessageId === msg.id && "bg-accent"
                  )}
                  onClick={() => scrollToMessage(msg.id)}
                >
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="text-xs font-medium">
                        {msg.sender === 'user' ? 'You' : 'Bot'}
                      </span>
                    </div>
                    <p className="text-sm truncate">
                      {msg.content.substring(0, 30)}
                      {msg.content.length > 30 && '...'}
                    </p>
                  </div>
                </Button>
              ))}
              {messages.length === 0 && (
                <p className={cn("text-sm text-muted-foreground p-2", sidebarCollapsed && "hidden")}>
                  No messages yet
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 px-4">
          <div className="max-w-3xl mx-auto py-4 space-y-6">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground">
                <p className="text-lg">Welcome to the chat!</p>
                <p className="text-sm">Start a conversation by sending a message.</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                id={`message-${message.id}`}
                className={cn(
                  "flex w-full transition-colors duration-300 rounded-lg p-2",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[90%] transition-all",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.sender === 'bot' ? (
                    <div className="markdown-content">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code: ({ node, inline, className, children, ...props }) => {
                            if (inline) {
                              return (
                                <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm" {...props}>
                                  {children}
                                </code>
                              );
                            }
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : 'text';
                            return (
                              <CodeBlock language={language}>
                                {String(children).replace(/\n$/, '')}
                              </CodeBlock>
                            );
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm break-words">{message.content}</p>
                      {message.attachments?.map((attachment, index) => (
                        <MessageAttachment key={index} attachment={attachment} />
                      ))}
                    </>
                  )}
                  <span className="text-xs opacity-50 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-3xl mx-auto space-y-4">
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <FilePreview key={index} file={file} type={file.type} />
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-2">
              {/* Custom Switch */}
              <div className="relative inline-flex h-9 rounded-full border bg-muted p-1 hover:bg-muted/80">
                <button
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-3 text-sm transition-colors",
                    chatMode === 'chat' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  )}
                  onClick={() => setChatMode('chat')}
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-3 text-sm transition-colors",
                    chatMode === 'agent' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  )}
                  onClick={() => setChatMode('agent')}
                >
                  <Bot className="h-4 w-4" />
                </button>
              </div>

              {/* Model Selector */}
              <div className="flex flex-wrap gap-2">
                {AI_MODELS.map((model) => (
                  <HoverCard key={model.value}>
                    <HoverCardTrigger asChild>
                      <button
                        onClick={() => setSelectedModel(model.value as AIModel)}
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
            </div>

            <div className="flex gap-2">
              <Input
                placeholder={isPublic ? "Send a message as guest..." : "Type a message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              {!isPublic && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    accept="image/*,application/pdf,video/*,audio/*"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isPublic && (
              <p className="text-xs text-muted-foreground text-center">
                <a href="/login" className="text-primary hover:underline">
                  Sign in
                </a>{' '}
                to send files and access all features
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}