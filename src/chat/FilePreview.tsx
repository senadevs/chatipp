import { Image, FileText, Film, Music, Paperclip } from 'lucide-react';
import { FilePreviewProps } from './types';

export function FilePreview({ file, type }: FilePreviewProps) {
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
}