import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from '../utils/helpers';
import { clientService } from '../services/clientService';

export const useClientSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función de búsqueda real
    const searchClients = useCallback(async (term) => {
        if (!term.trim()) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const results = await clientService.searchByDniruc(term);
            setSuggestions(results);
        } catch (err) {
            console.error("Error fetching clients:", err);
            setError("Error al cargar clientes");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Versión debounceada de la búsqueda
    const debouncedSearch = useCallback(
        debounce((term) => searchClients(term), 300),
        [searchClients]
    );

    // Efecto para limpiar al desmontar
    useEffect(() => {
        return () => {
            // Limpiar cualquier debounce pendiente
            debouncedSearch.cancel?.();
        };
    }, [debouncedSearch]);

    const handleSearch = (e) => {
        const term = e.target.value.trim();
        setSearchTerm(term);
        debouncedSearch(term);
    };

    const resetSearch = () => {
        setSearchTerm('');
        setSuggestions([]);
        setError(null);
        debouncedSearch.cancel?.();
    };

    return {
        searchTerm,
        suggestions,
        loading,
        error,
        handleSearch,
        resetSearch
    };
};