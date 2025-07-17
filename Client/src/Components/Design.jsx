import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { PencilFill, ArrowsFullscreen, Rulers, CardText, CurrencyDollar } from 'react-bootstrap-icons';

const Design = ({ designs, setDesigns }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        quantity: 1,
        width: '',
        height: '',
        unit: 'cm', // 'cm' o 'm'
        description: '',
        cost: '',
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
        // if (!formData.width || isNaN(formData.width)) newErrors.width = 'Ancho inválido';
        // if (!formData.height || isNaN(formData.height)) newErrors.height = 'Alto inválido';
        if (!formData.description) newErrors.description = 'Descripción requerida';
        if (!formData.cost || isNaN(formData.cost)) newErrors.cost = 'Costo inválido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateTotal = () => {
        const { quantity, cost } = formData;
        return (parseFloat(cost) * parseInt(quantity)).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newDesign = {
            ...formData,
            total: calculateTotal(),
            id: Date.now(), // ID único temporal
            date: new Date().toLocaleString()
        };

        setDesigns([...designs, newDesign]);
        setFormData({
            quantity: 1,
            width: '',
            height: '',
            unit: 'cm',
            description: '',
            cost: '',
        });
        setShowModal(false);
    };

    return (
        <>
            {/* Botón para abrir el modal */}
            <Button
                variant="outline-dark"
                onClick={() => setShowModal(true)}
            >
                + <PencilFill /> Diseño
            </Button>

            {/* Modal de Diseño */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <PencilFill /> Nuevo Diseño
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row className="g-2">
                            <FloatingLabel controlId="quantity" label="Cantidad">
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    placeholder=' '
                                    value={formData.quantity}
                                    onChange={handleInputChange}                                    
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="width" label="Ancho">
                                <Form.Control
                                    type="number"
                                    name="width"
                                    step="0.01"
                                    placeholder=' '
                                    value={formData.width}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.width}
                                    autoFocus
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.width}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="height" label="Alto">
                                <Form.Control
                                    type="number"
                                    name="height"
                                    step="0.01"
                                    placeholder=' '
                                    value={formData.height}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.height}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.height}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="unit" label="Unidad">
                                <Form.Select
                                    name="unit"
                                    placeholder=' '
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                >
                                    <option value="m">Metros</option>
                                    <option value="cm">Centímetros</option>
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="description" label="Descripción">
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    placeholder=' '
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.description}
                                    style={{ height: '100px' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="cost" label="Costo Unitario (S/)">
                                <Form.Control
                                    type="number"
                                    name="cost"
                                    step="0.01"
                                    placeholder=' '
                                    value={formData.cost}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.cost}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cost}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <h5 className='text-end'>Total:  S/{formData.cost ? calculateTotal() : '0.00'}</h5>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Agregar Diseño
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default Design;