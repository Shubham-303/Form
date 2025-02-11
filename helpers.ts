export const INPUT_FIELD = 'inputField';
export const FILE_INPUT_FIELD = 'fileInputField';
export const STATIC_SELECT = 'staticSelect';

export interface Item {
  name: string;
  type: string;
  label: string;
  description?: string;
  placeholder?: string;
  options?: string[];
  gridSpan?: number;
  inputStyle?: any
}