import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <Badge variant={"secondary"} className="relative px-6 py-2 text-base font-medium bg-white border-emerald-500 border-1 rounded-full hover:bg-gray-50">
        <span><Sparkles className="h-4 w-4 mr-2 text-emerald-600 animate-pulse" /></span>
        <p className="text-base text-emerald-600">Powered by AI</p>
      </Badge>
      <div className="font-bold py-6 text-center text-6xl">
        <div>Transform PDFs into concise</div>
        <div>summaries</div>
      </div>
      <div className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">Get a structured and concise summary of your PDF document in seconds.</div>
      <div>
        <Button className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-6 sm:px-8 lg:px-10 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-800 to-emerald-500 font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          <Link href="/upload" className="flex gap-2 items-center">
            <span>Try SummariseIt</span>
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
