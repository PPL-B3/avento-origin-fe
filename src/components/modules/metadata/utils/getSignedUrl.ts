import AWS from 'aws-sdk';

export const getSignedUrlFromSpaces = async (
  filePath: string
): Promise<string> => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_DO_SPACES_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_DO_SPACES_SECRET_KEY!,
      endpoint: process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT!,
      region: process.env.NEXT_PUBLIC_DO_SPACES_REGION!,
      signatureVersion: 'v4',
    });

    if (!filePath) {
      throw new Error('filePath is required');
    }
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.NEXT_PUBLIC_DO_SPACES_BUCKET!,
      Key: filePath, // Pakai filePath disini
      Expires: 900,
      ResponseContentType: 'application/pdf',
      ResponseContentDisposition: 'inline',
    });

    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Gagal menghasilkan URL');
  }
};
