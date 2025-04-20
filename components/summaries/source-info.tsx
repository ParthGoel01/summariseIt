import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DownloadSummaryButton } from './download-summary-button';

interface SourceInfoProps {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}

export default function SourceInfo({fileName,originalFileUrl,title,summaryText,createdAt}: SourceInfoProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm">
      <div className="flex gap-2">
        <Button size="sm" className="h-8 px-3 text-black/80 bg-white hover:bg-gray-100" asChild>
          <a href={originalFileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            <p>View Original</p>
          </a>
        </Button>
        <DownloadSummaryButton
          title = {title}
          summaryText = {summaryText}
          createdAt = {createdAt}
          fileName = {fileName}
        />
      </div>
    </div>
  );
}
