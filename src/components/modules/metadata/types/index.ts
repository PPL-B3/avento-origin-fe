export interface HistoryType {
  owner: string;
  generatedDate: string;
}

export interface DocumentMetadataResponse {
  documentName: string;
  uploadDate: string;
  publisher: string;
  currentOwner: string;
  ownershipHistory: HistoryType[];
  filePath?: string;
}
