import { BaseSyntheticEvent } from "react";

export interface IInput {
  handleChange?: (e: BaseSyntheticEvent) => void;
  type?: string;
  placeholder?: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  classes?: string;
  handleClick?: (e: any) => void;
}