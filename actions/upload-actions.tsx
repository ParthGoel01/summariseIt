'use server';
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { formatFileNameAsTitle } from "@/lib/format";
import { getDbConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType{
  userId? : string,
  fileUrl : string,
  summary : string,
  title : string,
  fileName : string,
}

export async function generatePdfSummary(
  uploadResponse: {
    serverData: {
      userId: string;
      ufsUrl: string;
      name: string;
      size: number;
      type: string;
    };
  }[]
){
  if (!uploadResponse || !uploadResponse.length) {
    return { 
      success: false, 
      message: 'File upload failed! Please Try Again.', 
      data: null
    };
  }
  const { serverData: { userId, ufsUrl: pdfUrl, name: fileName } } = uploadResponse[0];

  if(!pdfUrl){
    return { 
      success: false, 
      message: 'File upload failed! Please Try Again.', 
      data: null
    };
  }
  try{
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    let summary;
    try{
      summary = await generateSummaryFromGemini(pdfText);
      console.log(summary);
    }
    catch(err){ 
      throw new Error("Failed to generate Summary with available AI providers.")
    }
    if(!summary){
      return { 
        success: false, 
        message: 'Failed to generate summary', 
        data: null
      };
    }
    const formattedfileName = formatFileNameAsTitle(fileName);
    return { 
      success: true, 
      message: 'Summary Generated Successfully!', 
      data: { summary, title: formattedfileName, }
    };
  } 
  catch(err){
    return { success: false, message: 'File upload failed! Please Try Again.', data: null};
  }
}

async function savePdfSummary({userId,fileUrl,summary,title,fileName}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql
      `INSERT INTO pdf_summaries(user_id, original_file_url, summary_text, title, file_name) 
      VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) 
      RETURNING id, summary_text;`;
    return savedSummary;
  } 
  catch (error) {
    console.error('Error saving PDF summary', error);
    throw error;
  }
}

export async function storePdfSummaryAction({fileUrl,summary,title,fileName}: PdfSummaryType) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    savedSummary = await savePdfSummary({
      userId, fileUrl, summary, title, fileName,
    });
    if(!savePdfSummary){
      return {
        success: false,
        message: 'Error saving PDF summary',
      };
    }
  } 
  catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error saving PDF summary',
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: 'PDF Summary Saved Successfully!',
    data: {
      id: savedSummary.id,
    }
  }
}
