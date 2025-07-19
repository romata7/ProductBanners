import { modalConfigurations } from "./modalConfigurations";
import { useServices } from "./useServices";
import { ModalForm } from "./ModalForm";

export const ServiceForm = ({ type, onClose }) => {
    const config = modalConfigurations[type];
    const { addService } = useServices();

    const handleSubmit = (data) => {
        addService(type, data);
        onClose();
    };

    return <ModalForm config={config} onSubmit={handleSubmit} />;
};