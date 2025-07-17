import { Card, ListGroup, Badge, Alert, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Trash, TrashFill } from 'react-bootstrap-icons';

const ServiceList = ({
    services,
    title,
    icon,
    badgeVariant = 'primary',
    onDelete,
    showDeleteAlert,
    confirmDelete,
    cancelDelete,
    renderDetails,
    deleteTooltip = 'Eliminar servicio'
}) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                    {icon} {title}
                </Card.Title>

                <ListGroup variant="flush">
                    {services.map((service) => (
                        <ListGroup.Item
                            key={service.id}
                            className="d-flex justify-content-between align-items-start position-relative"
                        >
                            <div className="flex-grow-1 pe-3">
                                {renderDetails(service)}
                            </div>

                            <div className="d-flex flex-column align-items-end">
                                <div className="d-flex align-items-center gap-2">
                                    <Badge bg={badgeVariant} className="fs-6 py-2 px-2">
                                        S/ {service.total ? parseFloat(service.total).toFixed(2) : parseFloat(service.cost).toFixed(2)}
                                    </Badge>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{deleteTooltip}</Tooltip>}
                                    >
                                        <Button
                                            variant="link"
                                            className="text-danger p-0"
                                            onClick={() => confirmDelete(service.id)}
                                            aria-label={deleteTooltip}
                                        >
                                            <Trash size={20} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>

                            {showDeleteAlert === service.id && (
                                <Alert
                                    variant="danger"
                                    className="position-absolute end-0 me-4 shadow-sm"
                                    style={{ zIndex: 1000, top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    <div className="d-flex flex-column small">
                                        <p>¿Eliminar este servicio?</p>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => onDelete(service.id)}
                                            >
                                                <TrashFill className="me-1" size={12} /> Eliminar
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={cancelDelete}
                                            >
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                </Alert>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ServiceList;