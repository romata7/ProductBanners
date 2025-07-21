import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { services } from "./services"
import { commonFields } from "./commonFields"
import { serviceModels } from "./serviceModels"
import { useState } from "react"
import { TextField, NumberField, TextareaField, SelectField } from "./Fields"

const GenericModal = ({ type, showModal, handleClose, tratarDatos }) => {

    const service = services[type]
    const [formData, setFormData] = useState(serviceModels[type]);
    const [errors, setErrors] = useState({})

    const ServiceIcon = service.icon;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        Object.entries(formData).forEach(([key, value]) => {
            const fieldConfig = commonFields[key];

            if (!fieldConfig) return;

            const { required = false } = fieldConfig.attributes || {};
            const { validation } = fieldConfig;

            if (required && !value) {
                newErrors[key] = validation?.message || 'Este campo es requerido';
                formIsValid = false;
                return;
            }

            if (validation && value && !validation.validator(value)) {
                newErrors[key] = validation.message;
                formIsValid = false;
            }
        });

        setErrors(newErrors);

        if (formIsValid) {
            const calculatedValues = {
                total: (parseFloat(Number(formData.quantity)) * parseFloat(formData.cost)).toFixed(2),
                id: Date.now(),
                date: Date().toLocaleString()
            }
            const newFormData = { ...formData, ...calculatedValues }
            tratarDatos(newFormData);
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title><ServiceIcon /> {service.header}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    {Object.keys(formData).map((key) => {
                        const attributes = commonFields[key].attributes
                        return (
                            <Form.Group key={key} className="mb-3">
                                {
                                    attributes.type === "number" ? (
                                        <NumberField
                                            {...attributes}
                                            value={formData[attributes.name]}
                                            onChange={handleChange}
                                            isInvalid={!!errors[attributes.name]}
                                            invalidFeedback={errors[attributes.name]}
                                        />
                                    ) : attributes.type === 'select' ? (
                                        <SelectField
                                            {...attributes}
                                            value={formData[attributes.name]}
                                            onChange={handleChange}
                                            isInvalid={!!errors[attributes.name]}
                                            invalidFeedback={errors[attributes.name]}
                                        />
                                    ) : attributes.type === 'textarea' ? (
                                        <TextareaField
                                            {...attributes}
                                            value={formData[attributes.name]}
                                            onChange={handleChange}
                                            isInvalid={!!errors[attributes.name]}
                                            invalidFeedback={errors[attributes.name]}
                                            rows={4}
                                        />
                                    ) : (
                                        <TextField
                                            {...attributes}
                                            value={formData[attributes.name]}
                                            onChange={handleChange}
                                            isInvalid={!!errors[attributes.name]}
                                            invalidFeedback={errors[attributes.name]}
                                        />
                                    )
                                }
                            </ Form.Group>
                        )
                    })}

                    <Form.Group className="mb-3 text-left">
                        <FloatingLabel label="Total">
                            <Form.Control
                                as="input"
                                type="text"
                                value={`S/${(parseFloat(formData.quantity || 0) * parseFloat(formData.cost || 0)).toFixed(2)}`}
                                readOnly
                                className="fs-4"
                                style={{
                                    backgroundColor: '#f8f9fa', // Color de fondo similar
                                    border: '1px solid #ced4da', // Borde idéntico
                                    cursor: 'default' // Evita el cursor de texto
                                }}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                        Agregar {service.header}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default GenericModal;