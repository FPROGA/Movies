import React, { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  label?: string;
  placeholder?: string;
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  label,
  placeholder,
  errorMessage
}) => {
  return (
    <div>
    <div className="form-field">
      {label && <label className="form-field__label">{label}</label>}
      
      {React.isValidElement(children) 
        ? React.cloneElement(children as React.ReactElement, {
            placeholder: placeholder || undefined,
            className: `form-field__input ${children.props.className || ""}`
          })
        : children}
      
      
    </div>
    {errorMessage && (
        <div className="form-field__error-text">
          {errorMessage}
        </div>
      )}
      </div>
  );
};