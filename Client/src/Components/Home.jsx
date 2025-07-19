import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ServiceForm } from './ServiceForm';
import { ServiceList } from './ServiceList';
import { modalConfigurations } from './modalConfigurations';

export const Home = () => {
    const [activeModal, setActiveModal] = useState(null);
    const serviceTypes = Object.keys(modalConfigurations);

    const handleShowModal = (type) => setActiveModal(type);
    const handleCloseModal = () => setActiveModal(null);

    return (
        <div className="container py-4">
            <h1 className="mb-4">Gestión de Servicios</h1>

            {/* Botones para abrir los diferentes modales */}
            <div className="d-flex flex-wrap gap-3 mb-4">
                {serviceTypes.map(type => (
                    <Button
                        key={type}
                        variant="primary"
                        onClick={() => handleShowModal(type)}
                        className="text-capitalize"
                    >
                        {modalConfigurations[type].title}
                    </Button>
                ))}
            </div>

            {/* Modal genérico */}
            <Modal show={!!activeModal} onHide={handleCloseModal} size="lg">
                {activeModal && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {modalConfigurations[activeModal].title}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ServiceForm
                                type={activeModal}
                                onSuccess={handleCloseModal}
                            />
                        </Modal.Body>
                    </>
                )}
            </Modal>

            {/* Listados de servicios */}
            <div className="mt-5">
                {serviceTypes.map(type => (
                    <div key={type} className="mb-5">
                        <h2 className="h4 mb-3 text-capitalize">
                            {modalConfigurations[type].title.replace('Nuevo ', '')}s
                        </h2>
                        <ServiceList type={`${type}s`} />
                    </div>
                ))}
            </div>
        </div>
    );
};