import { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Row, Col } from "react-bootstrap";
import { Tools, ClockHistory, Gear, ClipboardCheck } from "react-bootstrap-icons";

const Maintenance = ({ maintenances, setMaintenances }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        type: 'preventivo', // preventivo/correctivo
        equipment: '',
        cost: '',
        duration: '',
        technician: '',
        observations: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.description) newErrors.description = "Descripción requerida";
        if (!formData.equipment) newErrors.equipment = "Equipo requerido";
        if (!formData.cost || isNaN(formData.cost)) newErrors.cost = "Costo inválido";
        if (!formData.duration) newErrors.duration = "Duración requerida";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newMaintenance = {
            ...formData,
            id: Date.now(),
            date: new Date().toLocaleString(),
            status: 'pendiente'
        };

        setMaintenances([...maintenances, newMaintenance]);
        setFormData({
            description: '',
            type: 'preventivo',
            equipment: '',
            cost: '',
            duration: '',
            technician: '',
            observations: ''
        });
        setShowModal(false);
    };

    return (
        <>
            <Button
                variant="outline-dark"
                onClick={() => setShowModal(true)}
                className="d-flex align-items-center gap-1"
            >
                <Tools /> Mantenimiento
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center gap-2">
                        <Tools /> Registro de Mantenimiento
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row className="g-3">
                            <Col md={6}>
                                <FloatingLabel controlId="type" label="Tipo de mantenimiento">
                                    <Form.Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="preventivo">Preventivo</option>
                                        <option value="correctivo">Correctivo</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel controlId="equipment" label="Equipo/Máquina">
                                    <Form.Control
                                        type="text"
                                        name="equipment"
                                        value={formData.equipment}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.equipment}
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.equipment}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>

                            <Col md={12}>
                                <FloatingLabel controlId="description" label="Descripción del trabajo">
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.description}
                                        style={{ height: '100px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel controlId="cost" label="Costo estimado (S/)">
                                    <Form.Control
                                        type="number"
                                        name="cost"
                                        step="0.01"
                                        value={formData.cost}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.cost}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cost}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel controlId="duration" label="Duración estimada">
                                    <Form.Control
                                        type="text"
                                        name="duration"
                                        placeholder="Ej: 2 horas, 1 día"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.duration}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.duration}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel controlId="technician" label="Técnico asignado">
                                    <Form.Control
                                        type="text"
                                        name="technician"
                                        value={formData.technician}
                                        onChange={handleInputChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col md={12}>
                                <FloatingLabel controlId="observations" label="Observaciones">
                                    <Form.Control
                                        as="textarea"
                                        name="observations"
                                        value={formData.observations}
                                        onChange={handleInputChange}
                                        style={{ height: '80px' }}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            <ClipboardCheck className="me-1" /> Registrar Mantenimiento
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default Maintenance;