import React from "react";
type Props = {
 
  type?: string;
  value: string;
  onChange: (e: string) => void;
  placeholder: string;
  label: string;
  textarea?: boolean;
};
const FormField = ({
 
  type,
  value,
  onChange,
  placeholder,
  label,
  textarea,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      {!textarea ? (
        <input
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          required
          className="form_field-input"
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <textarea
          value={value}
          placeholder={placeholder}
          rows={5}
          required
          className="form_field-input"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
