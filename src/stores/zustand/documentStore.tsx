import { create } from 'zustand';
import { fetchTransferSpaceDocuments } from '../../services/apiServices';
import { Document } from '../../types/documentType';

// This is the state of the store.
interface DocumentStore {
  isLoading: boolean;
  isError: boolean;
  docsList: Document[];
  fetchTransferSpaceDocuments: (payload:object, isResetList?: boolean) => Promise<void>;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  isLoading: false, // Initial state
  isError: false,
  docsList: [],

  fetchTransferSpaceDocuments: async (payload, isResetList = false) => {
    set({ isLoading: true}); 
    try {
      const response = await fetchTransferSpaceDocuments(payload); // Fetch data
      // Append the new documents to the existing docsList
      set((state) => ({
        docsList: isResetList ? response.documents : [...state.docsList, ...response.documents], // Merging the previous docsList with the new data
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      set({ isError: true, isLoading: false }); 
    }
  },
}));
