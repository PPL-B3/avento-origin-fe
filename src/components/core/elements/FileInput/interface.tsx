import React from 'react';

export interface SubmissionProps {
  file: File | null;
  error: boolean;
  loading: boolean;
}

export interface FileInputProps {
  label: string;
  name: string;
  fileTypes?: string[];
  caption?: string;
  required?: boolean;
  maxSize?: number;
  disabled?: boolean;
  submission?: SubmissionProps;
  setSubmission?: React.Dispatch<React.SetStateAction<SubmissionProps>>;
}
