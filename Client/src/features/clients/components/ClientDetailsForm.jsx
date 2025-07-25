import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';

const ClientDetailsForm = ({ client, onChange }) => {
    return (
        <>
            <FloatingLabel controlId="nombrers" label="Nombre/Razón Social" className="mb-3">
                <Form.Control
                    type="text"
                    name="nombrers"
                    value={client?.nombrers || ""}
                    onChange={onChange}
                    placeholder=" "
                />
            </FloatingLabel>

            <FloatingLabel controlId="direccion" label="Dirección" className="mb-3">
                <Form.Control
                    type="text"
                    name="direccion"
                    value={client?.direccion || ""}
                    onChange={onChange}
                    placeholder=" "
                />
            </FloatingLabel>

            <InputGroup className="mb-3">
                <FloatingLabel controlId="telefono" label="Teléfono/Celular">
                    <Form.Control
                        type="tel"
                        name="telefono"
                        value={client?.telefono || ""}
                        onChange={onChange}
                        placeholder=" "
                        maxLength={15}
                    />
                </FloatingLabel>
                <InputGroup.Text>
                    <TelephoneFill />
                </InputGroup.Text>
            </InputGroup>
        </>
    );
};

export default ClientDetailsForm;