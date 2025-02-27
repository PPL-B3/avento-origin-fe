import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FC } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { HiOutlineFolderArrowDown } from 'react-icons/hi2';
import { toast } from 'sonner';
import { FileInputProps } from './interface';

export async function downloadFile(url: string, filename: string) {
  toast.promise(
    (async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
      document.body.removeChild(anchor);
    })(),
    {
      loading: 'Downloading file...',
      success: 'File downloaded successfully',
      error: 'Failed to download file',
    }
  );
}

export const FileInput: FC<FileInputProps> = ({
  label,
  caption = 'Drag and drop your file here',
  required = false,
  fileTypes = ['pdf', 'png', 'jpeg', 'jpg'],
  maxSize = 2,
  disabled = false,
  name,
  submission,
  setSubmission,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={`text-lg font-semibold pb-1`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <FileUploader
        handleChange={(file: File) => {
          if (file && submission)
            setSubmission?.({ ...submission, file: file });
        }}
        name={name}
        types={fileTypes}
        onTypeError={() => {
          toast.error('File type not supported.');
        }}
        onSizeError={() => {
          toast.error('File size exceeded limit.');
        }}
        maxSize={maxSize}
        disabled={disabled}
      >
        <div
          className={`${disabled ? 'bg-neutral-100' : 'bg-white'} border-neutral-200 border-2 border-solid rounded-xl p-2 h-44 min-h-fit`}
        >
          <div
            className={`${disabled ? 'bg-neutral-100' : 'bg-white'} border-neutral-200 border-2 border-dashed flex flex-col h-full w-full items-center align-middle justify-center rounded-lg min-h-[128px]`}
          >
            {!submission?.file ? (
              <div
                className={`w-full flex flex-col items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} h-full`}
              >
                <HiOutlineFolderArrowDown
                  size={32}
                  className="w-10 text-neutral-80"
                />
                <div className="text-neutral-80">
                  {caption} (max {maxSize} MB)
                </div>
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} h-full`}
              >
                <Image
                  src="/images/check-badge.svg"
                  alt="check-badge"
                  width={32}
                  height={32}
                  className="mb-2"
                />
                <div>{submission?.file?.name}</div>
                <Button
                  disabled={disabled}
                  variant="ghost"
                  onClick={() => {
                    setSubmission?.({ ...submission, file: null });
                  }}
                  className="text-lg py-0"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </FileUploader>
      <div className="text-neutral-60 mt-1">
        The file must be in format{' '}
        <span className="text-danger-400">
          {fileTypes.map((type, index) => {
            return `*${type}${index === fileTypes.length - 1 ? '' : ', '}`;
          })}
        </span>
      </div>
    </div>
  );
};
