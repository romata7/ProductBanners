import { Hammer, PencilFill, PrinterFill, Tools } from "react-bootstrap-icons";
import { serviceModels } from "./serviceModels";
import { commonFields } from "./commonFields";

export const modalConfigurations = {
    design: {
        title: 'Nuevo Diseño',
        IconComponent: PencilFill,
        initialValues: serviceModels.design,
        fields: [
            commonFields.quantity,
            ...commonFields.dimensions,
            commonFields.description,
            commonFields.cost
        ],
        calculatedValues: {
            total: data => data.quantity * data.cost,
            id: () => Date.now(),
            date: () => new Date().toLocaleString()
        },
        options: {
            size: 'sm',
            submitText: 'Agregar Diseño',
            showTotal: true,
            formatTotal: value => `S/${value.toFixed(2)}`
        }
    },
    impression: {
        title: 'Nueva Impresión',
        IconComponent: PrinterFill,
        initialValues: serviceModels.impression,
        fields: [
            commonFields.quantity,
            ...commonFields.dimensions,
            commonFields.description,
            commonFields.cost
        ],
        calculatedValues: {
            total: data => data.quantity * data.cost,
            id: () => Date.now(),
            date: () => new Date().toLocaleString()
        },
        options: {
            size: 'sm',
            submitText: 'Agregar Impresión',
            showTotal: true,
            formatTotal: value => `S/${value.toFixed(2)}`
        }
    },
    installation: {
        title: 'Nueva Instalación',
        IconComponent: Hammer,
        initialValues: serviceModels.installation,
        fields: [
            commonFields.quantity,
            commonFields.description,
            commonFields.location,
            commonFields.cost
        ],
        calculatedValues: {
            total: data => data.quantity * data.cost,
            id: () => Date.now(),
            date: () => new Date().toLocaleString()
        },
        options: {
            size: 'sm',
            submitText: 'Agregar Instalación',
            showTotal: true,
            formatTotal: value => `S/${value.toFixed(2)}`
        }
    },
    maintenance: {
        title: 'Nuevo Mantenimiento',
        IconComponent: Tools,
        initialValues: serviceModels.maintenance,
        fields: [
            commonFields.quantity,
            commonFields.description,
            commonFields.location,
            commonFields.cost
        ],
        calculatedValues: {
            total: data => data.quantity * data.cost,
            id: () => Date.now(),
            date: () => new Date().toLocaleString()
        },
        options: {
            size: 'sm',
            submitText: 'Agregar Mantenimiento',
            showTotal: true,
            formatTotal: value => `S/${value.toFixed(2)}`
        }
    }
};