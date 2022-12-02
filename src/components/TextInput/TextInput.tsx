import React, { FC } from "react";
import { InputText } from "primereact/inputtext";
import { useField } from "formik";

interface TextInputProps {
  label: string;
  name: string;
  id: string;
  help?: string | undefined;
  isPassword?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  label,
  name,
  id,
  help,
  isPassword = false,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="field">
      <span className="field p-float-label mb-0">
        <InputText
          id={id}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={name}
          className="block"
          type={isPassword ? "password" : "text"}
        />
        <label htmlFor="username" className="block">
          {label}
        </label>
      </span>

      {help && meta.error === null && (
        <small id={`${id}-help`} className="block">
          {help}
        </small>
      )}
      {meta.error && (
        <small id={`${id}-error`} className="p-error block">
          {meta.touched && meta.error}
        </small>
      )}
    </div>
  );
};

export default TextInput;
