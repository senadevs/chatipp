import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../lib/auth';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Message } from './Message';
import { ModeSwitch } from './ModeSwitch';
import { ModelSelector } from './ModelSelector';
import { ChatInput } from './ChatInput';
import type { ChatProps, Message as MessageType, ChatMode, AIModel } from './types';

export default function Chat({ isPublic = false }: ChatProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
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

    const userMessage: MessageType = {
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
      
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'Lo siento, hubo un error en la respuesta.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: MessageType = {
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
              <Message
                key={message.id}
                message={message}
                isSelected={selectedMessageId === message.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <ModeSwitch mode={chatMode} onModeChange={setChatMode} />
              <ModelSelector selectedModel={selectedModel} onModelSelect={setSelectedModel} />
            </div>
            
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              onKeyPress={handleKeyPress}
              onFileSelect={handleFileSelect}
              files={files}
              isPublic={isPublic}
            />
          </div>
        </div>
      </div>
    </div>
  );
}