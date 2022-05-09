import { BaseSyntheticEvent } from "react";

export interface IInput {
  handleChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  classes?: string;
  handleClick?: (e: any) => void;
  error?: boolean;
}
