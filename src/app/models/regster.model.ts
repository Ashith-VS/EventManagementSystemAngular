export interface RegisterModel {
    id: string;
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    isrequired: boolean;
    ispattern?: string;
    patternErrorMessage?: string;
  }