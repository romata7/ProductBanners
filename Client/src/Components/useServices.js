import { useState } from 'react';

export const useServices = () => {
    const [services, setServices] = useState({
        designs: [],
        impressions: [],
        installations: [],
        maintenances: []
    });

    const addService = (type, data) => {
        console.log('Adding service:', type, data); // <-- Agrega esto
        setServices(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), {
                ...data,
                id: Date.now(),
                date: new Date().toLocaleString(),
                total: (data.quantity || 0) * (data.cost || 0)
            }]
        }));
    };

    return { services, addService };
};