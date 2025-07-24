import axios from 'axios';
import { useRef, useState } from 'react';
import {
    Form,
    FloatingLabel,
    InputGroup,
    ListGroup,
    Card,
    Button,
    Badge,
    Spinner,
    Alert
} from 'react-bootstrap';
import { PersonFill, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';


const Client = ({ client, setClient }) => {
    const [list, setList] = useState([]);
    const inputRef = useRef(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Configuración de validaciones
    const FIELD_VALIDATIONS = {
        dniruc: {
            pattern: /^\d*$/,
            maxLength: 11,
            error: "Solo números permitidos"
        },
        telefono: {
            pattern: /^\d*$/,
            maxLength: 15,
            error: "Solo números permitidos"
        }
    }

    // Manejo de búsqueda con debounce
    const handleOnKeyUp = async () => {
        const value = inputRef.current?.value.trim();

        if (!value) {
            setList([]);
            resetClient();
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:4004/api/clients', {
                params: { dniruc: value }
            });
            setList(response.data);
        } catch (err) {
            console.error("Error fetching clients:", err);
            setError("Error al cargar clientes");
            setList([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        let newValue = value;
        let error = null;

        //Aplicar validaciones si el campo está configurado
        if (FIELD_VALIDATIONS[name]) {
            const { pattern, maxLength } = FIELD_VALIDATIONS[name];

            //Validar Patrón
            if (!pattern.test(value)) {
                error = FIELD_VALIDATIONS[name].error;
                newValue = client[name] //Mantener valor anterior
            };

            //Validar longitud máxima
            if (value.length > maxLength) {
                newValue = value.slice(0, maxLength);
            }
        }

        setClient(prev => ({ ...prev, [name]: newValue }));
    };

    const resetClient = () => {
        setClient({
            dniruc: "",
            nombrers: "",
            direccion: "",
            telefono: "",
        });
    }

    const handleClientClick = (listClient) => {
        setClient(listClient);
        setList([]);
        setShowSuggestions(false);
    }

    return (
        <div className='mb-3'>
            <h5 className="mb-3">
                <PersonFill className="me-2" />
                Información del Cliente
            </h5>
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Form.Group className="mb-3 position-relative">
                <FloatingLabel controlId="dniruc" label="D.N.I./RUC">
                    <Form.Control
                        ref={inputRef}
                        type="text"
                        name="dniruc"
                        value={client?.dniruc || ""}
                        onKeyUp={handleOnKeyUp}
                        onChange={handleChange}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        autoFocus
                        autoComplete="off"
                        maxLength={11}
                        placeholder=" "
                    />
                </FloatingLabel>

                {loading && (
                    <div className="position-absolute end-0 top-0 mt-3 me-2">
                        <Spinner animation="border" size="sm" />
                    </div>
                )}

                {showSuggestions && list.length > 0 && (
                    <ListGroup className="position-absolute w-100 mt-1 shadow" style={{ zIndex: 1000 }}>
                        {list.map((listClient) => (
                            <ListGroup.Item
                                key={listClient.dniruc}
                                action
                                onClick={() => handleClientClick(listClient)}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <PersonFill className="me-2 text-primary" />
                                    <Badge bg="light" text="dark" className="me-2">
                                        {listClient.dniruc}
                                    </Badge>
                                    {listClient.nombrers}
                                </div>
                                <small className="text-muted">Click para seleccionar</small>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Form.Group>

            <FloatingLabel controlId="nombrers" label="Nombre/Razón Social" className="mb-3">
                <Form.Control
                    type="text"
                    name="nombrers"
                    value={client?.nombrers || ""}
                    onChange={handleChange}
                    placeholder=" "
                />
            </FloatingLabel>

            <FloatingLabel controlId="direccion" label="Dirección" className="mb-3">
                <Form.Control
                    type="text"
                    name="direccion"
                    value={client?.direccion || ""}
                    onChange={handleChange}
                    placeholder=" "
                />
            </FloatingLabel>

            <InputGroup className="mb-3">
                <FloatingLabel controlId="telefono" label="Teléfono/Celular">
                    <Form.Control
                        type="tel"
                        name="telefono"
                        value={client?.telefono || ""}
                        onChange={handleChange}
                        placeholder=" "
                        maxLength={15}
                    />
                </FloatingLabel>
                <InputGroup.Text>
                    <TelephoneFill />
                </InputGroup.Text>
            </InputGroup>

            <div className="d-flex justify-content-end">
                <Button
                    variant="outline-danger"
                    onClick={resetClient}
                    size="sm"
                >
                    Limpiar Campos
                </Button>
            </div>
        </div>
    );
};

export default Client;