import axios from 'axios';

const API_URL = 'http://localhost:4004/api/clients';

export const clientService = {
    searchByDniruc: async (dniruc) => {
        try {
            const response = await axios.get(API_URL, { params: { dniruc } });
            return response.data;
        } catch (error) {
            console.error('Error searching clients:', error);
            throw error;
        }
    },

    createClient: async (clientData) => {
        try {
            const response = await axios.post(API_URL, clientData);
            return response.data;
        } catch (error) {
            console.error('Error creating client:', error);
            throw error;
        }
    },

    updateClient: async (id, clientData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, clientData);
            return response.data;
        } catch (error) {
            console.error('Error updating client:', error);
            throw error;
        }
    }
};