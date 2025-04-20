import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { currentUser } from '@clerk/nextjs/server';
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '32MB' } })
    .middleware(async ({ req }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        userId: metadata.userId,
        ufsUrl: file.ufsUrl,
        name: file.name,
        size: file.size,
        type: file.type
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
