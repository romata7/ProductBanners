import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoadingSpinner = ({
    size = 'sm',
    variant = 'primary',
    className = '',
    centered = false
}) => {
    return (
        <div className={`${centered ? 'd-flex justify-content-center' : ''} ${className}`}>
            <Spinner
                animation="border"
                role="status"
                size={size}
                variant={variant}
            >
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['sm', undefined]),
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark'
    ]),
    className: PropTypes.string,
    centered: PropTypes.bool
};

export default LoadingSpinner;