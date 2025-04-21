import { encryptEmail } from '../../metadata';

interface DocumentInfoProps {
  currentOwnerEmail?: string;
  documentName?: string;
}

export function DocumentInfo({
  currentOwnerEmail,
  documentName,
}: Readonly<DocumentInfoProps>) {
  if (!currentOwnerEmail && !documentName) return null;

  return (
    <div className="space-y-1">
      {currentOwnerEmail && (
        <p className="text-xs">
          From:{' '}
          <span className="font-semibold">
            {encryptEmail(currentOwnerEmail)}
          </span>
        </p>
      )}
      {documentName && (
        <p className="text-xs">
          Document Name: <span className="font-semibold">{documentName}</span>
        </p>
      )}
    </div>
  );
}
