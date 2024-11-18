export interface LoginModel {
    id: string;
    label: string;
    type: string;
    name: string;
    placeholder: string;
    isrequired: boolean;
    ispattern?: string;
    patternErrorMessage?: string;
  }