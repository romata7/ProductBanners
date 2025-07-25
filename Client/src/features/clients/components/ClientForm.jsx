import { useClient } from '../hooks/useClient';
import ClientSearch from './ClientSearch';
import ClientDetailsForm from './ClientDetailsForm';
import { AlertNotification, LoadingSpinner } from '../../../common/components/UI';
import { PersonFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

const ClientForm = ({ client, setClient }) => {
    const {
        searchTerm,
        suggestions,
        loading,
        error,
        handleSearch,
        handleInputChange,
        handleClientSelect,
        resetClient,
        showSuggestions,
        setShowSuggestions
    } = useClient(client, setClient);

    return (
        <div className="mb-3">
            <h5 className="mb-3">
                <PersonFill className="me-2" />
                Información del Cliente
            </h5>

            {error && (
                <AlertNotification
                    variant="danger"
                    message={error}
                    onClose={() => setError(null)}
                />
            )}

            <ClientSearch
                searchTerm={searchTerm}
                suggestions={suggestions}
                loading={loading}
                onChange={handleInputChange}
                onSearch={handleSearch}
                onSelect={handleClientSelect}
                setShowSuggestions={setShowSuggestions}
            />

            <ClientDetailsForm
                client={client}
                onChange={handleInputChange}
            />

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

export default ClientForm;