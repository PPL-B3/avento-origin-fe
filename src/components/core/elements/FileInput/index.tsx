import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FC } from 'react';
import { FileUploader } from 'react-drag-drop-files';
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
  caption = 'Drop Document Here to Upload',
  required = false,
  fileTypes = ['pdf', 'png', 'jpeg', 'jpg'],
  maxSize = 10,
  disabled = false,
  name,
  submission,
  setSubmission,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={`text-lg font-semibold pb-1`}>
        {label}
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
          className={`${disabled ? 'bg-neutral-100' : 'bg-white'} border-neutral-200 border-2 border-solid rounded-xl p-2 h-64 min-h-fit`}
        >
          <div
            className={`${disabled ? 'bg-neutral-100' : 'bg-white'} border-neutral-200 border-2 border-dashed flex flex-col h-full w-full items-center align-middle justify-center rounded-lg min-h-[128px]`}
          >
            {!submission?.file ? (
              <div
                className={`w-full flex flex-col items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} h-full`}
              >
                <Image
                  src="/file.svg"
                  alt="file"
                  width={64}
                  height={64}
                  className="mb-2"
                />
                <div className="text-neutral-80 text-xl">
                  {caption} (max {maxSize} MB)
                </div>
                <div className='pointer-events-none bg-[#FF5D00] text-neutral-50 px-4 w-1/3 text-center py-3 rounded-lg mt-3'>
                  Select From Device
                </div>
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} h-full`}
              >
                <Image
                  src="/images/check-badge.svg"
                  alt="check-badge"
                  width={64}
                  height={64}
                  className="mb-2"
                />
                <div className="text-xl">{submission?.file?.name}</div>
                <Button
                  disabled={disabled}
                  variant="ghost"
                  onClick={() => {
                    setSubmission?.({ ...submission, file: null });
                  }}
                  className="py-0 text-[#0067CC] font-bold text-xl"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </FileUploader>
      <div className="text-neutral-50 mt-1">
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
