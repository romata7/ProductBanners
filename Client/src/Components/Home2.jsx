import { useState } from "react";
import Client from "./Client";
import Design from "./Design";
import Impression from "./Impression";
import Installation from "./Installation";
import Maintenance from "./Maintenance";
import ServiceList from "./ServiceList";
import { PencilFill, PrinterFill, Hammer, Tools, ClockHistory, Gear } from "react-bootstrap-icons";
import { Badge, Card } from "react-bootstrap";

const Home = () => {
    const [client, setClient] = useState({});
    const [designs, setDesigns] = useState([]);
    const [impressions, setImpressions] = useState([]);
    const [installations, setInstallations] = useState([]);
    const [maintenances, setMaintenances] = useState([]);

    // Estado para controlar las alertas de eliminación
    const [deleteAlert, setDeleteAlert] = useState({
        design: null,
        impression: null,
        installation: null,
        maintenance: null
    });

    // Función genérica para manejar eliminaciones
    const handleDelete = (type, id) => {
        switch (type) {
            case 'design':
                setDesigns(designs.filter(item => item.id !== id));
                break;
            case 'impression':
                setImpressions(impressions.filter(item => item.id !== id));
                break;
            case 'installation':
                setInstallations(installations.filter(item => item.id !== id));
                break;
            case 'maintenance':
                setMaintenances(maintenances.filter(item => item.id !== id));
                break;
        }
        setDeleteAlert({ ...deleteAlert, [type]: null });
    };

    return (
        <div className="container">
            <h3 className="text-center mt-2 mb-4">Registrar Orden</h3>

            {/* Sección Cliente */}
            <Client client={client} setClient={setClient} />

            {/* Sección servicios */}
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <h5 className="mb-3">Seleccionar Servicios</h5>
                    <div className="d-flex flex-wrap gap-1 justify-content-evenly">
                        <Design designs={designs} setDesigns={setDesigns} />
                        <Impression impressions={impressions} setImpressions={setImpressions} />
                        <Installation installations={installations} setInstallations={setInstallations} />
                        <Maintenance maintenances={maintenances} setMaintenances={setMaintenances} />
                    </div>
                </Card.Body>
            </Card>

            {/* Lista de Diseños Registrados */}
            {designs.length > 0 && (
                <ServiceList
                    services={designs}
                    title="Diseños Registrados"
                    icon={<PencilFill />}
                    badgeVariant="primary"
                    onDelete={(id) => handleDelete('design', id)}
                    showDeleteAlert={deleteAlert.design}
                    confirmDelete={(id) => setDeleteAlert({ ...deleteAlert, design: id })}
                    cancelDelete={() => setDeleteAlert({ ...deleteAlert, design: null })}
                    renderDetails={(design) => (
                        <>
                            <div className="fw-bold">{design.description}</div>
                            <small className="text-muted">
                                {design.quantity}x(S/{parseFloat(design.cost).toFixed(2)}) {design.width} x {design.height} {design.unit}
                            </small>
                        </>
                    )}
                />
            )}

            {/* Lista de Impresiones Registradas */}
            {impressions.length > 0 && (
                <ServiceList
                    services={impressions}
                    title="Impresiones Registradas"
                    icon={<PrinterFill />}
                    badgeVariant="success"
                    onDelete={(id) => handleDelete('impression', id)}
                    showDeleteAlert={deleteAlert.impression}
                    confirmDelete={(id) => setDeleteAlert({ ...deleteAlert, impression: id })}
                    cancelDelete={() => setDeleteAlert({ ...deleteAlert, impression: null })}
                    renderDetails={(impression) => (
                        <>
                            <div className="fw-bold">{impression.description}</div>
                            <small className="text-muted">
                                {impression.quantity}x(S/{parseFloat(impression.cost).toFixed(2)}) {impression.width} x {impression.height} {impression.unit}
                            </small>
                        </>
                    )}
                />
            )}

            {/* Lista de Instalaciones Registradas */}
            {installations.length > 0 && (
                <ServiceList
                    services={installations}
                    title="Instalaciones Registradas"
                    icon={<Hammer />}
                    badgeVariant="warning"
                    onDelete={(id) => handleDelete('installation', id)}
                    showDeleteAlert={deleteAlert.installation}
                    confirmDelete={(id) => setDeleteAlert({ ...deleteAlert, installation: id })}
                    cancelDelete={() => setDeleteAlert({ ...deleteAlert, installation: null })}
                    renderDetails={(installation) => (
                        <>
                            <div className="fw-bold">{installation.description}</div>
                            <small className="text-muted">
                                {installation.location} • {installation.quantity} unidades • Complejidad: {installation.complexity}
                            </small>
                        </>
                    )}
                />
            )}

            {/* Lista de Mantenimientos Registrados */}
            {maintenances.length > 0 && (
                <ServiceList
                    services={maintenances}
                    title="Mantenimientos Registrados"
                    icon={<Tools />}
                    badgeVariant="secondary"
                    onDelete={(id) => handleDelete('maintenance', id)}
                    showDeleteAlert={deleteAlert.maintenance}
                    confirmDelete={(id) => setDeleteAlert({ ...deleteAlert, maintenance: id })}
                    cancelDelete={() => setDeleteAlert({ ...deleteAlert, maintenance: null })}
                    renderDetails={(maintenance) => (
                        <>
                            <div className="d-flex align-items-center mb-1">
                                <span className="fw-bold me-2">{maintenance.equipment}</span>
                                <Badge bg={maintenance.type === 'preventivo' ? 'info' : 'warning'} className="text-capitalize">
                                    {maintenance.type}
                                </Badge>
                            </div>
                            <p className="text-muted small mb-2">{maintenance.description}</p>
                            <div className="d-flex gap-3 small">
                                <span className="d-flex align-items-center">
                                    <ClockHistory className="me-1 text-muted" size={14} />
                                    {maintenance.duration}
                                </span>
                                <span className="d-flex align-items-center">
                                    <Gear className="me-1 text-muted" size={14} />
                                    {maintenance.technician || 'Sin asignar'}
                                </span>
                            </div>
                        </>
                    )}
                />
            )}
        </div>
    );
};

export default Home;