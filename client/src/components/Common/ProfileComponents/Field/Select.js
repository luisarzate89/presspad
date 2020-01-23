import React from "react";
import { Select } from "antd";

import { ErrorWrapper, Error } from "../ProfileComponents.style";

const { Option } = Select;

export default function SelectComponent({
  placeholder,
  value,
  handleChange,
  error,
  name,
  options,
  parent,
}) {
  const onChange = value => {
    handleChange({ value, key: name, parent });
  };

  return (
    <>
      <ErrorWrapper error={error} marginBottom="12px">
        <Select
          style={{ width: "100%" }}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          value={value}
        >
          {options.map(option => (
            <Option value={option} key={option}>
              {option}
            </Option>
          ))}
        </Select>
      </ErrorWrapper>
      {error && <Error block>{error}</Error>}
    </>
  );
}
