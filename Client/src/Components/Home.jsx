import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { services as list_services } from './services';
import GenericModal from './GenericModal';

export const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('design');

    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = (type) => {
        setModalType(type)
        setShowModal(true)
    }

    const tratarDatos = (data) => {
        console.log(data);
        setShowModal(false)
    }

    return (
        <Container className="py-4">
            <div className='d-flex gap-2 justify-content-around'>
                {Object.entries(list_services).map(([key, service]) => {
                    const ServiceIcon = service.icon
                    return (
                        <Button
                            key={key}
                            variant='outline-primary'
                            onClick={() => handleShowModal(key)}
                        >
                            <Plus /> <ServiceIcon /> {service.header}
                        </Button>
                    )

                })}
            </div>

            {showModal && (
                <GenericModal
                    type={modalType}
                    showModal={showModal}
                    handleClose={handleCloseModal}
                    tratarDatos={tratarDatos}
                />
            )}

        </Container>
    );
};