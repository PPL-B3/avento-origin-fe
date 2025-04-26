export interface HistoryType {
  owner: string;
  generatedDate: string;
}

export interface DocumentAdminMetadataResponse {
  documentId: string;
  documentName: string;
  uploadDate: string;
  publisher: string;
  currentOwner: string;
  ownershipHistory: HistoryType[];
  filePath?: string;
}
