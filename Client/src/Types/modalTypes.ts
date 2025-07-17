// types/modalTypes.ts
interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  label: string;
  validation?: {
    required?: boolean;
    validator?: (value: any) => boolean;
    message?: string;
  };
  attributes?: {
    step?: number | string;
    min?: number;
    max?: number;
    rows?: number;
    options?: Array<{ value: string | number; label: string }>;
  };
}

interface ModalConfig {
  title: string;
  icon: React.ComponentType;
  initialValues: Record<string, any>;
  fields: FieldConfig[];
  calculatedValues?: Record<string, (data: Record<string, any>) => any>;
  options?: {
    size?: 'sm' | 'lg' | 'xl';
    submitText?: string;
    showTotal?: boolean;
  };
}