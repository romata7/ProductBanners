import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

export const FieldWrapper = ({
    children,
    label,
    name,
    invalidFeedback,
    isInvalid
}) => (
    <div className="mb-3">
        <FloatingLabel controlId={name} label={label}>
            {React.cloneElement(children, { isInvalid })}
            {isInvalid && (
                <Form.Control.Feedback type="invalid">
                    {invalidFeedback}
                </Form.Control.Feedback>
            )}
        </FloatingLabel>
    </div>
);