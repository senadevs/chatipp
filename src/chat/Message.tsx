import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageProps } from './types';
import { CodeBlock } from './CodeBlock';
import { MessageAttachment } from './MessageAttachment';

export function Message({ message, isSelected }: MessageProps) {
  return (
    <div
      id={`message-${message.id}`}
      className={cn(
        "flex w-full transition-colors duration-300 rounded-lg p-2",
        message.sender === 'user' ? "justify-end" : "justify-start",
        isSelected && "bg-accent/50"
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
  );
}