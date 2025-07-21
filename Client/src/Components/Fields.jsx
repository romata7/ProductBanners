import { Form } from "react-bootstrap";
import { FieldWrapper } from "./FieldWrapper";

export const NumberField = ({
    name,
    label,
    required = false,
    min = 1,
    step = 1,
    isInvalid,
    invalidFeedback,
    ...props
}) => (
    <FieldWrapper
        name={name}
        label={label}
        required={required}
        isInvalid={isInvalid}
        invalidFeedback={invalidFeedback}
    >
        <Form.Control
            type="number"
            name={name}
            required={required}
            min={min}
            step={step}
            placeholder=""
            {...props}
        />
    </FieldWrapper>
);

export const SelectField = ({
    name,
    label,
    required = false,
    options = [],
    isInvalid,
    invalidFeedback,
    ...props
}) => (
    <FieldWrapper
        name={name}
        label={label}
        required={required}
        options={options}
        isInvalid={isInvalid}
        invalidFeedback={invalidFeedback}
    >
        <Form.Select
            name={name}
            required={required}
            isInvalid={isInvalid}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Form.Select>
    </FieldWrapper>
);

export const TextareaField = ({
    name,
    label,
    required = false,
    rows = 3,
    isInvalid,
    invalidFeedback,
    ...props
}) => (
    <FieldWrapper
        name={name}
        label={label}
        required={required}
        isInvalid={isInvalid}
        invalidFeedback={invalidFeedback}
    >
        <Form.Control
            as="textarea"
            name={name}
            required={required}
            style={{ height: `${rows * 24}px` }}
            isInvalid={isInvalid}
            placeholder=""
            {...props}
        />
    </FieldWrapper>
);

export const TextField = ({
    name,
    label,
    required = false,
    isInvalid,
    invalidFeedback,
    ...props
}) => (
    <FieldWrapper
        name={name}
        label={label}
        required={required}
        isInvalid={isInvalid}
        invalidFeedback={invalidFeedback}
    >
        <Form.Control
            type="text"
            name={name}
            required={required}
            placeholder=""
            {...props}
        />
    </FieldWrapper>
);