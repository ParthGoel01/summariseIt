import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptySummaryState() {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-600">No Summaries Yet</h3>
        <p className="text-gray-500">Upload your first PDF to get started with AI-powered summaries.</p>
        <Link href="/upload">
          <Button className="mt-4 bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer rounded-lg hover:scale-105 transition-all duration-300">Create your First Summary</Button>
        </Link>
      </div>
    </div>
  );
}
