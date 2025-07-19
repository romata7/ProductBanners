export const commonFields = {
    quantity: {
        name: 'quantity',
        type: 'number',
        label: 'Cantidad',
        validation: {
            required: true,
            validator: value => Number.isInteger(Number(value)) && Number(value) > 0,
            message: 'Cantidad debe ser un entero positivo'
        },
        attributes: { min: 1 }
    },
    cost: {
        name: 'cost',
        type: 'number',
        label: 'Costo',
        validation: {
            required: true,
            validator: value => !isNaN(Number(value)) && Number(value) >= 0,
            message: 'Costo debe ser positivo'
        },
        attributes: { step: '0.01' }
    },
    description: {
        name: 'description',
        type: 'text',
        label: 'Descripción',
        validation: {
            required: true,
            validator: value => value.trim() !== '',
            message: 'Descripción requerida'
        }
    },
    location: {
        name: 'location',
        type: 'text',
        label: 'Ubicación',
        validation: {
            required: false
        }
    },
    dimensions: [
        {
            name: 'width',
            type: 'number',
            label: 'Ancho',
            validation: {
                required: true,
                validator: value => !isNaN(Number(value)) && Number(value) >= 0,
                message: 'Ancho debe ser positivo'
            },
            attributes: { step: '0.01' }
        },
        {
            name: 'height',
            type: 'number',
            label: 'Alto',
            validation: {
                required: true,
                validator: value => !isNaN(Number(value)) && Number(value) >= 0,
                message: 'Alto debe ser positivo'
            },
            attributes: { step: '0.01' }
        },
        {
            name: 'unit',
            type: 'select',
            label: 'Unidad',
            validation: { required: true },
            attributes: {
                options: [
                    { value: 'cm', label: 'Centímetros' },
                    { value: 'm', label: 'Metros' }
                ]
            }
        }
    ]
};