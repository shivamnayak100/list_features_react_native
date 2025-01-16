import axios from 'axios';
import {  TransferSpaceDocumentsResponse } from '../types/documentType';


const API_URL = 'http://18.119.92.131:8001/documents/transfer_space_documents';
const TOKEN =
  'T3_mh7SAZOnfaPVayGCt5nTpGA9m_huD39F37Y_Drs2yNkPg_ibEfMGM_S5_71UEEKzYO1nQhCzpAReBHhwqqvkMxe0-NblI_Rcv6I7otTRl_cUlfOUVpSNsq3fAveGjy91KVsJ9VBgHfYz8QJXkXFC8kGGZDV66wJUV1UP2-YyMAvg4p4TBSIRB1JDrs12o38nomAeg5LoL7B8S9ohb0NeckNzUJ5eqnE5LYeXSHny9EJvq2AvmoYM2NrcUKz_yb6umOe3cBxS5tVqtWvUExjkeXl3393hZ69fNwY6rJ7JiWcXnIDIhkup6_OS_fR2GNbusfc4e6ZdT';


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