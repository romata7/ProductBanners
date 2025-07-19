export const listConfigurations = {
    design: {
        columns: [
            { field: 'quantity', header: 'Cantidad', width: '100px' },
            {
                field: 'dimensions',
                header: 'Dimensiones',
                format: item => `${item.width} × ${item.height} ${item.unit}`
            },
            { field: 'description', header: 'Descripción' },
            {
                field: 'cost',
                header: 'Costo',
                format: value => `S/${value.toFixed(2)}`,
                align: 'right',
                width: '120px'
            },
            {
                field: 'total',
                header: 'Total',
                format: item => `S/${(item.quantity * item.cost).toFixed(2)}`,
                align: 'right',
                width: '120px'
            }
        ],
        summary: item => `Diseño: ${item.width}×${item.height}${item.unit} - ${item.description}`
    },
    impression: {
        columns: [
            { field: 'quantity', header: 'Cantidad', width: '100px' },
            {
                field: 'dimensions',
                header: 'Dimensiones',
                format: item => `${item.width} × ${item.height} ${item.unit}`
            },
            { field: 'impression', header: 'Impresión' },
            {
                field: 'cost',
                header: 'Costo',
                format: value => `S/${value.toFixed(2)}`,
                align: 'right',
                width: '120px'
            },
            {
                field: 'total',
                header: 'Total',
                format: item => `S/${(item.quantity * item.cost).toFixed(2)}`,
                align: 'right',
                width: '120px'
            }
        ],
        summary: item => `Impresión: ${item.width}×${item.height}${item.unit} - ${item.description}`
    },
    installation: {
        columns: [
            { field: 'quantity', header: 'Cantidad', width: '100px' },
            { field: 'description', header: 'Descripción' },
            { field: 'location', header: 'Ubicación' },
            {
                field: 'cost',
                header: 'Costo',
                format: value => `S/${value.toFixed(2)}`,
                align: 'right',
                width: '120px'
            },
            {
                field: 'total',
                header: 'Total',
                format: item => `S/${(item.quantity * item.cost).toFixed(2)}`,
                align: 'right',
                width: '120px'
            }
        ],
        summary: item => `Instalación: ${item.description}${item.location ? ` (${item.location})` : ''}`
    },
    maintenance: {
        columns: [
            { field: 'quantity', header: 'Cantidad', width: '100px' },
            { field: 'maintenance', header: 'Mantenimiento' },
            { field: 'location', header: 'Ubicación' },
            {
                field: 'cost',
                header: 'Costo',
                format: value => `S/${value.toFixed(2)}`,
                align: 'right',
                width: '120px'
            },
            {
                field: 'total',
                header: 'Total',
                format: item => `S/${(item.quantity * item.cost).toFixed(2)}`,
                align: 'right',
                width: '120px'
            }
        ],
        summary: item => `Instalación: ${item.description}${item.location ? ` (${item.location})` : ''}`
    }
};