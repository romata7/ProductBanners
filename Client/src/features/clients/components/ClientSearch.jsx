import { Form, FloatingLabel, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';

const ClientSearch = ({
    searchTerm,
    suggestions,
    loading,
    onChange,
    onSearch,
    onSelect,
    showSuggestions
}) => {
    return (
        <Form.Group className="mb-3 position-relative">
            <FloatingLabel controlId="dniruc" label="D.N.I./RUC">
                <Form.Control
                    type="text"
                    name="dniruc"
                    value={searchTerm}
                    onChange={onChange}
                    onKeyUp={onSearch}
                    onFocus={() => showSuggestions(true)}
                    onBlur={() => setTimeout(() => showSuggestions(false), 200)}
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

            {showSuggestions && suggestions.length > 0 && (
                <ClientSuggestions
                    suggestions={suggestions}
                    onSelect={onSelect}
                />
            )}
        </Form.Group>
    );
};

export default ClientSearch;