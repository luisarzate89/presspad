import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { ErrorWrapper, Error } from "../ProfileComponents.style";

export default function DatePickerComponent({
  placeholder,
  value,
  handleChange,
  error,
  name,
  parent,
}) {
  const onChange = change => {
    handleChange({ value: change, key: name, parent });
  };

  return (
    <>
      <ErrorWrapper error={error} marginBottom="12px">
        <DatePicker
          style={{ width: "100%" }}
          onChange={onChange}
          placeholder={placeholder}
          value={value ? moment(value) : undefined}
          name={name}
        />
      </ErrorWrapper>
      {error && <Error block>{error}</Error>}
    </>
  );
}
