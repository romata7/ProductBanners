import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AlertNotification = ({
    variant = 'info',
    message,
    onClose,
    dismissible = true,
    className = ''
}) => {
    return (
        <Alert
            variant={variant}
            onClose={onClose}
            dismissible={dismissible}
            className={`mt-3 ${className}`}
        >
            {message}
        </Alert>
    );
};

AlertNotification.propTypes = {
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
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    dismissible: PropTypes.bool,
    className: PropTypes.string
};

export default AlertNotification;