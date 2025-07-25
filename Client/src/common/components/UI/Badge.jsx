import { Badge as BootstrapBadge } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Badge = ({
    children,
    variant = 'primary',
    pill = false,
    className = '',
    ...props
}) => {
    return (
        <BootstrapBadge
            bg={variant}
            pill={pill}
            className={`${className}`}
            {...props}
        >
            {children}
        </BootstrapBadge>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
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
    pill: PropTypes.bool,
    className: PropTypes.string
};

export default Badge;