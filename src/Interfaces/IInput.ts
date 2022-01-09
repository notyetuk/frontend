import { BaseSyntheticEvent } from "react";

export interface IInput {
  handleChange: (e: BaseSyntheticEvent) => void;
  type?: string;
  placeholder: string;
  value?: string;
  required?: boolean;
}