import { Badge, ListGroup } from "react-bootstrap";
import { ChatLeftText, GeoAltFill, Rulers } from "react-bootstrap-icons";
import { serviceMetadata } from "./serviceMetadata";

export const ServiceList = ({ services, total = 0.00 }) => {
    const newServices = Object.fromEntries(
        Object.entries(services).filter(([_, value]) => value.length > 0)
    );

    if (Object.keys(newServices).length === 0) {
        return <div className="alert alert-info">
            No hay servicios registrados
        </div>
    }

    return (
        <>
            {Object.entries(newServices).map(([serviceType, items]) => {
                const subTotal = items.reduce((sum, item) => sum + parseFloat(item.total || 0), 0);
                return (
                    <div key={serviceType}>
                        <ServiceSection
                            key={serviceType}
                            type={serviceType}
                            items={items}
                        />
                        <div className="text-end mb-3">
                            <Badge bg="info" className="fs-6">
                                Subtotal: S/{subTotal.toFixed(2)}
                            </Badge>
                        </div>
                    </div>
                )
            })}

            <div className="text-end mt-3">
                <Badge bg="warning" className="fs-5 p-2" text="dark">
                    Total: S/{parseFloat(total).toFixed(2)}
                </Badge>
            </div>
        </>
    );
};

const ServiceSection = ({ type, items }) => {
    const ServiceIcon = serviceMetadata[type].Icon;

    return (
        <ListGroup className="shadow-sm mb-1">
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
                            <Badge bg="secondary" className="fs-7">
                                {`S/${parseFloat(item.total).toFixed(2)}`}
                            </Badge>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};