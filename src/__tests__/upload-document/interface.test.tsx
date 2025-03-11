import {
  FileInputProps,
  SubmissionProps,
} from '@/components/core/elements/FileInput/interface';

describe('SubmissionProps interface', () => {
  it('should define the correct properties', () => {
    const submission: SubmissionProps = {
      file: null,
      error: false,
      loading: false,
    };

    expect(submission).toHaveProperty('file');
    expect(submission).toHaveProperty('error');
    expect(submission).toHaveProperty('loading');
  });

  it('should accept a File object', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const submission: SubmissionProps = {
      file: mockFile,
      error: false,
      loading: false,
    };

    expect(submission.file).toBeInstanceOf(File);
    expect(submission.file?.name).toBe('test.png');
  });
});

describe('FileInputProps interface', () => {
  it('should define the required properties', () => {
    const props: FileInputProps = {
      label: 'Upload File',
      name: 'fileInput',
    };

    expect(props).toHaveProperty('label');
    expect(props).toHaveProperty('name');
  });

  it('should accept optional properties', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const submission: SubmissionProps = {
      file: mockFile,
      error: false,
      loading: true,
    };

    const setSubmission = jest.fn();

    const props: FileInputProps = {
      label: 'Upload File',
      name: 'fileInput',
      fileTypes: ['image/png', 'image/jpeg'],
      caption: 'Max file size: 5MB',
      required: true,
      maxSize: 5000000,
      disabled: false,
      submission,
      setSubmission,
    };

    expect(props.fileTypes).toEqual(['image/png', 'image/jpeg']);
    expect(props.caption).toBe('Max file size: 5MB');
    expect(props.required).toBe(true);
    expect(props.maxSize).toBe(5000000);
    expect(props.disabled).toBe(false);
    expect(props.submission).toBe(submission);
    expect(props.setSubmission).toBe(setSubmission);
  });
});
