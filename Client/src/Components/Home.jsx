import { useState } from 'react';
import { Button, Tabs, Tab, Container } from 'react-bootstrap';
import { ServiceList } from './ServiceList';
import { ServiceForm } from './ServiceForm';
import { modalConfigurations } from './modalConfigurations';
import { PencilFill, PrinterFill, Hammer, Tools } from 'react-bootstrap-icons';

const serviceTypes = [
    { key: 'design', label: 'Diseños', icon: PencilFill },
    { key: 'impression', label: 'Impresiones', icon: PrinterFill },
    { key: 'installation', label: 'Instalaciones', icon: Hammer },
    { key: 'maintenance', label: 'Mantenimientos', icon: Tools }
];

export const Home = () => {
    const [activeTab, setActiveTab] = useState('design');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('design');

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

    const handleShowModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    return (
        <Container className="py-4">
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
            >
                {serviceTypes.map(({ key, label, icon: Icon }) => {
                    // Obtenemos el componente de ícono de la configuración del modal
                    const ModalIcon = modalConfigurations[key]?.IconComponent || Icon;

                    return (
                        <Tab
                            key={key}
                            eventKey={key}
                            title={
                                <span>
                                    <Icon className="me-2" />
                                    {label}
                                </span>
                            }
                        >
                            <div className="d-flex justify-content-end mb-3">
                                <Button
                                    variant="primary"
                                    onClick={() => handleShowModal(key)}
                                >
                                    <ModalIcon className="me-2" />
                                    {modalConfigurations[key]?.options?.submitText || `Agregar ${label}`}
                                </Button>
                            </div>

                            <ServiceList type={key} services={services} />
                        </Tab>
                    );
                })}
            </Tabs>

            {showModal && (
                <ServiceForm
                    type={modalType}
                    onClose={() => setShowModal(false)}
                    addService={addService}
                />
            )}
        </Container>
    );
};