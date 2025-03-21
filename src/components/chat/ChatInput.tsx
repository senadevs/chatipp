import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, Paperclip } from 'lucide-react';
import { useRef } from 'react';
import type { ChatInputProps } from './types';
import { FilePreview } from './FilePreview';

export function ChatInput({
  value,
  onChange,
  onSend,
  onKeyPress,
  onFileSelect,
  files,
  isPublic
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <FilePreview key={index} file={file} type={file.type} />
          ))}
        </div>
      )}
      
      <div className="flex gap-2">
        <Input
          placeholder={isPublic ? "Send a message as guest..." : "Type a message..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyPress}
          className="flex-1"
        />
        {!isPublic && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileSelect}
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
        <Button onClick={onSend} size="icon">
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
  );
}