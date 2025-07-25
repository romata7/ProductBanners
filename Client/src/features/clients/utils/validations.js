export const validateClientField = (fieldName, value, previousValue) => {
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
    };

    if (FIELD_VALIDATIONS[fieldName]) {
        const { pattern, maxLength } = FIELD_VALIDATIONS[fieldName];

        if (!pattern.test(value)) {
            return previousValue;
        }

        if (value.length > maxLength) {
            return value.slice(0, maxLength);
        }
    }

    return value;
};