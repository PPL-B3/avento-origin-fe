'use client';

import { FileInput } from '@/components/core';
import { SubmissionProps } from '@/components/core/elements/FileInput/interface';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { uploadDocumentSchema } from './schema';

export function UploadDocumentModule() {
  const [file, setFile] = useState<SubmissionProps>({
    file: null,
    error: false,
    loading: false,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    if (file.file !== null) {
      setIsUploading(true);
      toast.info('Uploading file...');

      // Simulate upload process
      setTimeout(() => {
        toast.success('Document uploaded successfully');
        setIsUploading(false);
      }, 2000);

      console.log(file);
    }
  };

  const form = useForm({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      image: '',
    },
  });

  const onSubmit = (values: z.infer<typeof uploadDocumentSchema>) => {
    console.log(values);
    handleUpload();
  };

  return (
    <section
      data-testid="upload-document-module"
      className="pb-20 max-md:px-5 min-h-screen w-full flex flex-col md:pt-32 md:px-20 pt-28"
    >
      <h4 className="w-full text-center text-4xl font-bold">
        Upload Your Document
      </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-4 mt-12">
            <FileInput
              label="Photo"
              maxSize={2}
              name={`image`}
              fileTypes={['png', 'jpeg', 'jpg']}
              required
              submission={file}
              setSubmission={setFile}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            variant={'default'}
            disabled={file.file === null || isUploading}
            data-testid="submit-button"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </Form>
    </section>
  );
}
