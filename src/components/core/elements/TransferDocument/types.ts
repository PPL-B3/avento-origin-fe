export interface TransferDocumentProps {
  readonly documentId: string;
}

export interface TransferDocumentData {
  documentId: string;
  pendingOwner: string;
}
