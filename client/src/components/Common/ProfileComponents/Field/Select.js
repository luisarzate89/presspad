import React from "react";
import { Select } from "antd";

const { Option } = Select;

export default function SelectComponent({
  placeholder,
  value,
  handleChange,
  error,
  name,
  options,
  parent
}) {
  const onChange = value => {
    handleChange({ value, key: name, parent });
  };

  return (
    <Select
      style={{ width: "100%" }}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      value={value}
    >
      {options.map(option => (
        <Option value={option}>{option}</Option>
      ))}
    </Select>
  );
}
