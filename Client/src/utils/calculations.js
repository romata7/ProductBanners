// utils/calculations.js
export const calculateTotal = (data) => {
    if (!data) return 0;

    try {
        const quantity = Number(data.quantity);
        const cost = Number(data.cost);

        if (isNaN(quantity) || isNaN(cost)) return 0;
        if (quantity < 0 || cost < 0) return 0;

        return quantity * cost;
    } catch (error) {
        console.error('Error calculating total:', error);
        return 0;
    }
};

export const formatCurrency = (value) => {
    return typeof value === 'number'
        ? value.toFixed(2)
        : '0.00';
};