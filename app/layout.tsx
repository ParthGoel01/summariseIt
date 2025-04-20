import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import Header from '@/components/common/header';
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";

const fontSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200','300','400','500','600','700','800','900'],
});
 
export const metadata: Metadata = {
  title: "SummariseIt - AI Powered PDF Summarizer",
  description: "Save hours of reading time. Transform lengthy PDFs into clear, concise and accurate summaries in seconds with our advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      appearance={{
      layout: { unsafe_disableDevelopmentModeWarnings: true,},
      }}
    >
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative flex flex-col min-h-screen">
            <Header/>
              <main className="flex-1">
                {children}
              </main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
