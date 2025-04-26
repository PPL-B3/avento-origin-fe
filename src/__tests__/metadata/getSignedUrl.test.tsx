import { getSignedUrlFromSpaces } from '@/components/modules/metadata/utils/getSignedUrl';
import AWS from 'aws-sdk';

// Mock AWS SDK
jest.mock('aws-sdk', () => {
  const getSignedUrlMock = jest.fn();
  return {
    S3: jest.fn().mockImplementation(() => ({
      getSignedUrl: getSignedUrlMock,
    })),
  };
});

// Define mock types
interface MockS3 {
  getSignedUrl: jest.Mock;
}

describe('getSignedUrlFromSpaces', () => {
  let s3Mock: MockS3;
  let getSignedUrlMock: jest.Mock;

  // SET ENV di awal test
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();

    // Clone original env
    process.env = { ...ORIGINAL_ENV };

    // Set up mock environment variables
    process.env.NEXT_PUBLIC_DO_SPACES_ACCESS_KEY = 'MOCK_ACCESS_KEY';
    process.env.NEXT_PUBLIC_DO_SPACES_SECRET_KEY = 'MOCK_SECRET_KEY';
    process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT = 'https://mock-endpoint.com';
    process.env.NEXT_PUBLIC_DO_SPACES_REGION = 'mock-region';
    process.env.NEXT_PUBLIC_DO_SPACES_BUCKET = 'mock-bucket';

    s3Mock = new (AWS.S3 as jest.MockedClass<
      typeof AWS.S3
    >)() as unknown as MockS3;
    getSignedUrlMock = s3Mock.getSignedUrl;
    getSignedUrlMock.mockReturnValue('https://mocked-signed-url.com');
  });

  afterAll(() => {
    // Reset env setelah semua test
    process.env = ORIGINAL_ENV;
  });

  it('should initialize S3 with correct configuration', async () => {
    const filePath = 'test-file.pdf';
    await getSignedUrlFromSpaces(filePath);

    expect(AWS.S3).toHaveBeenCalledWith({
      accessKeyId: process.env.NEXT_PUBLIC_DO_SPACES_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_DO_SPACES_SECRET_KEY!,
      endpoint: process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT!,
      region: process.env.NEXT_PUBLIC_DO_SPACES_REGION!,
      signatureVersion: 'v4',
    });
  });
});
