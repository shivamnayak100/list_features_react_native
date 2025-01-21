import axios from 'axios';
import {  TransferSpaceDocumentsResponse } from '../types/documentType';


const API_URL = 'http://18.119.92.131:8001/documents/transfer_space_documents';
const TOKEN =
  'eQkexx--8RwJxQ6Zlzo0EECo0wit_yDn7IS_4t0zZs4iur2VUMBi0tJdTGm9qGEGLEoUau15tGIVNNowuml86SzGbN22mQbU1Sx289vcSBhMYQZbw9QvO8z17_5p0KKnADzLadLyB1UcLfZtJ0iW37C19hIVgXE6xeVeqFuznbvfGa4vri6NVvwtL4mqBoA5SdKgaO-4XjO570SNpj0SV8dOBKvNEn8x73iSiJwdcMtZkuDw1NOm9C6z1X4UoncW2ZNUG_UBJ61JhY0zEn_6dnVKNkMcNF2gQfNYJCh6IbLt4Ikm7ZQQCZCxXJwhbmC3NV7ch6XXvoa0';


// Function to call the API
export const fetchTransferSpaceDocuments = async (
  payload
): Promise<TransferSpaceDocumentsResponse> => {
  try {
    const response = await axios.post<TransferSpaceDocumentsResponse>(
      API_URL,
      payload,
      {
        headers: {
          'token': `${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching transfer space documents:', error);
    throw error;
  }
};