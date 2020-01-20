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
  fullHeight,
  parent,
  hint
}) {
  return (
    <>
      <Label
        htmlFor={
          parent ? `${parent}${name[0].toUpperCase()}${name.slice(1)}` : name
        }
      >
        {label}
      </Label>

      {type === "text" && (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
          parent={parent}
        />
      )}

      {type === "textArea" && (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
          parent={parent}
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
          parent={parent}
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
          parent={parent}
        />
      )}

      {type === "file" && (
        <File
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          name={name}
          parent={parent}
          handleError={handleError}
          hint={hint}
        />
      )}
    </>
  );
}
