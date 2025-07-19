export const commonColumns = {
    quantity: {
        field: 'quantity',
        header: 'Cantidad'
    },
    dimensions: {
        field: 'dimensions',
        header: 'Dimensiones',
        format: item => `${item.width || '0'} × ${item.height || '0'} ${item.unit || ''}`
    },
    description: {
        field: 'description',
        header: 'Descripción'
    },
    cost: {
        field: 'cost',
        header: 'Costo',
        format: value => `S/${(Number(value) || 0).toFixed(2)}`
    },
    location: {
        field: 'location',
        header: 'Ubicación'
    }
};

export const commonSummaries = {
    withDimensions: item => `${item.width || '0'}×${item.height || '0'}${item.unit || ''} - ${item.description || ''}`,
    withLocation: item => `${item.description || ''}${item.location ? ` (${item.location})` : ''}`
}; 