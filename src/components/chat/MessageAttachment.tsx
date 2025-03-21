import { FileText } from 'lucide-react';
import { MessageAttachmentProps } from './types';

export function MessageAttachment({ attachment }: MessageAttachmentProps) {
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
}