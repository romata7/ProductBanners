import { modalConfigurations } from "./modalConfigurations";
import { ModalForm } from "./ModalForm";

export const ServiceForm = ({ type, onClose, addService }) => {
    const config = modalConfigurations[type];

    const handleSubmit = (data) => {        
        addService(type, data);
        onClose();
    };

    return <ModalForm config={config} onSubmit={handleSubmit} />;
};