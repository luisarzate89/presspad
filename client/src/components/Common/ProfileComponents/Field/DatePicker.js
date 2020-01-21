import React from "react";
import { DatePicker } from "antd";

export default function DatePickerComponent({
  placeholder,
  value,
  handleChange,
  error,
  name,
  parent
}) {
  const onChange = value => {
    handleChange({ value, key: name, parent });
  };

  return (
    <DatePicker
      style={{ width: "100%" }}
      onChange={onChange}
      placeholder={placeholder}
      value={value || undefined}
      name={name}
    />
  );
}
