import { useState } from "react";

export const useServices = () => {
    const [services, setServices] = useState({
        designs: [],
        impressions: [],
        installations: [],
        maintenances: []
    });

    const addService = (type, data) => {
        setServices(prev => ({
            ...prev,
            [type]: [...prev[type], {
                ...data,
                id: Date.now(),
                date: new Date().toLocaleString(),
                total: data.quantity * data.cost
            }]
        }));
    };

    return { services, addService };
};