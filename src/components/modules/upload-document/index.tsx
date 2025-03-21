'use client';

import { FileInput, useAuth } from '@/components/core';
import { SubmissionProps } from '@/components/core/elements/FileInput/interface';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUploadDocument } from './hooks/use-upload-document';
import { uploadDocumentSchema } from './schema';

export function UploadDocumentModule() {
  const [file, setFile] = useState<SubmissionProps>({
    file: null,
    error: false,
    loading: false,
  });

  const { isLoadingUploadDocument, onUploadDocument } = useUploadDocument();

  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      documentName: 'a document name',
      ownerName: user?.email ?? 'owner name not detected',
    },
  });

  /* istanbul ignore next */
  const onSubmit = (values: z.infer<typeof uploadDocumentSchema>) => {
    values.ownerName = user?.email ?? 'owner name not detected';
    values.documentName = file.file?.name ?? 'a document name';
    if (file.file === null) {
      toast.error('Please select a file to upload');
      return;
    }

    values.file = file.file;
    onUploadDocument(values);
  };

  return (
    <section
      data-testid="upload-document-module"
      className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50"
    >
      <h4 className="w-full text-center text-4xl font-bold">UPLOAD HERE!</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/4 flex flex-col"
        >
          <div className="flex flex-col gap-2 mb-4 mt-12 text-neutral-950">
            <FileInput
              label=""
              maxSize={8}
              name={`image`}
              fileTypes={['pdf']}
              required
              submission={file}
              setSubmission={setFile}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#0067CC]"
            variant={'default'}
            disabled={file.file === null || isLoadingUploadDocument}
            data-testid="upload-button"
          >
            Upload
          </Button>
        </form>
      </Form>
    </section>
  );
}
