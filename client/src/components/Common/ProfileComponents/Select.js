import React from "react";
import { Select } from "antd";

const { Option } = Select;

export default function SelectComponent({
  placeholder,
  value,
  onChange,
  error,
  name,
  options
}) {
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
