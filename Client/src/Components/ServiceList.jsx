import { Table } from "react-bootstrap";
import { listConfigurations } from "./listConfigurations";
import { useServices } from "./useServices"

export const ServiceList = ({ type }) => {
    const { services } = useServices();
    const config = listConfigurations[type];

    return (
        <Table
            // columns={config.columns}
            data={services[type]}
            rowkey='id'
        />
    );
}