export const commonFields = {
    quantity: {
        attributes: {
            name: 'quantity',
            type: 'number',
            label: 'Cantidad',
            required: true,
            min: 1,
        },
        validation: {
            validator: value => Number.isInteger(Number(value)) && Number(value) > 0,
            message: 'Cantidad debe ser un entero positivo'
        }
    },
    cost: {
        attributes: {
            name: 'cost',
            type: 'number',
            label: 'Costo',
            required: true,
            step: '0.01'
        },
        validation: {
            validator: value => !isNaN(Number(value)) && Number(value) >= 0,
            message: 'Costo debe ser positivo'
        }
    },
    description: {
        attributes: {
            name: 'description',
            type: 'textarea',
            label: 'Descripción',
            required: true
        },
        validation: {
            validator: value => value.trim() !== '',
            message: 'Descripción requerida'
        }
    },
    location: {
        attributes: {
            name: 'location',
            type: 'text',
            label: 'Ubicación',
            required: false
        }
    },
    notes: {
        attributes: {
            name: 'notes',
            type: 'textarea',
            label: 'Notas',
            required: false
        }
    },
    width: {
        attributes: {
            name: 'width',
            type: 'number',
            label: 'Ancho',
            required: true,
            step: '0.01'
        },
        validation: {
            validator: value => !isNaN(Number(value)) && Number(value) >= 0,
            message: 'Ancho debe ser positivo'
        }
    },
    height: {
        attributes: {
            name: 'height',
            type: 'number',
            label: 'Alto',
            required: true,
            step: '0.01'
        },
        validation: {
            validator: value => !isNaN(Number(value)) && Number(value) >= 0,
            message: 'Alto debe ser positivo'
        }
    },
    unit: {
        attributes: {
            name: 'unit',
            type: 'select',
            label: 'Unidad',
            options: [
                { value: 'cm', label: 'Centímetros' },
                { value: 'm', label: 'Metros' }
            ]
        }
    }
};