import { Table } from "./Table";
import { listConfigurations } from "./listConfigurations";
import { useServices } from "./useServices";

export const ServiceList = ({ type }) => {
    const { services } = useServices();
    const config = listConfigurations[type] || { columns: [] };
    const serviceData = services[type] || [];

    return (
        <Table
            columns={config.columns}
            data={serviceData}
            rowKey="id"
        />
    );
};