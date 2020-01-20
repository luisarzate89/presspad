import React from "react";
import { DatePicker } from "antd";

export default function DatePickerComponent({
  placeholder,
  value,
  onChange,
  error,
  name
}) {
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
