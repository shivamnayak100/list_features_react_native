import axios from 'axios';
import {  TransferSpaceDocumentsResponse } from '../types/documentType';


const API_URL = 'http://18.119.92.131:8001/documents/transfer_space_documents';
const TOKEN =
  'ClLCcYtlzLQn1SfM-Z2RrLAjQMAbjX9byqdZ7m_Iu0CE_E4gUrjExGcU1QQKthWfOO_mdQ_TK2BXW3O0i3hRER8CktDun7tJqRHP-oHV2hrUdF8SX7MxDqtnFdjxkblKj14ops9xKYPf3eIE51UvB3FqcHs7IGiJoAN0hx75DJmYPYV_NH3HQCLI48GOrpK0o9TlX-f-hYsUxDPyiPQocJ3cYrOY0BYAg-2jGoKKPE-HtZu3fMP8rXulKdOeEmt7woH62U9GAP-iTunQVedRSunvMg92prItU4qj5Gb_lObsRnrGsIPWx16C1RJyxZW8nuaVqcIFq5T1';


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