import { useState } from 'react';
import { useClientSearch } from './useClientSearch';
import { validateClientField } from '../utils/validations';

export const useClient = (initialClient, setClient) => {
    const [client, setLocalClient] = useState(initialClient);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const {
        searchTerm,
        suggestions,
        loading,
        error,
        handleSearch,
        resetSearch
    } = useClientSearch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const validatedValue = validateClientField(name, value, client[name]);
        setLocalClient(prev => ({ ...prev, [name]: validatedValue }));
        setClient(prev => ({ ...prev, [name]: validatedValue }));
    };

    const handleClientSelect = (selectedClient) => {
        setLocalClient(selectedClient);
        setClient(selectedClient);
        resetSearch();
        setShowSuggestions(false);
    };

    const resetClient = () => {
        const emptyClient = {
            dniruc: "",
            nombrers: "",
            direccion: "",
            telefono: "",
        };
        setLocalClient(emptyClient);
        setClient(emptyClient);
        resetSearch();
    };

    return {
        client,
        searchTerm,
        suggestions,
        loading,
        error,
        showSuggestions,
        handleInputChange,
        handleSearch,
        handleClientSelect,
        resetClient,        
        setShowSuggestions
    };
};