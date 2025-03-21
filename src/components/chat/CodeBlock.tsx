import { useState } from 'react';
import { Button } from '../ui/button';
import { Copy, Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { CodeBlockProps } from './types';

export function CodeBlock({ language, children }: CodeBlockProps) {
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
}