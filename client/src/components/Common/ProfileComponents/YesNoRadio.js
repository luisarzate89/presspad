import React from "react";

import { Radio } from "antd";

export default function YesNoRadio({
  placeholder,
  value,
  onChange,
  error,
  name,
  options
}) {
  return (
    <Radio.Group onChange={console.log} value={!!value}>
      <Radio value={true}>Yes</Radio>
      <Radio value={false}>No</Radio>
    </Radio.Group>
  );
}
