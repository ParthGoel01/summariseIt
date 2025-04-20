import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SummaryHeader({ title, createdAt, readingTime}: { title: string; createdAt: string; readingTime: number;}) {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight text-black/80">{title}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className='flex items-center gap-2 text-sm'>
            <Calendar className="h-4 w-4 text-black/80" />
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <Clock className="h-4 w-4 text-black/80" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
      <div>
        <Link href="/dashboard">
          <Button size="sm" className="flex items-center gap-1 sm:gap-2 rounded-full bg-white border-1 border-black/80 px-2 sm:px-3 hover:bg-gray-100">
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-black/80"/>
            <span className="text-xs sm:text-sm text-black/80 font-medium">Back to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
