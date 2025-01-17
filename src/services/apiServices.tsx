import axios from 'axios';
import {  TransferSpaceDocumentsResponse } from '../types/documentType';


const API_URL = 'http://18.119.92.131:8001/documents/transfer_space_documents';
const TOKEN =
  'mNmGJiHpfAOXCu1UeKZpBwF5VGGrEUT2OU_9YReoD0dv-kproCW0T6OmaIJ6Ruoej1oxqV40v-J6T0UtUOiFsZTjUJe6nHZg0VvlPWsVJ6tf8v9MxJBFTOIUr_WOrJ2aI6TbeJz6Aun6WxW1jkG3zFFflWw3OK4UAH54z2x8X2r_uEp5Tls_x3c7c31cTkQXQqRk3a1yFC70YpkAH6yYmth5XuXOK8TjR86maL-Dyt_kpBD6uPCBnOAWFilDJoCJzcGDN4lqSdd7mdAgP5GKZL468CoEVGkunNi8fJRG8kSPHtYrhiWrheaAAvFT-cSJ6QXU_fWcDfUi';


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