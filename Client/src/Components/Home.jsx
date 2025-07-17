// pages/Home/Home.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { PencilFill, PrinterFill, Hammer, Tools } from 'react-bootstrap-icons';
import GenericModal from './GenericModal';
import { calculateTotal, formatCurrency } from '../utils/calculations';
import Client from './Client'

const Home = () => {
    const [activeModal, setActiveModal] = React.useState(null);
    const [designs, setDesigns] = React.useState([]);
    const [client, setClient] = useState({})
    // ... otros estados

    const modalConfigurations = {
        design: {
            title: 'Nuevo Diseño',
            IconComponent: PencilFill,
            initialValues: {
                quantity: 1,
                width: '',
                height: '',
                unit: 'cm',
                description: '',
                cost: ''
            },
            fields: [
                {
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
                {
                    name: 'width',
                    type: 'number',
                    label: 'Ancho',
                    validation: {
                        required: true,
                        validator: value => {
                            const num = Number(value);
                            return !isNaN(num) && num >= 0;
                        },
                        message: 'Ancho debe ser un número positivo'
                    },
                    attributes: { step: '0.01' }
                },
                {
                    name: 'height',
                    type: 'number',
                    label: 'Alto',
                    validation: {
                        required: true,
                        validator: value => {
                            const num = Number(value);
                            return !isNaN(num) && num >= 0;
                        },
                        message: 'Alto debe ser un número positivo'
                    },
                    attributes: { step: '0.01' }
                },
                {
                    name: 'unit',
                    type: 'select',
                    label: 'Unidad',
                    validation: {
                        required: true,
                    },
                    attributes: { options: [{ value: "cm", label: "Centímetros" }, { value: "m", label: "Metros" }] }
                },
                {
                    name: 'description',
                    type: 'text',
                    label: 'Descripción',
                    validation: {
                        required: true,
                        message: "Descipción es Requerida"
                    },
                    attributes: {}
                },
                {
                    name: "cost",
                    type: "number",
                    label: "Costo",
                    validation: {
                        required: true,
                        validator: value => {
                            const num = Number(value);
                            return !isNaN(num) && num >= 0;
                        },
                        message: 'Debe ser un número positivo'
                    },
                    attributes: { step: "0.01" }
                }
                // ... otros campos
            ],
            calculatedValues: {
                total: data => calculateTotal(data),
                id: () => Date.now(),
                date: () => new Date().toLocaleString()
            },
            options: {
                size: 'sm',
                submitText: 'Agregar Diseño',
                showTotal: true,
                formatTotal: value => `S/${formatCurrency(value)}`
            }
        },
        // ... otras configuraciones
    };

    const handleModalSubmit = (type, data) => {
        switch (type) {
            case 'design':
                setDesigns(prev => [...prev, data]);
                break;
            // ... otros casos
        }
    };

    return (
        <div className="container">
            {/* ... otros componentes */}

            <Client client={client} setClient={setClient} />

            <div className="d-flex flex-wrap gap-2 my-4">
                {Object.keys(modalConfigurations).map(modalKey => (
                    <Button
                        key={modalKey}
                        variant="outline-dark"
                        onClick={() => setActiveModal(modalKey)}
                        className="d-flex align-items-center gap-1"
                    >
                        + {React.createElement(modalConfigurations[modalKey].IconComponent)}
                        {modalConfigurations[modalKey].title}
                    </Button>
                ))}
            </div>

            {activeModal && (
                <GenericModal
                    isOpen={!!activeModal}
                    onClose={() => setActiveModal(null)}
                    title={modalConfigurations[activeModal].title}
                    IconComponent={modalConfigurations[activeModal].IconComponent}
                    initialValues={modalConfigurations[activeModal].initialValues}
                    config={modalConfigurations[activeModal]}
                    onSubmit={(data) => handleModalSubmit(activeModal, data)}
                />
            )}

            {/* ... listas de items */}
        </div>
    );
};

export default Home;