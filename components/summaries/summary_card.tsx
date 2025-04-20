import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { formatFileName } from "@/lib/format";
import DeleteButton from "./delete-button";
import Link from "next/link";
import moment from "moment";

interface SummaryHeaderProps {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}

const SummaryHeader = ({fileUrl,title,createdAt,}: SummaryHeaderProps) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">{title || formatFileName(fileUrl)}</h3>
        <p className="text-sm •text-gray-500">{moment(createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full p-0">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader 
              fileUrl={summary.original_file_url} 
              title={summary.title} 
              createdAt={summary.created_at}
            />
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">{summary.summary_text}</p>
          </div>
        </Link>
      </Card>
    </div>
  );
}
