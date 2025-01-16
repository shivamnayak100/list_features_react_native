export interface StatusCounts {
    TO_DO: number;
    IN_PROGRESS: number;
    INVALID: number;
    VALID: number;
  }
  
  export interface Document {
    id: number;
    doc_name: string;
    doc_date: string;
    docs_category: number;
    doc_type_id: number;
    doc_status: number;
    file_path: string;
    file_type: string;
    file_name: string;
    comment: string | null;
    reference_number: string;
    platform: string;
    company_logo: string;
  }
  
  export interface TransferSpaceDocumentsResponse {
    total_count: number;
    status_counts: StatusCounts;
    page: number;
    page_size: number;
    documents: Document[];
  }
  