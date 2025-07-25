import { ListGroup, Badge } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';

const ClientSuggestions = ({ suggestions, onSelect }) => {
    return (
        <ListGroup className="position-absolute w-100 mt-1 shadow" style={{ zIndex: 1000 }}>
            {suggestions.map((client) => (
                <ListGroup.Item
                    key={client.dniruc}
                    action
                    onClick={() => onSelect(client)}
                    className="d-flex justify-content-between align-items-center"
                >
                    <div>
                        <PersonFill className="me-2 text-primary" />
                        <Badge bg="light" text="dark" className="me-2">
                            {client.dniruc}
                        </Badge>
                        {client.nombrers}
                    </div>
                    <small className="text-muted">Click para seleccionar</small>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ClientSuggestions;