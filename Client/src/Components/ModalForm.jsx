import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const ModalForm = ({ config, onSubmit }) => {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState(config.initialValues);
  const [errors, setErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateField = (field, value) => {
    if (!field.validation) return true;
    
    const { required, validator, message } = field.validation;
    let isValid = true;
    
    if (required && !value) {
      isValid = false;
    } else if (validator && !validator(value)) {
      isValid = false;
    }
    
    if (!isValid) {
      setErrors(prev => ({ ...prev, [field.name]: message }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field.name];
        return newErrors;
      });
    }
    
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formIsValid = true;
    config.fields.forEach(field => {
      const isValid = validateField(field, formData[field.name]);
      if (!isValid) formIsValid = false;
    });
    
    if (formIsValid) {
      const calculated = Object.entries(config.calculatedValues).reduce(
        (acc, [key, fn]) => ({ ...acc, [key]: fn(formData) }),
        {}
      );
      
      onSubmit({ ...formData, ...calculated });
      handleClose();
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <Form.Group controlId={field.name}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              as="select"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              isInvalid={!!errors[field.name]}
              {...field.attributes}
            >
              {field.attributes.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors[field.name]}
            </Form.Control.Feedback>
          </Form.Group>
        );
      
      case 'number':
      case 'text':
      default:
        return (
          <Form.Group controlId={field.name}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              isInvalid={!!errors[field.name]}
              {...field.attributes}
            />
            <Form.Control.Feedback type="invalid">
              {errors[field.name]}
            </Form.Control.Feedback>
          </Form.Group>
        );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size={config.options.size}>
      <Modal.Header closeButton>
        <Modal.Title>
          <config.IconComponent className="me-2" />
          {config.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {config.fields.map(field => (
            <div key={field.name} className="mb-3">
              {renderField(field)}
            </div>
          ))}
          
          {config.options.showTotal && (
            <div className="text-end fw-bold mt-4">
              Total: {config.options.formatTotal(
                formData.quantity * formData.cost || 0
              )}
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {config.options.submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};