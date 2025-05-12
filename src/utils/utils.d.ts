export interface ValidationRule {
    validate?: (value: string) => string;
    required?: boolean;
  }