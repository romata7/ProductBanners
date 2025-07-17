import { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Row, Col } from "react-bootstrap";
import { Hammer } from "react-bootstrap-icons";

const Installation = ({ installations, setInstallations }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        quantity: 1,
        description: '',
        location: '',
        complexity: 'media', // baja, media, alta
        cost: '',
        notes: ''
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
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = "Cantidad inválida";
        if (!formData.description) newErrors.description = "Descripción requerida";
        if (!formData.location) newErrors.location = "Ubicación requerida";
        if (!formData.cost || isNaN(formData.cost)) newErrors.cost = "Costo inválido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateTotal = () => {
        const { quantity, cost } = formData;
        return (parseFloat(quantity) * parseFloat(cost)).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newInstallation = {
            ...formData,
            total: calculateTotal(),
            id: Date.now(),
            date: new Date().toLocaleString(),
        };
        setInstallations([...installations, newInstallation]);
        setFormData({
            quantity: 1,
            description: '',
            location: '',
            complexity: 'media',
            cost: '',
            notes: ''
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
                <Hammer /> Instalación
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center gap-2">
                        <Hammer /> Nueva Instalación
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row className="g-3">
                            <Col md={4}>
                                <FloatingLabel controlId="quantity" label="Cantidad">
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        min="1"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.quantity}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.quantity}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>

                            <Col md={8}>
                                <FloatingLabel controlId="description" label="Descripción">
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.description}
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel controlId="location" label="Ubicación">
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.location}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.location}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel controlId="complexity" label="Complejidad">
                                    <Form.Select
                                        name="complexity"
                                        value={formData.complexity}
                                        onChange={handleInputChange}
                                    >
                                        <option value="baja">Baja</option>
                                        <option value="media">Media</option>
                                        <option value="alta">Alta</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>

                            <Col md={6}>
                                <FloatingLabel controlId="cost" label="Costo Unitario (S/)">
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

                            <Col md={6}>
                                <div className="bg-light p-3 rounded">
                                    <h5 className="d-flex justify-content-between mb-0">
                                        <span>Total:</span>
                                        <span className="text-primary">
                                            S/ {formData.cost ? calculateTotal() : '0.00'}
                                        </span>
                                    </h5>
                                </div>
                            </Col>

                            <Col md={12}>
                                <FloatingLabel controlId="notes" label="Notas adicionales">
                                    <Form.Control
                                        as="textarea"
                                        name="notes"
                                        value={formData.notes}
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
                            Agregar Instalación
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default Installation;