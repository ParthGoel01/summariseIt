'use client'
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/lib/uploadthing";
import { useRef, useState } from "react";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
    file: z.instanceof(File, {message: 'Invalid file'})
    .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
    .refine((file) => file.type.startsWith('application/pdf'),'File must be a PDF'),
});

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { startUpload } = useUploadThing(
        'pdfUploader', {
          onUploadError: (err) => {
            console.log(err);
            toast.error('Error occured while uploading your file. Please try again.');
          }
        }
    );      

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
            const file = formData.get('file') as File;

            const validatedFields = schema.safeParse({file});
            if (!validatedFields.success) {
                toast.error('Invalid file! Please upload a valid PDF file.');
                setIsLoading(true);
                return;
            }
            toast.message('Uploading PDF...', {description: 'Please wait while we upload your PDF.',});

            const response = await startUpload([file]);
            if(!response) {
                toast.error('Something went wrong! Please try again.');
                setIsLoading(true);
                return; 
            }
            toast.message('Processing PDF...', {description: 'Hang Tight! Our AI is reading through your document.',});

            const result = await generatePdfSummary(response);
            const {data} = result;

            if(data){
                if(data.summary){
                    let storeResult : any;
                    storeResult = await storePdfSummaryAction({
                        summary : data.summary,
                        fileUrl: response[0].serverData.ufsUrl,
                        title : data.title,
                        fileName: response[0].serverData.name
                    })
                    toast.message('Summary Generated!', {description: 'Your PDF summary has been successfully generated.',});
                    formRef.current?.reset();
                    router.push(`/summaries/${storeResult.data.id}`);
                }
            }
        } 
        catch (error) {
            setIsLoading(true);
            console.error("Error :", error);
            formRef.current?.reset();
        } 
        finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl max-auto">
            <UploadFormInput ref={formRef} isLoading={isLoading} onSubmit={handleSubmit} />
        </div>
    )
}