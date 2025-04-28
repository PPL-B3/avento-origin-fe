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

    let key = '';

    try {
      const url = new URL(filePath);
      key = decodeURIComponent(url.pathname.substring(1));
    } catch (error) {
      console.error('Error parsing filePath:', error);
      key = decodeURIComponent(filePath.split('/').filter(Boolean).pop() ?? '');
    }

    if (!key) {
      throw new Error('Tidak dapat mengekstrak nama file dari path');
    }

    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: process.env.NEXT_PUBLIC_DO_SPACES_BUCKET!,
      Key: key,
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
