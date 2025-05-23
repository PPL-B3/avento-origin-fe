import { getSignedUrlFromSpaces } from '@/components/modules/metadata/utils/getSignedUrl';
import AWS from 'aws-sdk';

// Define mock types
interface MockS3 {
  getSignedUrl: jest.Mock;
}

// Mock AWS SDK
jest.mock('aws-sdk', () => {
  const getSignedUrlMock = jest.fn();
  return {
    S3: jest.fn().mockImplementation(() => ({
      getSignedUrl: getSignedUrlMock,
    })),
  };
});

describe('getSignedUrlFromSpaces', () => {
  let s3Mock: MockS3;
  let getSignedUrlMock: jest.Mock;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_DO_SPACES_BUCKET = 'avento';
    process.env.NEXT_PUBLIC_DO_SPACES_ACCESS_KEY = 'dummy-access-key';
    process.env.NEXT_PUBLIC_DO_SPACES_SECRET_KEY = 'dummy-secret-key';
    process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT =
      'https://sgp1.digitaloceanspaces.com';
    process.env.NEXT_PUBLIC_DO_SPACES_REGION = 'sgp1';
    // Reset mocks before each test
    jest.clearAllMocks();

    // Get reference to the mocked functions
    s3Mock = new (AWS.S3 as jest.MockedClass<
      typeof AWS.S3
    >)() as unknown as MockS3;
    getSignedUrlMock = s3Mock.getSignedUrl;

    // Default mock return value
    getSignedUrlMock.mockReturnValue('https://mocked-signed-url.com');
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

  it('should call getSignedUrl with correct parameters for simple filename', async () => {
    // Arrange
    const filePath = 'test-file.pdf';

    // Act
    const result = await getSignedUrlFromSpaces(filePath);

    // Assert
    expect(getSignedUrlMock).toHaveBeenCalledWith('getObject', {
      Bucket: 'avento',
      Key: 'test-file.pdf',
      Expires: 900,
      ResponseContentType: 'application/pdf',
      ResponseContentDisposition: 'inline',
    });
    expect(result).toBe('https://mocked-signed-url.com');
  });

  it('should handle URL format paths correctly', async () => {
    // Arrange
    const filePath =
      'https://sgp1.digitaloceanspaces.com/avento/path/to/document.pdf';

    // Act
    const result = await getSignedUrlFromSpaces(filePath);

    // Assert
    expect(getSignedUrlMock).toHaveBeenCalledWith('getObject', {
      Bucket: 'avento',
      Key: 'avento/path/to/document.pdf',
      Expires: 900,
      ResponseContentType: 'application/pdf',
      ResponseContentDisposition: 'inline',
    });
    expect(result).toBe('https://mocked-signed-url.com');
  });

  it('should handle paths with URL encoding', async () => {
    // Arrange
    const filePath = 'path/to/file%20with%20spaces.pdf';

    // Act
    const result = await getSignedUrlFromSpaces(filePath);

    // Assert
    expect(getSignedUrlMock).toHaveBeenCalledWith('getObject', {
      Bucket: 'avento',
      Key: 'file with spaces.pdf',
      Expires: 900,
      ResponseContentType: 'application/pdf',
      ResponseContentDisposition: 'inline',
    });
    expect(result).toBe('https://mocked-signed-url.com');
  });

  it('should throw error when file path is empty', async () => {
    // Arrange
    const filePath = '';

    // Act & Assert
    await expect(getSignedUrlFromSpaces(filePath)).rejects.toThrow(
      'Gagal menghasilkan URL'
    );
  });

  it('should throw error when AWS S3 fails', async () => {
    // Arrange
    const filePath = 'test-file.pdf';
    getSignedUrlMock.mockImplementation(() => {
      throw new Error('AWS S3 Error');
    });

    // Act & Assert
    await expect(getSignedUrlFromSpaces(filePath)).rejects.toThrow(
      'Gagal menghasilkan URL'
    );
  });
});
