import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

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
      value={value ? moment(value) : undefined}
      name={name}
    />
  );
}
