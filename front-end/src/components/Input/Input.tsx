import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { FormContainer } from "./styles";

interface IInputProps {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements["input"] & IInputProps;
const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);
  return (
    <FormContainer>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </FormContainer>
  );
};
export default Input;
