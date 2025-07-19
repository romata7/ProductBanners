import { Badge, ListGroup, Row, Col } from "react-bootstrap";
import { GeoAltFill, Rulers } from "react-bootstrap-icons";
import { icons } from "./icons";

export const ServiceList = ({ services }) => {
    const newServices = Object.fromEntries(
        Object.entries(services).filter(([_, value]) => value.length > 0)
    );

    if (Object.keys(newServices).length === 0) {
        return <p>No hay servicios registrados</p>;
    }

    return (
        <>
            {Object.entries(newServices).map(([serviceType, items]) => (
                <ServiceSection
                    key={serviceType}
                    type={serviceType}
                    items={items}
                />
            ))}
        </>
    );
};

const ServiceSection = ({ type, items }) => {
    const ServiceIcon = icons[type]; // Obtenemos el componente de ícono correspondiente

    return (
        <ListGroup className="mb-4 shadow-sm">
            {items.map((item, index) => (
                <ListGroup.Item key={`${type}-${index}`} className="py-3">
                    <div className="d-flex gap-2 justify-content-between">

                        <div>
                            <h5 className="mb-1 d-flex align-items-center">
                                <ServiceIcon className="me-2" />
                                <span className="text-dark">{item.description}</span>
                            </h5>

                            <div className="d-flex flex-wrap gap-3 text-muted small">
                                {item?.width && item?.height && item?.unit && (
                                    <span className="d-flex align-items-center">
                                        <Rulers className="me-1" />
                                        {`${item.width} × ${item.height} ${item.unit}`}
                                    </span>
                                )}

                                {item?.location && (
                                    <span className="d-flex align-items-center">
                                        <GeoAltFill className="me-1" />
                                        {item.location}
                                    </span>
                                )}

                                {item?.notes && (
                                    <span className="d-flex align-items-center">
                                        <ChatLeftText className="me-1" />
                                        {item.notes}
                                    </span>
                                )}

                                {item?.quantity && item?.cost && (
                                    <span>
                                        {`${item.quantity} × S/${parseFloat(item.cost).toFixed(2)}`}
                                    </span>
                                )}
                            </div>
                        </div>


                        <div>
                            <Badge pill bg="secondary" className="fs-6">
                                {`Total: S/${parseFloat(item.total).toFixed(2)}`}
                            </Badge>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};