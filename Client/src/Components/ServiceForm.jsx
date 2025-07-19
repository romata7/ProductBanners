import { modalConfigurations } from "./modalConfigurations";
import { useServices } from "./useServices";

export const ServiceForm = ({ type, onSuccess }) => {
    const config = modalConfigurations[type];
    const { addService } = useServices();

    const handleSubmit = (data) => {
        addService(type, data);
        onSuccess?.();
    };

    return <ModalForm config={config} onSubmit={handleSubmit} />;
};