import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Badge variant={"secondary"} className="relative px-6 py-2 text-base font-medium bg-white border-emerald-500 border-1 rounded-full hover:bg-gray-50">
        <span><Sparkles className="h-4 w-4 mr-2 text-emerald-600 animate-pulse" /></span>
        <p className="text-base text-emerald-600">AI-Powered Content Creation</p>
      </Badge>
      <div className="capitalize font-bold tracking-tight text-gray-900 sm:text-4xl">
        <div className="text-5xl font-bold pt-4 text-center">
          Upload Your PDF document
        </div>
      </div>
      <div className="text-lg text-gray-500 mb-4">
        <p>Upload your PDF and let our AI do the magic!</p>
      </div>
    </div>
  );
} 
