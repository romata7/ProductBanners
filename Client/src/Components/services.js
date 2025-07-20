import { Hammer, PencilFill, PrinterFill, Tools } from "react-bootstrap-icons";

export const services = {
    design: {
        header: 'Diseño',
        icon: PencilFill,
        textColor: 'text-primary'
    },
    impression: {
        header: 'Impresión',
        icon: PrinterFill,
        textColor: 'text-secondary'
    },
    installation: {
        header: 'Instalación',
        icon: Hammer,
        textColor: 'text-info'
    },
    maintenance: {
        header: 'Mantenimiento',
        icon: Tools,
        textColor: 'text-success'
    }
}