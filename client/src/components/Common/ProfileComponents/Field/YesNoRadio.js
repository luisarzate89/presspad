import React from "react";

import { Radio } from "antd";

export default function YesNoRadio({
  placeholder,
  value,
  handleChange,
  error,
  name,
  options,
  parent
}) {
  const onChange = e => {
    const { value } = e.target;
    handleChange({ value, key: name, parent });
  };

  return (
    <Radio.Group onChange={onChange} value={!!value}>
      <Radio value={true}>Yes</Radio>
      <Radio value={false}>No</Radio>
    </Radio.Group>
  );
}
