import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { services } from "./services"
import { commonFields } from "./commonFields"
import { serviceModels } from "./serviceModels"
import { useState } from "react"

const GenericModal = ({ type, show, handleClose, handleSubmit }) => {
    const service = services[type]
    const [formData, setFormData] = useState(serviceModels[type]);

    const ServiceIcon = service.icon;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><ServiceIcon /> {service.header}</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    {Object.keys(formData).map((key) => {
                        console.log(key)
                        const field = commonFields[key]
                        console.log(field)
                        return (
                            <div key={key} className="mb-2">
                                <FloatingLabel controlId={field?.name} label={field?.label}>
                                    <Form.Control type={field?.type} placeholder="" />
                                </FloatingLabel>
                            </div>
                        )
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Agregar {service.header}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default GenericModal;