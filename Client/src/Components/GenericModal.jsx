import React from 'react';
import { Modal, Button, Form, FloatingLabel, Row } from 'react-bootstrap';

const GenericModal = ({
    isOpen,
    onClose,
    title,
    IconComponent,
    initialValues,
    config,
    onSubmit
}) => {
    const [formValues, setFormValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const validateField = (field) => {
        if (!field.validation) return true;

        const value = formValues[field.name];
        const { required, validator, message } = field.validation;

        // Solo validar si es requerido o si tiene valor
        if (required && !value) {
            return message || `${field.label} es requerido`;
        }

        // Validar con el validador solo si hay valor (a menos que sea requerido)
        if (validator && value && !validator(value)) {
            return message || `${field.label} no es válido`;
        }

        return null;
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        config.fields.forEach(field => {
            const error = validateField(field);
            if (error) {
                newErrors[field.name] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const calculatedData = config.calculatedValues
            ? Object.entries(config.calculatedValues).reduce((acc, [key, fn]) => {
                acc[key] = fn(formValues);
                return acc;
            }, {})
            : {};

        onSubmit({
            ...formValues,
            ...calculatedData
        });

        onClose();
    };

    const renderInputField = (field) => {
        const commonProps = {
            name: field.name,
            value: formValues[field.name] ?? '',
            onChange: handleChange,
            isInvalid: !!errors[field.name],
            placeholder: ' ',
            ...field.attributes
        };

        switch (field.type) {
            case 'select':
                return (
                    <Form.Select {...commonProps}>
                        {field.attributes?.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                );

            case 'textarea':
                return (
                    <Form.Control
                        as="textarea"
                        style={{ height: `${field.attributes?.rows || 5}rem` }}
                        {...commonProps}
                    />
                );

            default:
                return <Form.Control type={field.type} {...commonProps} />;
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} size={config.options?.size || 'sm'}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {IconComponent && <IconComponent className="me-2" />}
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className="g-2">
                        {config.fields.map(field => (
                            <FloatingLabel
                                key={field.name}
                                controlId={field.name}
                                label={field.label}
                                className="mb-3"
                            >
                                {renderInputField(field)}
                                <Form.Control.Feedback type="invalid">
                                    {errors[field.name]}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        ))}

                        {config.options?.showTotal && (
                            <div className="text-end mt-3">
                                <h5>
                                    {config.options.formatTotal
                                        ? config.options.formatTotal(
                                            config.calculatedValues?.total?.(formValues) || 0
                                        )
                                        : `Total: ${formatCurrency(
                                            config.calculatedValues?.total?.(formValues) || 0
                                        )}`
                                    }
                                </h5>
                            </div>
                        )}
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        {config.options?.submitText || 'Guardar'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default GenericModal;