import { Card, Badge } from 'react-bootstrap';
import { PersonFill, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';

const ClientInfoCard = ({ client }) => {
    if (!client?.dniruc) {
        return (
            <Card className="mb-3 shadow-sm">
                <Card.Body className="text-center text-muted">
                    No se ha seleccionado un cliente
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title className="d-flex align-items-center">
                    <PersonFill className="me-2 text-primary" />
                    {client.nombrers || 'Nombre no disponible'}
                    <Badge bg="light" text="dark" className="ms-2">
                        {client.dniruc}
                    </Badge>
                </Card.Title>

                <Card.Text>
                    {client.direccion && (
                        <div className="d-flex align-items-center mb-2">
                            <GeoAltFill className="me-2 text-muted" />
                            <small>{client.direccion}</small>
                        </div>
                    )}

                    {client.telefono && (
                        <div className="d-flex align-items-center">
                            <TelephoneFill className="me-2 text-muted" />
                            <small>{client.telefono}</small>
                        </div>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ClientInfoCard;