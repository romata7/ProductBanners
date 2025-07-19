import { commonColumns, commonSummaries } from './commonColumns';

export const listConfigurations = {
    design: {
        columns: [
            commonColumns.quantity,
            commonColumns.dimensions,
            commonColumns.description,
            commonColumns.cost,
            commonColumns.total
        ],
        summary: commonSummaries.withDimensions
    },
    impression: {
        columns: [
            commonColumns.quantity,
            commonColumns.dimensions,
            { ...commonColumns.description, header: 'Impresión' },
            commonColumns.cost,
            commonColumns.total
        ],
        summary: commonSummaries.withDimensions
    },
    installation: {
        columns: [
            commonColumns.quantity,
            commonColumns.description,
            commonColumns.location,
            commonColumns.cost,
            commonColumns.total
        ],
        summary: commonSummaries.withLocation
    },
    maintenance: {
        columns: [
            commonColumns.quantity,
            { ...commonColumns.description, header: 'Mantenimiento' },
            commonColumns.location,
            commonColumns.cost,
            commonColumns.total
        ],
        summary: commonSummaries.withLocation
    }
};