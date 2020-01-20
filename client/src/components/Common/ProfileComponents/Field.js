import React from "react";
import Input from "./Input";
import Select from "./Select";
import DatePicker from "./DatePicker";
import File from "./File";
import { Label } from "./ProfileComponents.style";

export default function Field({
  type,
  label,
  placeholder,
  value,
  onChange,
  handleError,
  error,
  name,
  options,
  fullHeight
}) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>

      {type === "text" && (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
        />
      )}

      {type === "textArea" && (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
          showAsTextArea
          fullHeight={fullHeight}
        />
      )}

      {type === "select" && (
        <Select
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
          options={options}
        />
      )}

      {type === "date" && (
        <DatePicker
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
        />
      )}

      {type === "file" && (
        <File
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
          handleError={handleError}
        />
      )}
    </>
  );
}
