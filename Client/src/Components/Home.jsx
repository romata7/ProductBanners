import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { JournalPlus, Plus } from 'react-bootstrap-icons';
import { serviceMetadata } from './serviceMetadata';
import { GenericModal } from './GenericModal';
import { ServiceList } from './ServiceList';
import Client from './Client';

export const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [typeActive, setTypeActive] = useState('design')
    const [client, setClient] = useState({})
    const [services, setServices] = useState({
        design: [],
        impression: [],
        installation: [],
        maintenance: []
    })
    const [total, setTotal] = useState(0)

    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = (type) => {
        setTypeActive(type)
        setShowModal(true)
    }

    const tratarDatos = (data) => {
        setServices(prevServices => ({
            ...prevServices,
            [typeActive]: [...prevServices[typeActive], data]
        }));
        setShowModal(false);
    }

    useEffect(() => {
        const newTotal = Object.values(services).reduce((sum, serviceArray) => {
            return sum + serviceArray.reduce((subSum, service) => {
                return subSum + parseFloat(service.total || 0);
            }, 0);
        }, 0);

        setTotal(newTotal);
    }, [services]);

    return (
        <Container className="">
            <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary text-white d-flex align-items-center">
                    <h5 className="mb-0 d-flex align-items-center gap-2">
                        <JournalPlus />
                        <span>Registrar Servicio</span>
                    </h5>
                </Card.Header>

                <Card.Body className='p-4'>
                    <Client client={client} setClient={setClient} />
                    <div className='d-flex gap-2 justify-content-around mb-3'>
                        {Object.entries(serviceMetadata).map(([key, service]) => {
                            const ServiceIcon = service.Icon
                            return (
                                <Button
                                    key={key}
                                    variant='outline-primary'
                                    onClick={() => handleShowModal(key)}
                                >
                                    <Plus /> <ServiceIcon /> {service.displayName}
                                </Button>
                            )
                        })}
                    </div>
                    {showModal && (
                        <GenericModal
                            type={typeActive}
                            showModal={showModal}
                            handleClose={handleCloseModal}
                            tratarDatos={tratarDatos}
                        />
                    )}
                    <ServiceList services={services} total={total} />
                </Card.Body>

                <Card.Footer className="d-flex justify-content-end gap-2">
                    <Button
                        variant="outline-secondary"
                        onClick={() => {/* función para limpiar */ }}
                    >
                        Limpiar
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={true}
                    >
                        Registrar Servicio
                    </Button>
                </Card.Footer>
            </Card>

        </Container>
    );
};